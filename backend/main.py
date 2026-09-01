import random
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, Header, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from db import supabase

app = FastAPI(title="NutriFuel Backend API", version="1.0.0")

# Enable CORS for frontend compatibility
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static Catalog Data
MOCK_NUTRITIONISTS = [
    {
        "id": "sarah-jenkins",
        "name": "Dr. Sarah Jenkins, RD, CSSD",
        "title": "Chief Performance Dietitian",
        "specialty": "Endurance, Recovery & Glycemic Optimization",
        "experience": "12+ Years",
        "rating": 4.9,
        "reviews_count": 142,
        "clients_trained": 850,
        "avatar": "https://images.unsplash.com/photo-1594824813591-2394d2146f48?auto=format&fit=crop&w=600&q=80",
        "banner": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
        "bio": "Former Olympic conditioning consultant with a doctorate in Metabolic Bioenergetics from Stanford. Dr. Jenkins specializes in high-output athlete periodization, gut microbiome resilience, and intra-workout nutrient delivery for peak aerobic and anaerobic performance.",
        "certifications": ["Doctor of Clinical Nutrition (DCN)", "Board Certified Specialist in Sports Dietetics (CSSD)", "ISSN Certified Sports Nutritionist (CISSN)", "American College of Sports Medicine (ACSM)"],
        "philosophy": "We do not prescribe generic diet fads. Every milligram of carbohydrate and microgram of electrolyte is calculated to maximize muscular output and mitochondrial density.",
        "specialized_programs": [{"name": "Endurance Glycogen Supercompensation", "duration": "12 Weeks", "intensity": "Elite"}, {"name": "Post-Trauma Muscle Preservation Protocol", "duration": "8 Weeks", "intensity": "Clinical"}, {"name": "Ultra-Endurance Hydration & Electrolyte Timing", "duration": "6 Weeks", "intensity": "Pro"}],
        "recent_reviews": [{"author": "Tyler Knox (Ironman Competitor)", "rating": 5, "comment": "Shaved 22 minutes off my Kona triathlon split purely from Sarah's intra-race fueling protocol.", "date": "2 weeks ago"}, {"author": "Rachel Adams (CrossFit Games Athlete)", "rating": 5, "comment": "Zero digestive fatigue during multi-event weekends. Unmatched scientific rigor.", "date": "1 month ago"}]
    },
    {
        "id": "marcus-vance",
        "name": "Marcus Vance, MS, CSCS",
        "title": "Director of Hypertrophy & Strength Bioenergetics",
        "specialty": "Muscle Hypertrophy & Recomposition",
        "experience": "9+ Years",
        "rating": 4.95,
        "reviews_count": 198,
        "clients_trained": 1100,
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        "banner": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
        "bio": "Master of Science in Exercise Physiology. Marcus engineered custom hypertrophy fueling blueprints for IFBB Pro League competitors and powerlifters across the globe.",
        "certifications": ["M.S. Exercise Physiology (Penn State)", "CSCS (NSCA)", "Precision Nutrition Level 2 Master Coach"],
        "philosophy": "Hypertrophy is a biological equation. Anabolic stimulus without precise caloric and amino-acid surplus is wasted energy.",
        "specialized_programs": [{"name": "Calculated Mass Accretion (Hypertrophy Max)", "duration": "16 Weeks", "intensity": "Heavy"}, {"name": "Competition Peak Week Dehydration/Carb Load", "duration": "4 Weeks", "intensity": "Extreme"}],
        "recent_reviews": [{"author": "Brandon Cole", "rating": 5, "comment": "Gained 14 lbs of lean tissue while keeping waist circumference unchanged over 20 weeks.", "date": "3 days ago"}]
    },
    {
        "id": "elena-rostova",
        "name": "Dr. Elena Rostova, PhD",
        "title": "Lead Metabolic Biochemist",
        "specialty": "Metabolic Flexibility & Fat Oxidation",
        "experience": "14+ Years",
        "rating": 4.88,
        "reviews_count": 164,
        "clients_trained": 920,
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        "banner": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80",
        "bio": "Author of 20+ peer-reviewed metabolic studies. Dr. Rostova architects fat loss protocols for fighters cutting weight and executives needing relentless mental stamina.",
        "certifications": ["PhD in Nutritional Biochemistry (Oxford)", "Registered Dietitian Nutritionist (RDN)", "Functional Diagnostic Nutrition Practitioner (FDN-P)"],
        "philosophy": "Turn your body into a metabolic furnace by aligning nutrient density with circadian rhythms and hormone profiles.",
        "specialized_programs": [{"name": "Accelerated Lipid Oxidation & Fasted Fueling", "duration": "8 Weeks", "intensity": "Rigorous"}, {"name": "Circadian Fasting & Insulin Sensitivity Reset", "duration": "6 Weeks", "intensity": "Moderate"}],
        "recent_reviews": [{"author": "David S. (CEO)", "rating": 5, "comment": "Dr. Elena unlocked 14-hour steady focus with zero afternoon energy crashes.", "date": "Just now"}]
    }
]

# Detection of Database Readiness
USE_IN_MEMORY = False
try:
    print("Checking if Supabase database schema is ready...")
    supabase.table("nutritionists").select("id").limit(1).execute()
    print("Supabase database tables detected! Running in connected DB mode.")
except Exception as e:
    print(f"Supabase schema check: {e}")
    print("Warning: public.nutritionists table could not be queried. Running in MEMORY-FALLBACK Mode.")
    USE_IN_MEMORY = True

# In-Memory DB Store (used if USE_IN_MEMORY is True)
MEMORY_DB = {
    "users": {},
    "meals": {},
    "bookings": {},
    "invoices": {}
}

# Helper function: Convert nutritionist data to camelCase
def format_nutritionist(n):
    if not n:
        return None
    return {
        "id": n.get("id"),
        "name": n.get("name"),
        "title": n.get("title"),
        "specialty": n.get("specialty"),
        "experience": n.get("experience"),
        "rating": float(n.get("rating")) if n.get("rating") else 0.0,
        "reviewsCount": n.get("reviews_count"),
        "clientsTrained": n.get("clients_trained"),
        "avatar": n.get("avatar"),
        "banner": n.get("banner"),
        "bio": n.get("bio"),
        "certifications": n.get("certifications", []),
        "philosophy": n.get("philosophy"),
        "specializedPrograms": n.get("specialized_programs", []),
        "recentReviews": n.get("recent_reviews", [])
    }

# Helper function: Retrieve or auto-create a user (supports both DB and memory)
def get_or_create_user(email: str) -> dict:
    if USE_IN_MEMORY:
        if email in MEMORY_DB["users"]:
            return MEMORY_DB["users"][email]
        
        is_admin = "admin" in email.lower()
        new_user = {
            "email": email,
            "name": "Admin Master" if is_admin else "Alex Vance",
            "membership": "Admin Level" if is_admin else "Elite Tier",
            "member_since": "August 2026",
            "age": 35 if is_admin else 28,
            "weight": 180 if is_admin else 185,
            "height": "6'0\"" if is_admin else "6'1\"",
            "target_weight": 180 if is_admin else 178,
            "daily_calories_target": 2200 if is_admin else 2850,
            "protein_target": 180 if is_admin else 220,
            "carbs_target": 200 if is_admin else 280,
            "fats_target": 60 if is_admin else 70,
            "water_target_oz": 128,
            "water_consumed_oz": 64 if is_admin else 96,
            "assigned_nutritionist_id": None if is_admin else "sarah-jenkins",
            "active_plan": "None" if is_admin else "Sports Nutrition Elite (Week 6 of 12)",
            "role": "ADMIN" if is_admin else "USER"
        }
        
        MEMORY_DB["users"][email] = new_user
        
        # Seed user meals
        if email == "alex.vance@nutrifuel.io":
            MEMORY_DB["meals"][email] = [
                {"id": 1, "user_email": email, "name": "Meal 1: High-Density Egg White & Oat Scramble", "time": "7:30 AM", "calories": 620, "protein": 48, "carbs": 65, "fats": 14, "completed": True},
                {"id": 2, "user_email": email, "name": "Meal 2: Pre-Workout Whey & Wild Blueberry Puree", "time": "11:00 AM", "calories": 480, "protein": 42, "carbs": 58, "fats": 6, "completed": True},
                {"id": 3, "user_email": email, "name": "Meal 3: Post-Workout Flank Steak & Jasmine Rice", "time": "2:30 PM", "calories": 740, "protein": 60, "carbs": 75, "fats": 18, "completed": True},
                {"id": 4, "user_email": email, "name": "Meal 4: Wild Salmon, Quinoa & Steamed Greens", "time": "6:30 PM", "calories": 680, "protein": 52, "carbs": 55, "fats": 22, "completed": False},
                {"id": 5, "user_email": email, "name": "Meal 5: Micellar Casein & Almond Butter Sludge", "time": "9:30 PM", "calories": 330, "protein": 38, "carbs": 12, "fats": 10, "completed": False}
            ]
            MEMORY_DB["invoices"][email] = [
                {"id": "INV-2024-0089", "user_email": email, "date": "Aug 01, 2024", "plan": "Sports Nutrition Elite (Monthly)", "amount": "$249.00", "status": "PAID", "method": "•••• 4242 (Visa)"},
                {"id": "INV-2024-0062", "user_email": email, "date": "Jul 01, 2024", "plan": "Sports Nutrition Elite (Monthly)", "amount": "$249.00", "status": "PAID", "method": "•••• 4242 (Visa)"}
            ]
            MEMORY_DB["bookings"][email] = [
                {
                    "id": "BK-8902",
                    "user_email": email,
                    "nutritionist_id": "sarah-jenkins",
                    "type": "Video Call",
                    "date": "Thursday, Oct 24, 2024",
                    "time": "02:00 PM EST",
                    "goals": "Targeting lean hypertrophy with carb cycling around 6 AM workouts.",
                    "status": "Confirmed"
                }
            ]
            
        return new_user

    else:
        # DB Mode
        res = supabase.table("users").select("*").eq("email", email).execute()
        if res.data:
            return res.data[0]
        
        is_admin = "admin" in email.lower()
        new_user = {
            "email": email,
            "name": "Admin Master" if is_admin else "Alex Vance",
            "membership": "Admin Level" if is_admin else "Elite Tier",
            "member_since": "August 2026",
            "age": 35 if is_admin else 28,
            "weight": 180 if is_admin else 185,
            "height": "6'0\"" if is_admin else "6'1\"",
            "target_weight": 180 if is_admin else 178,
            "daily_calories_target": 2200 if is_admin else 2850,
            "protein_target": 180 if is_admin else 220,
            "carbs_target": 200 if is_admin else 280,
            "fats_target": 60 if is_admin else 70,
            "water_target_oz": 128,
            "water_consumed_oz": 64 if is_admin else 96,
            "assigned_nutritionist_id": None if is_admin else "sarah-jenkins",
            "active_plan": "None" if is_admin else "Sports Nutrition Elite (Week 6 of 12)",
            "role": "ADMIN" if is_admin else "USER"
        }
        
        supabase.table("users").insert(new_user).execute()
        
        if email == "alex.vance@nutrifuel.io":
            default_meals = [
                {"user_email": email, "name": "Meal 1: High-Density Egg White & Oat Scramble", "time": "7:30 AM", "calories": 620, "protein": 48, "carbs": 65, "fats": 14, "completed": True},
                {"user_email": email, "name": "Meal 2: Pre-Workout Whey & Wild Blueberry Puree", "time": "11:00 AM", "calories": 480, "protein": 42, "carbs": 58, "fats": 6, "completed": True},
                {"user_email": email, "name": "Meal 3: Post-Workout Flank Steak & Jasmine Rice", "time": "2:30 PM", "calories": 740, "protein": 60, "carbs": 75, "fats": 18, "completed": True},
                {"user_email": email, "name": "Meal 4: Wild Salmon, Quinoa & Steamed Greens", "time": "6:30 PM", "calories": 680, "protein": 52, "carbs": 55, "fats": 22, "completed": False},
                {"user_email": email, "name": "Meal 5: Micellar Casein & Almond Butter Sludge", "time": "9:30 PM", "calories": 330, "protein": 38, "carbs": 12, "fats": 10, "completed": False}
            ]
            supabase.table("meals").insert(default_meals).execute()
            
            default_invoices = [
                {"id": "INV-2024-0089", "user_email": email, "date": "Aug 01, 2024", "plan": "Sports Nutrition Elite (Monthly)", "amount": "$249.00", "status": "PAID", "method": "•••• 4242 (Visa)"},
                {"id": "INV-2024-0062", "user_email": email, "date": "Jul 01, 2024", "plan": "Sports Nutrition Elite (Monthly)", "amount": "$249.00", "status": "PAID", "method": "•••• 4242 (Visa)"}
            ]
            supabase.table("invoices").insert(default_invoices).execute()

            default_booking = {
                "id": "BK-8902",
                "user_email": email,
                "nutritionist_id": "sarah-jenkins",
                "type": "Video Call",
                "date": "Thursday, Oct 24, 2024",
                "time": "02:00 PM EST",
                "goals": "Targeting lean hypertrophy with carb cycling around 6 AM workouts.",
                "status": "Confirmed"
            }
            supabase.table("bookings").insert(default_booking).execute()

        res = supabase.table("users").select("*").eq("email", email).execute()
        return res.data[0]

# Pydantic schemas
class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    weight: Optional[int] = None
    height: Optional[str] = None
    targetWeight: Optional[int] = None
    dailyCaloriesTarget: Optional[int] = None
    proteinTarget: Optional[int] = None
    carbsTarget: Optional[int] = None
    fatsTarget: Optional[int] = None
    waterTargetOz: Optional[int] = None

class MealCreate(BaseModel):
    name: str
    time: str
    calories: int
    protein: int
    carbs: int
    fats: int

class BookingCreate(BaseModel):
    nutritionistId: str
    type: str
    date: str
    time: str
    goals: str

class CheckoutRequest(BaseModel):
    planId: str
    cardNumber: str
    brand: str
    discountApplied: float

# Routes
@app.get("/")
def read_root():
    mode = "IN-MEMORY FALLBACK" if USE_IN_MEMORY else "SUPABASE CONNECTED"
    return {"message": f"Welcome to NutriFuel Backend API. Mode: {mode}"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "in_memory": USE_IN_MEMORY}

# Auth Routes
@app.post("/api/auth/login")
def login(payload: dict = Body(...)):
    email = payload.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    user = get_or_create_user(email)
    return {"success": True, "user": user}

@app.post("/api/auth/signup")
def signup(payload: dict = Body(...)):
    email = payload.get("email")
    name = payload.get("name", "New Athlete")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    
    if USE_IN_MEMORY:
        if email in MEMORY_DB["users"]:
            return {"success": True, "user": MEMORY_DB["users"][email]}
        user = get_or_create_user(email)
        user["name"] = name
        return {"success": True, "user": user}
    else:
        res = supabase.table("users").select("*").eq("email", email).execute()
        if res.data:
            return {"success": True, "user": res.data[0]}
            
        new_user = {
            "email": email,
            "name": name,
            "membership": "Basic Tier",
            "member_since": datetime.now().strftime("%B %Y"),
            "age": 25,
            "weight": 160,
            "height": "5'10\"",
            "target_weight": 155,
            "daily_calories_target": 2000,
            "protein_target": 150,
            "carbs_target": 200,
            "fats_target": 65,
            "water_target_oz": 128,
            "water_consumed_oz": 0,
            "assigned_nutritionist_id": "sarah-jenkins",
            "active_plan": "None",
            "role": "ADMIN" if "admin" in email.lower() else "USER"
        }
        supabase.table("users").insert(new_user).execute()
        return {"success": True, "user": new_user}

# Profile Routes
@app.get("/api/user/profile")
def get_profile(x_user_email: str = Header("alex.vance@nutrifuel.io")):
    db_user = get_or_create_user(x_user_email)
    
    # Fetch meals
    if USE_IN_MEMORY:
        completed_meals = [m for m in MEMORY_DB["meals"].get(x_user_email, []) if m.get("completed")]
    else:
        meals_res = supabase.table("meals").select("*").eq("user_email", x_user_email).eq("completed", True).execute()
        completed_meals = meals_res.data or []
        
    calories_consumed = sum(m.get("calories", 0) for m in completed_meals)
    protein_consumed = sum(m.get("protein", 0) for m in completed_meals)
    carbs_consumed = sum(m.get("carbs", 0) for m in completed_meals)
    fats_consumed = sum(m.get("fats", 0) for m in completed_meals)

    # Fetch assigned nutritionist info
    nutritionist = None
    nut_id = db_user.get("assigned_nutritionist_id")
    if nut_id:
        if USE_IN_MEMORY:
            n = next((x for x in MOCK_NUTRITIONISTS if x["id"] == nut_id), None)
        else:
            nut_res = supabase.table("nutritionists").select("*").eq("id", nut_id).execute()
            n = nut_res.data[0] if nut_res.data else None
            
        if n:
            nutritionist = {
                "name": n.get("name"),
                "avatar": n.get("avatar"),
                "nextSession": "Thursday, 3:30 PM EST"
            }

    # Map snake_case to camelCase
    profile = {
        "email": db_user.get("email"),
        "name": db_user.get("name"),
        "membership": db_user.get("membership"),
        "memberSince": db_user.get("member_since"),
        "age": db_user.get("age"),
        "weight": db_user.get("weight"),
        "height": db_user.get("height"),
        "targetWeight": db_user.get("target_weight"),
        "dailyCaloriesTarget": db_user.get("daily_calories_target"),
        "dailyCaloriesConsumed": calories_consumed,
        "proteinTarget": db_user.get("protein_target"),
        "proteinConsumed": protein_consumed,
        "carbsTarget": db_user.get("carbs_target"),
        "carbsConsumed": carbs_consumed,
        "fatsTarget": db_user.get("fats_target"),
        "fatsConsumed": fats_consumed,
        "waterTargetOz": db_user.get("water_target_oz"),
        "waterConsumedOz": db_user.get("water_consumed_oz"),
        "assignedNutritionist": nutritionist,
        "activePlan": db_user.get("active_plan"),
        "role": db_user.get("role")
    }
    return profile

@app.put("/api/user/profile")
def update_profile(profile_data: UserProfileUpdate, x_user_email: str = Header("alex.vance@nutrifuel.io")):
    user = get_or_create_user(x_user_email)
    
    update_dict = {}
    if profile_data.name is not None: update_dict["name"] = profile_data.name
    if profile_data.age is not None: update_dict["age"] = profile_data.age
    if profile_data.weight is not None: update_dict["weight"] = profile_data.weight
    if profile_data.height is not None: update_dict["height"] = profile_data.height
    if profile_data.targetWeight is not None: update_dict["target_weight"] = profile_data.targetWeight
    if profile_data.dailyCaloriesTarget is not None: update_dict["daily_calories_target"] = profile_data.dailyCaloriesTarget
    if profile_data.proteinTarget is not None: update_dict["protein_target"] = profile_data.proteinTarget
    if profile_data.carbsTarget is not None: update_dict["carbs_target"] = profile_data.carbsTarget
    if profile_data.fatsTarget is not None: update_dict["fats_target"] = profile_data.fatsTarget
    if profile_data.waterTargetOz is not None: update_dict["water_target_oz"] = profile_data.waterTargetOz

    if USE_IN_MEMORY:
        user.update(update_dict)
    else:
        if update_dict:
            supabase.table("users").update(update_dict).eq("email", x_user_email).execute()

    return get_profile(x_user_email)

# Meals Routes
@app.get("/api/user/meals")
def get_meals(x_user_email: str = Header("alex.vance@nutrifuel.io")):
    get_or_create_user(x_user_email)
    if USE_IN_MEMORY:
        db_meals = MEMORY_DB["meals"].get(x_user_email, [])
    else:
        res = supabase.table("meals").select("*").eq("user_email", x_user_email).order("id").execute()
        db_meals = res.data or []
        
    meals = []
    for m in db_meals:
        meals.append({
            "id": m.get("id"),
            "name": m.get("name"),
            "time": m.get("time"),
            "cal": m.get("calories"),
            "p": m.get("protein"),
            "c": m.get("carbs"),
            "f": m.get("fats"),
            "completed": m.get("completed")
        })
    return meals

@app.post("/api/user/meals")
def add_meal(meal_data: MealCreate, x_user_email: str = Header("alex.vance@nutrifuel.io")):
    get_or_create_user(x_user_email)
    
    if USE_IN_MEMORY:
        user_meals = MEMORY_DB["meals"].setdefault(x_user_email, [])
        new_meal = {
            "id": len(user_meals) + 1,
            "user_email": x_user_email,
            "name": meal_data.name,
            "time": meal_data.time,
            "calories": meal_data.calories,
            "protein": meal_data.protein,
            "carbs": meal_data.carbs,
            "fats": meal_data.fats,
            "completed": False
        }
        user_meals.append(new_meal)
        m = new_meal
    else:
        new_meal = {
            "user_email": x_user_email,
            "name": meal_data.name,
            "time": meal_data.time,
            "calories": meal_data.calories,
            "protein": meal_data.protein,
            "carbs": meal_data.carbs,
            "fats": meal_data.fats,
            "completed": False
        }
        res = supabase.table("meals").insert(new_meal).execute()
        m = res.data[0]

    return {
        "id": m.get("id"),
        "name": m.get("name"),
        "time": m.get("time"),
        "cal": m.get("calories"),
        "p": m.get("protein"),
        "c": m.get("carbs"),
        "f": m.get("fats"),
        "completed": m.get("completed")
    }

@app.post("/api/user/meals/{meal_id}/toggle")
def toggle_meal(meal_id: int, x_user_email: str = Header("alex.vance@nutrifuel.io")):
    if USE_IN_MEMORY:
        user_meals = MEMORY_DB["meals"].get(x_user_email, [])
        meal = next((m for m in user_meals if m["id"] == meal_id), None)
        if not meal:
            raise HTTPException(status_code=404, detail="Meal not found")
        meal["completed"] = not meal["completed"]
        new_status = meal["completed"]
    else:
        res = supabase.table("meals").select("*").eq("id", meal_id).eq("user_email", x_user_email).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="Meal not found")
        meal = res.data[0]
        new_status = not meal.get("completed")
        supabase.table("meals").update({"completed": new_status}).eq("id", meal_id).execute()
        
    return {"success": True, "completed": new_status}

# Water Route
@app.post("/api/user/water")
def update_water(payload: dict = Body(...), x_user_email: str = Header("alex.vance@nutrifuel.io")):
    user = get_or_create_user(x_user_email)
    water_consumed = payload.get("waterConsumedOz")
    if water_consumed is None:
        raise HTTPException(status_code=400, detail="waterConsumedOz is required")
        
    if USE_IN_MEMORY:
        user["water_consumed_oz"] = water_consumed
    else:
        supabase.table("users").update({"water_consumed_oz": water_consumed}).eq("email", x_user_email).execute()
        
    return {"success": True, "waterConsumedOz": water_consumed}

# Nutritionist Routes
@app.get("/api/nutritionists")
def get_nutritionists():
    if USE_IN_MEMORY:
        db_nuts = MOCK_NUTRITIONISTS
    else:
        res = supabase.table("nutritionists").select("*").execute()
        db_nuts = res.data or []
    return [format_nutritionist(n) for n in db_nuts]

@app.get("/api/nutritionists/{nutritionist_id}")
def get_nutritionist(nutritionist_id: str):
    if USE_IN_MEMORY:
        n = next((x for x in MOCK_NUTRITIONISTS if x["id"] == nutritionist_id), None)
    else:
        res = supabase.table("nutritionists").select("*").eq("id", nutritionist_id).execute()
        n = res.data[0] if res.data else None
        
    if not n:
        raise HTTPException(status_code=404, detail="Nutritionist not found")
    return format_nutritionist(n)

# Bookings Routes
@app.get("/api/bookings")
def get_bookings(x_user_email: str = Header("alex.vance@nutrifuel.io")):
    get_or_create_user(x_user_email)
    if USE_IN_MEMORY:
        db_bookings = MEMORY_DB["bookings"].get(x_user_email, [])
    else:
        res = supabase.table("bookings").select("*").eq("user_email", x_user_email).execute()
        db_bookings = res.data or []
        
    bookings = []
    for b in db_bookings:
        nut_id = b.get("nutritionist_id")
        if USE_IN_MEMORY:
            nut = next((x for x in MOCK_NUTRITIONISTS if x["id"] == nut_id), None)
        else:
            nut_res = supabase.table("nutritionists").select("*").eq("id", nut_id).execute()
            nut = nut_res.data[0] if nut_res.data else None
            
        bookings.append({
            "id": b.get("id"),
            "nutritionist": format_nutritionist(nut),
            "type": b.get("type"),
            "date": b.get("date"),
            "time": b.get("time"),
            "goals": b.get("goals"),
            "status": b.get("status")
        })
    return bookings

@app.post("/api/bookings")
def create_booking(booking: BookingCreate, x_user_email: str = Header("alex.vance@nutrifuel.io")):
    get_or_create_user(x_user_email)
    
    # Fetch nutritionist
    if USE_IN_MEMORY:
        nut = next((x for x in MOCK_NUTRITIONISTS if x["id"] == booking.nutritionistId), None)
    else:
        nut_res = supabase.table("nutritionists").select("*").eq("id", booking.nutritionistId).execute()
        nut = nut_res.data[0] if nut_res.data else None
        
    if not nut:
        raise HTTPException(status_code=404, detail="Nutritionist not found")
        
    booking_id = f"BK-{random.randint(1000, 9999)}"
    new_booking = {
        "id": booking_id,
        "user_email": x_user_email,
        "nutritionist_id": booking.nutritionistId,
        "type": "Video Call" if booking.type == "videocam" else "Chat Consultation" if booking.type == "chat" else "In-Person Session",
        "date": booking.date,
        "time": booking.time,
        "goals": booking.goals,
        "status": "Confirmed"
    }
    
    if USE_IN_MEMORY:
        MEMORY_DB["bookings"].setdefault(x_user_email, []).append(new_booking)
    else:
        supabase.table("bookings").insert(new_booking).execute()
        
    return {
        "id": booking_id,
        "nutritionist": format_nutritionist(nut),
        "type": new_booking["type"],
        "date": booking.date,
        "time": booking.time,
        "goals": booking.goals,
        "status": "Confirmed"
    }

# Checkout and Invoices Routes
@app.get("/api/payments/history")
def get_payment_history(x_user_email: str = Header("alex.vance@nutrifuel.io")):
    get_or_create_user(x_user_email)
    if USE_IN_MEMORY:
        db_invoices = MEMORY_DB["invoices"].get(x_user_email, [])
    else:
        res = supabase.table("invoices").select("*").eq("user_email", x_user_email).execute()
        db_invoices = res.data or []
        
    invoices = []
    for inv in db_invoices:
        invoices.append({
            "id": inv.get("id"),
            "date": inv.get("date"),
            "plan": inv.get("plan"),
            "amount": inv.get("amount"),
            "status": inv.get("status"),
            "method": inv.get("method")
        })
    return invoices

@app.post("/api/checkout")
def complete_checkout(payload: CheckoutRequest, x_user_email: str = Header("alex.vance@nutrifuel.io")):
    user = get_or_create_user(x_user_email)
    
    plans = {
        "hypertrophy": {"title": "Hypertrophy Blueprint", "price": 179, "membership": "Hypertrophy Tier", "active_plan": "Hypertrophy Blueprint (Week 1 of 16)"},
        "sports-nutrition": {"title": "Sports Nutrition Elite", "price": 249, "membership": "Elite Tier", "active_plan": "Sports Nutrition Elite (Week 1 of 12)"},
        "diabetic-glycemic": {"title": "Diabetic & Glycemic Control", "price": 199, "membership": "Clinical Tier", "active_plan": "Diabetic & Glycemic Control (Week 1 of 12)"},
        "detox-reset": {"title": "Metabolic Detox Reset", "price": 89, "membership": "Short Term Reset", "active_plan": "Metabolic Detox Reset (Week 1 of 3)"},
        "competition-prep": {"title": "Pro Competition Prep", "price": 349, "membership": "Ultimate Tier", "active_plan": "Pro Competition Prep (Week 1 of 16)"}
    }
    
    plan_info = plans.get(payload.planId)
    if not plan_info:
        raise HTTPException(status_code=400, detail="Invalid plan selected")
        
    final_price = plan_info["price"] * (1 - payload.discountApplied / 100)
    invoice_id = f"INV-2024-{random.randint(1000, 9999)}"
    
    new_invoice = {
        "id": invoice_id,
        "user_email": x_user_email,
        "date": datetime.now().strftime("%b %d, %Y"),
        "plan": f"{plan_info['title']} ({'Weekly' if payload.planId == 'detox-reset' else 'Monthly'})",
        "amount": f"${final_price:.2f}",
        "status": "PAID",
        "method": f"•••• {payload.cardNumber[-4:] if len(payload.cardNumber) >= 4 else '8821'} ({payload.brand or 'Visa'})"
    }
    
    if USE_IN_MEMORY:
        MEMORY_DB["invoices"].setdefault(x_user_email, []).append(new_invoice)
        user["membership"] = plan_info["membership"]
        user["active_plan"] = plan_info["active_plan"]
    else:
        supabase.table("invoices").insert(new_invoice).execute()
        supabase.table("users").update({
            "membership": plan_info["membership"],
            "active_plan": plan_info["active_plan"]
        }).eq("email", x_user_email).execute()
        
    return new_invoice

# Admin Routes
@app.get("/api/admin/dashboard")
def get_admin_dashboard(x_user_email: str = Header("alex.vance@nutrifuel.io")):
    user = get_or_create_user(x_user_email)
    if user.get("role") != "ADMIN":
        raise HTTPException(status_code=403, detail="Access denied. Admin role required.")
        
    # Gather Users
    if USE_IN_MEMORY:
        all_users = list(MEMORY_DB["users"].values())
        if not any(u["role"] == "USER" for u in all_users):
            # Seed basic user roster in memory
            athletes_seed = [
                {"email": "alex.vance@nutrifuel.io", "name": "Alex Vance", "membership": "Elite Tier", "member_since": "Mar 2024", "active_plan": "Sports Nutrition Elite", "role": "USER"},
                {"email": "rachel.adams@crossfit.com", "name": "Rachel Adams", "membership": "Elite Tier", "member_since": "Apr 2024", "active_plan": "Sports Nutrition Elite", "role": "USER"},
                {"email": "tknox@triathlon.org", "name": "Tyler Knox", "membership": "Basic Tier", "member_since": "May 2024", "active_plan": "Hypertrophy Blueprint", "role": "USER"},
                {"email": "elena.g@marathon.io", "name": "Elena Gomez", "membership": "Clinical Tier", "member_since": "Jun 2024", "active_plan": "Diabetic Meal Plans", "role": "USER"}
            ]
            for u in athletes_seed:
                MEMORY_DB["users"][u["email"]] = u
            all_users = list(MEMORY_DB["users"].values())
    else:
        users_res = supabase.table("users").select("*").execute()
        all_users = users_res.data or []
        
    athletes = [u for u in all_users if u.get("role") != "ADMIN"]
    
    # Gather Invoices / Revenue
    total_revenue = 0.0
    if USE_IN_MEMORY:
        for user_invs in MEMORY_DB["invoices"].values():
            for inv in user_invs:
                amt_str = inv.get("amount", "$0.00").replace("$", "").replace(",", "")
                total_revenue += float(amt_str)
    else:
        invoices_res = supabase.table("invoices").select("amount").execute()
        invoices = invoices_res.data or []
        for inv in invoices:
            try:
                amt_str = inv.get("amount", "$0.00").replace("$", "").replace(",", "")
                total_revenue += float(amt_str)
            except Exception:
                pass

    # Gather Bookings / Consultations
    total_bookings = []
    if USE_IN_MEMORY:
        for user_bookings in MEMORY_DB["bookings"].values():
            total_bookings.extend(user_bookings)
    else:
        bookings_res = supabase.table("bookings").select("*").execute()
        total_bookings = bookings_res.data or []

    # Format KPIs
    kpis = [
        {"label": "ACTIVE ATHLETES", "value": str(len(athletes) + 1422), "change": "+14.2%", "icon": "group", "positive": True},
        {"label": "MONTHLY REVENUE", "value": f"${(total_revenue + 347000):,.0f}", "change": "+22.8%", "icon": "payments", "positive": True},
        {"label": "ACTIVE NUTRITIONISTS", "value": "28", "change": "+3 new", "icon": "local_hospital", "positive": True},
        {"label": "BOOKED CONSULTATIONS", "value": str(len(total_bookings) + 411), "change": "+8.4%", "icon": "calendar_month", "positive": True}
    ]

    revenue_history = [
        {"month": "Mar", "rev": 210},
        {"month": "Apr", "rev": 245},
        {"month": "May", "rev": 278},
        {"month": "Jun", "rev": 305},
        {"month": "Jul", "rev": 326},
        {"month": "Aug", "rev": int((total_revenue + 348000) / 1000)}
    ]

    # Consultations List
    recent_consultations = []
    for b in total_bookings[:4]:
        client_name = b.get("user_email")
        if USE_IN_MEMORY:
            u_info = MEMORY_DB["users"].get(client_name)
            if u_info: client_name = u_info.get("name")
        else:
            client_res = supabase.table("users").select("name").eq("email", b.get("user_email")).execute()
            if client_res.data: client_name = client_res.data[0].get("name")
            
        dietitian_name = b.get("nutritionist_id")
        nut_match = next((x for x in MOCK_NUTRITIONISTS if x["id"] == dietitian_name), None)
        if nut_match: dietitian_name = nut_match["name"]
        
        recent_consultations.append({
            "client": client_name,
            "dietitian": dietitian_name,
            "time": f"{b.get('date')}, {b.get('time')}",
            "type": b.get("type"),
            "status": b.get("status")
        })
        
    if not recent_consultations:
        recent_consultations = [
            {"client": "Alex Vance", "dietitian": "Dr. Sarah Jenkins", "time": "Today, 3:30 PM", "type": "Video Call", "status": "Confirmed"},
            {"client": "Rachel Adams", "dietitian": "Marcus Vance", "time": "Today, 5:00 PM", "type": "In-Person", "status": "Checked In"}
        ]

    # Users List
    users_list = []
    for u in all_users:
        users_list.append({
            "name": u.get("name"),
            "email": u.get("email"),
            "plan": u.get("active_plan") or "None",
            "status": "Active" if u.get("active_plan") and u.get("active_plan") != "None" else "Inactive",
            "joined": u.get("member_since") or "Aug 2026"
        })

    return {
        "kpis": kpis,
        "revenueHistory": revenue_history,
        "recentConsultations": recent_consultations,
        "usersList": users_list
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
