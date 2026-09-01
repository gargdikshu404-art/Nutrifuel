import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

export const UserProfile = ({ setActivePage }) => {
  const { user, userEmail, refetchProfile } = useAuth();
  const { confirmedBookings } = useBooking();

  const [meals, setMeals] = useState([]);
  const [waterGlasses, setWaterGlasses] = useState(6);

  const fetchMeals = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/user/meals', {
        headers: {
          'X-User-Email': userEmail
        }
      });
      if (res.ok) {
        const data = await res.json();
        setMeals(data);
      } else {
        fallbackMeals();
      }
    } catch (err) {
      console.warn("Backend API not reachable for meals, using fallback data.", err);
      fallbackMeals();
    }
  };

  const fallbackMeals = () => {
    if (user?.todayMeals) {
      setMeals(user.todayMeals);
    } else {
      setMeals([
        { id: 1, name: 'Meal 1: High-Density Egg White & Oat Scramble', time: '7:30 AM', cal: 620, p: 48, c: 65, f: 14, completed: true },
        { id: 2, name: 'Meal 2: Pre-Workout Whey & Wild Blueberry Puree', time: '11:00 AM', cal: 480, p: 42, c: 58, f: 6, completed: true },
        { id: 3, name: 'Meal 3: Post-Workout Flank Steak & Jasmine Rice', time: '2:30 PM', cal: 740, p: 60, c: 75, f: 18, completed: true },
        { id: 4, name: 'Meal 4: Wild Salmon, Quinoa & Steamed Greens', time: '6:30 PM', cal: 680, p: 52, c: 55, f: 22, completed: false },
        { id: 5, name: 'Meal 5: Micellar Casein & Almond Butter Sludge', time: '9:30 PM', cal: 330, p: 38, c: 12, f: 10, completed: false }
      ]);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [userEmail, user?.todayMeals]);

  useEffect(() => {
    if (user && user.waterConsumedOz !== undefined) {
      setWaterGlasses(Math.round(user.waterConsumedOz / 16));
    }
  }, [user]);

  const toggleMeal = async (idx) => {
    const meal = meals[idx];
    if (!meal) return;

    // Toggle locally for instant UI update
    setMeals(prev => prev.map((m, i) => i === idx ? { ...m, completed: !m.completed } : m));

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/user/meals/${meal.id}/toggle`, {
        method: 'POST',
        headers: {
          'X-User-Email': userEmail
        }
      });
      if (res.ok) {
        if (refetchProfile) refetchProfile();
      }
    } catch (err) {
      console.error("Toggle meal API request failed:", err);
    }
  };

  const updateWater = async (newGlasses) => {
    setWaterGlasses(newGlasses);
    try {
      await fetch('http://127.0.0.1:8000/api/user/water', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': userEmail
        },
        body: JSON.stringify({ waterConsumedOz: newGlasses * 16 })
      });
      if (refetchProfile) refetchProfile();
    } catch (err) {
      console.error("Failed to update water on backend:", err);
    }
  };

  const caloriesCurrent = meals.filter(m => m.completed).reduce((acc, curr) => acc + curr.cal, 0);
  const proteinCurrent = meals.filter(m => m.completed).reduce((acc, curr) => acc + curr.p, 0);
  const carbsCurrent = meals.filter(m => m.completed).reduce((acc, curr) => acc + curr.c, 0);
  const fatsCurrent = meals.filter(m => m.completed).reduce((acc, curr) => acc + curr.f, 0);

  const caloriesTarget = user?.dailyCaloriesTarget || 2850;
  const proteinTarget = user?.proteinTarget || 220;
  const carbsTarget = user?.carbsTarget || 280;
  const fatsTarget = user?.fatsTarget || 70;

  return (
    <div className="min-h-screen bg-background text-on-surface py-10">
      <div className="max-w-container-max mx-auto px-gutter space-y-8">
        {/* User Hero Bar (from my_profile_nutrifuel) */}
        <div className="p-6 bg-surface-container-low border-2 border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-surface-container border-2 border-secondary overflow-hidden flex items-center justify-center font-display-lg text-3xl text-secondary">
              AV
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display-lg text-3xl uppercase text-white tracking-tight">
                  {user?.name || 'Alex Vance'}
                </h1>
                <span className="px-2.5 py-0.5 bg-secondary-container text-white font-label-caps text-[10px] uppercase font-bold tracking-wider">
                  {user?.membership || 'Elite Tier'}
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mt-1">
                Active Protocol: <strong className="text-secondary">{user?.activePlan || 'Sports Nutrition Elite'}</strong>
              </p>
              <div className="flex gap-4 mt-2 font-label-caps text-xs text-on-surface-variant">
                <span>Age: <strong className="text-white">28</strong></span>
                <span>•</span>
                <span>Current: <strong className="text-white">185 lbs</strong></span>
                <span>•</span>
                <span>Goal: <strong className="text-secondary">178 lbs (Cut)</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage('book')}
              className="px-5 py-2.5 bg-secondary-container text-white font-label-caps text-xs uppercase hover:bg-hot-pink transition-all font-bold flex items-center gap-1.5 neon-glow"
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              Book Dietitian
            </button>
            <button
              onClick={() => setActivePage('payments')}
              className="px-4 py-2.5 bg-surface-container border border-white/20 hover:border-secondary text-white font-label-caps text-xs uppercase transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">receipt_long</span>
              Invoices
            </button>
          </div>
        </div>

        {/* Real-time Macro Trackers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Calorie Gauge */}
          <div className="p-5 bg-surface-container-low border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-caps text-xs uppercase text-on-surface-variant font-bold">Daily Calories</span>
                <span className="material-symbols-outlined text-secondary text-lg">local_fire_department</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-3xl text-white">{caloriesCurrent}</span>
                <span className="font-label-caps text-xs text-on-surface-variant">/ {caloriesTarget} KCAL</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-background h-3 overflow-hidden border border-white/10">
                <div
                  className="bg-gradient-to-r from-secondary to-secondary-container h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (caloriesCurrent / caloriesTarget) * 100)}%` }}
                ></div>
              </div>
              <span className="font-label-caps text-[10px] text-secondary mt-1.5 block text-right font-bold">
                {Math.round((caloriesCurrent / caloriesTarget) * 100)}% CONSUMED
              </span>
            </div>
          </div>

          {/* Protein Gauge */}
          <div className="p-5 bg-surface-container-low border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-caps text-xs uppercase text-on-surface-variant font-bold">Protein (mTOR)</span>
                <span className="material-symbols-outlined text-secondary text-lg">fitness_center</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-3xl text-white">{proteinCurrent}g</span>
                <span className="font-label-caps text-xs text-on-surface-variant">/ {proteinTarget}g</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-background h-3 overflow-hidden border border-white/10">
                <div
                  className="bg-secondary-container h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (proteinCurrent / proteinTarget) * 100)}%` }}
                ></div>
              </div>
              <span className="font-label-caps text-[10px] text-secondary mt-1.5 block text-right font-bold">
                {proteinTarget - proteinCurrent > 0 ? `${proteinTarget - proteinCurrent}g Remaining` : 'Goal Exceeded!'}
              </span>
            </div>
          </div>

          {/* Carbs Gauge */}
          <div className="p-5 bg-surface-container-low border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-caps text-xs uppercase text-on-surface-variant font-bold">Carbohydrates</span>
                <span className="material-symbols-outlined text-secondary text-lg">bolt</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-3xl text-white">{carbsCurrent}g</span>
                <span className="font-label-caps text-xs text-on-surface-variant">/ {carbsTarget}g</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-background h-3 overflow-hidden border border-white/10">
                <div
                  className="bg-white h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (carbsCurrent / carbsTarget) * 100)}%` }}
                ></div>
              </div>
              <span className="font-label-caps text-[10px] text-white/70 mt-1.5 block text-right">
                Glycogen Superload Active
              </span>
            </div>
          </div>

          {/* Fats Gauge */}
          <div className="p-5 bg-surface-container-low border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-caps text-xs uppercase text-on-surface-variant font-bold">Lipids / Fats</span>
                <span className="material-symbols-outlined text-secondary text-lg">opacity</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-3xl text-white">{fatsCurrent}g</span>
                <span className="font-label-caps text-xs text-on-surface-variant">/ {fatsTarget}g</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-background h-3 overflow-hidden border border-white/10">
                <div
                  className="bg-secondary h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (fatsCurrent / fatsTarget) * 100)}%` }}
                ></div>
              </div>
              <span className="font-label-caps text-[10px] text-secondary mt-1.5 block text-right font-bold">
                Hormonal Baseline Maintained
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Meals List & Assigned Dietitian */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Interactive Meal Log */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center bg-surface-container-lowest p-4 border-b-2 border-secondary">
              <div>
                <h3 className="font-display-lg text-xl uppercase text-white">Daily Meal Schedule</h3>
                <p className="font-body-md text-xs text-on-surface-variant">Click checkmark to log completion</p>
              </div>
              <span className="font-label-caps text-xs text-secondary uppercase font-bold">
                {meals.filter(m => m.completed).length} / {meals.length} Completed
              </span>
            </div>

            <div className="space-y-3">
              {meals.map((meal, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleMeal(idx)}
                  className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                    meal.completed
                      ? 'bg-surface-container-low border-white/10 opacity-90'
                      : 'bg-surface-container border-secondary/50 shadow-[0_0_10px_rgba(255,74,141,0.15)]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-7 h-7 rounded-none border flex items-center justify-center transition-colors ${
                      meal.completed ? 'bg-secondary-container border-secondary-container text-white' : 'border-white/30 text-transparent hover:border-secondary'
                    }`}>
                      <span className="material-symbols-outlined text-base">check</span>
                    </div>

                    <div>
                      <span className="font-label-caps text-[10px] text-secondary uppercase font-bold block">
                        {meal.time}
                      </span>
                      <h4 className={`font-display-lg text-base uppercase ${meal.completed ? 'line-through text-on-surface-variant' : 'text-white'}`}>
                        {meal.name}
                      </h4>
                      <div className="flex gap-3 text-xs font-label-caps text-on-surface-variant mt-1">
                        <span>{meal.cal} kcal</span>
                        <span>•</span>
                        <span>{meal.p}g Protein</span>
                        <span>•</span>
                        <span>{meal.c}g Carbs</span>
                        <span>•</span>
                        <span>{meal.f}g Fat</span>
                      </div>
                    </div>
                  </div>

                  <span className="material-symbols-outlined text-on-surface-variant">
                    {meal.completed ? 'task_alt' : 'radio_button_unchecked'}
                  </span>
                </div>
              ))}
            </div>

            {/* Hydration Tracker */}
            <div className="p-5 bg-surface-container-low border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-3xl">water_drop</span>
                <div>
                  <h4 className="font-display-lg text-base uppercase text-white">Daily Hydration & Electrolytes</h4>
                  <p className="font-body-md text-xs text-on-surface-variant">{waterGlasses * 16} oz logged / 128 oz goal</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateWater(Math.max(0, waterGlasses - 1))}
                  className="w-8 h-8 bg-surface-container border border-white/20 text-white hover:border-secondary font-bold"
                >
                  -
                </button>
                <span className="font-display-lg text-lg text-secondary px-2">{waterGlasses} Bottles</span>
                <button
                  onClick={() => updateWater(waterGlasses + 1)}
                  className="w-8 h-8 bg-secondary-container text-white hover:bg-hot-pink font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Right: Assigned Specialist & Upcoming Sessions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Assigned Dietitian Card */}
            <div className="p-6 bg-surface-container-low border border-white/10 space-y-4">
              <span className="font-label-caps text-xs text-secondary uppercase font-bold tracking-wider block">
                Primary Dietitian
              </span>
              <div className="flex items-center gap-4">
                <img
                  src={user?.assignedNutritionist?.avatar || 'https://images.unsplash.com/photo-1594824813591-2394d2146f48?auto=format&fit=crop&w=200&q=80'}
                  alt="Doctor"
                  className="w-16 h-16 object-cover border border-secondary"
                />
                <div>
                  <h4 className="font-display-lg text-lg uppercase text-white">{user?.assignedNutritionist?.name}</h4>
                  <span className="font-label-caps text-[11px] text-secondary uppercase block">Performance Lead</span>
                  <span className="text-[10px] font-label-caps text-on-surface-variant">Response Time: &lt; 15 min</span>
                </div>
              </div>

              <div className="p-3 bg-surface-container border-l-2 border-secondary text-xs font-body-md text-on-surface-variant">
                "Alex, stay strict on carbohydrate intake around the 6 PM interval session. Great work hitting protein targets."
              </div>

              <button
                onClick={() => setActivePage('book')}
                className="w-full py-2.5 bg-surface-container border border-secondary/40 hover:border-secondary text-secondary font-label-caps text-xs uppercase transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                <span>Direct Message</span>
              </button>
            </div>

            {/* Upcoming Consultations */}
            <div className="p-6 bg-surface-container-low border border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-label-caps text-xs text-white uppercase font-bold">Upcoming Consultations</span>
                <span className="material-symbols-outlined text-secondary text-lg">calendar_month</span>
              </div>

              {confirmedBookings.length > 0 ? (
                <div className="space-y-3">
                  {confirmedBookings.map((b) => (
                    <div key={b.id} className="p-3 bg-surface-container border-l-2 border-secondary text-xs font-label-caps space-y-1">
                      <div className="flex justify-between text-white font-bold">
                        <span>{b.type}</span>
                        <span className="text-secondary font-mono">{b.id}</span>
                      </div>
                      <p className="text-on-surface-variant">{b.date} @ {b.time}</p>
                      <span className="text-[10px] text-secondary uppercase font-bold block">Status: {b.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-body-md text-xs text-on-surface-variant">No active consultations booked.</p>
              )}

              <button
                onClick={() => setActivePage('book')}
                className="w-full py-3 bg-secondary-container text-white font-label-caps text-xs uppercase font-bold hover:bg-hot-pink transition-all neon-glow"
              >
                Schedule New Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
