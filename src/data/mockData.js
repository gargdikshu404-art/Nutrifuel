// Mock Data representing all 21 screens and subfolders of NutriFuel

export const NUTRITIONISTS = [
  {
    id: 'sarah-jenkins',
    name: 'Dr. Sarah Jenkins, RD, CSSD',
    title: 'Chief Performance Dietitian',
    specialty: 'Endurance, Recovery & Glycemic Optimization',
    experience: '12+ Years',
    rating: 4.9,
    reviewsCount: 142,
    clientsTrained: 850,
    avatar: 'https://images.unsplash.com/photo-1594824813591-2394d2146f48?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    bio: 'Former Olympic conditioning consultant with a doctorate in Metabolic Bioenergetics from Stanford. Dr. Jenkins specializes in high-output athlete periodization, gut microbiome resilience, and intra-workout nutrient delivery for peak aerobic and anaerobic performance.',
    certifications: [
      'Doctor of Clinical Nutrition (DCN)',
      'Board Certified Specialist in Sports Dietetics (CSSD)',
      'ISSN Certified Sports Nutritionist (CISSN)',
      'American College of Sports Medicine (ACSM)'
    ],
    philosophy: 'We do not prescribe generic diet fads. Every milligram of carbohydrate and microgram of electrolyte is calculated to maximize muscular output and mitochondrial density.',
    specializedPrograms: [
      { name: 'Endurance Glycogen Supercompensation', duration: '12 Weeks', intensity: 'Elite' },
      { name: 'Post-Trauma Muscle Preservation Protocol', duration: '8 Weeks', intensity: 'Clinical' },
      { name: 'Ultra-Endurance Hydration & Electrolyte Timing', duration: '6 Weeks', intensity: 'Pro' }
    ],
    recentReviews: [
      { author: 'Tyler Knox (Ironman Competitor)', rating: 5, comment: 'Shaved 22 minutes off my Kona triathlon split purely from Sarah\'s intra-race fueling protocol.', date: '2 weeks ago' },
      { author: 'Rachel Adams (CrossFit Games Athlete)', rating: 5, comment: 'Zero digestive fatigue during multi-event weekends. Unmatched scientific rigor.', date: '1 month ago' }
    ]
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance, MS, CSCS',
    title: 'Director of Hypertrophy & Strength Bioenergetics',
    specialty: 'Muscle Hypertrophy & Recomposition',
    experience: '9+ Years',
    rating: 4.95,
    reviewsCount: 198,
    clientsTrained: 1100,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    bio: 'Master of Science in Exercise Physiology. Marcus engineered custom hypertrophy fueling blueprints for IFBB Pro League competitors and powerlifters across the globe.',
    certifications: [
      'M.S. Exercise Physiology (Penn State)',
      'CSCS (NSCA)',
      'Precision Nutrition Level 2 Master Coach'
    ],
    philosophy: 'Hypertrophy is a biological equation. Anabolic stimulus without precise caloric and amino-acid surplus is wasted energy.',
    specializedPrograms: [
      { name: 'Calculated Mass Accretion (Hypertrophy Max)', duration: '16 Weeks', intensity: 'Heavy' },
      { name: 'Competition Peak Week Dehydration/Carb Load', duration: '4 Weeks', intensity: 'Extreme' }
    ],
    recentReviews: [
      { author: 'Brandon Cole', rating: 5, comment: 'Gained 14 lbs of lean tissue while keeping waist circumference unchanged over 20 weeks.', date: '3 days ago' }
    ]
  },
  {
    id: 'elena-rostova',
    name: 'Dr. Elena Rostova, PhD',
    title: 'Lead Metabolic Biochemist',
    specialty: 'Metabolic Flexibility & Fat Oxidation',
    experience: '14+ Years',
    rating: 4.88,
    reviewsCount: 164,
    clientsTrained: 920,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
    bio: 'Author of 20+ peer-reviewed metabolic studies. Dr. Rostova architects fat loss protocols for fighters cutting weight and executives needing relentless mental stamina.',
    certifications: [
      'PhD in Nutritional Biochemistry (Oxford)',
      'Registered Dietitian Nutritionist (RDN)',
      'Functional Diagnostic Nutrition Practitioner (FDN-P)'
    ],
    philosophy: 'Turn your body into a metabolic furnace by aligning nutrient density with circadian rhythms and hormone profiles.',
    specializedPrograms: [
      { name: 'Accelerated Lipid Oxidation & Fasted Fueling', duration: '8 Weeks', intensity: 'Rigorous' },
      { name: 'Circadian Fasting & Insulin Sensitivity Reset', duration: '6 Weeks', intensity: 'Moderate' }
    ],
    recentReviews: [
      { author: 'David S. (CEO)', rating: 5, comment: 'Dr. Elena unlocked 14-hour steady focus with zero afternoon energy crashes.', date: 'Just now' }
    ]
  }
];

export const SERVICES_PLANS = [
  {
    id: 'hypertrophy',
    title: 'Hypertrophy Blueprint',
    badge: 'Popular',
    icon: 'fitness_center',
    price: 179,
    period: '/mo',
    description: 'Hypertrophy-focused nutrition planning. Optimized protein synthesis through calculated caloric surpluses and timing strategies.',
    features: [
      'Daily Target Calorie & Macronutrient Formulas',
      'Intra-Workout Essential Amino Acid Sequencing',
      'Weekly Body Composition & Biofeedback Adjustments',
      'Direct WhatsApp/In-App Chat with Lead Coach',
      'Exclusive Recipe Database for High-Calorie Clean Eating'
    ],
    recommendedFor: 'Bodybuilders, powerlifters, and athletes building pure lean mass.'
  },
  {
    id: 'sports-nutrition',
    title: 'Sports Nutrition Elite',
    badge: 'Elite',
    isElite: true,
    icon: 'sprint',
    price: 249,
    period: '/mo',
    description: 'Advanced fueling strategies for endurance and explosive athletes. Macro periodization aligned with training cycles.',
    features: [
      'Periodized Fueling Matched to Training Blocks',
      'Custom Hydration & Electrolyte Milligram Protocols',
      'Bi-Weekly 1-on-1 HD Video Consultations',
      'Pre-Competition Carb-Loading & Taper Blueprint',
      'Real-Time Continuous Glucose Monitoring (CGM) Review'
    ],
    recommendedFor: 'Triathletes, CrossFit athletes, fighters, and team sport competitors.'
  },
  {
    id: 'diabetic-glycemic',
    title: 'Diabetic & Glycemic Control',
    badge: 'Clinical',
    icon: 'bloodtype',
    price: 199,
    period: '/mo',
    description: 'Precision glycemic control through expertly timed, low-GI carbohydrate protocols designed to stabilize blood sugar levels.',
    features: [
      'Low Glycemic Index & Load Meal Architecture',
      'Post-Prandial Glucose Spike Reduction System',
      'Insulin Sensitivity Restoration Nutritional Strategy',
      'Monthly Lipid & HbA1c Progress Telehealth Review',
      'Comprehensive Dining Out & Travel Protocol'
    ],
    recommendedFor: 'Type 1 & 2 diabetics, pre-diabetics, and insulin-resistant individuals.'
  },
  {
    id: 'detox-reset',
    title: 'Metabolic Detox Reset',
    badge: 'Short Term',
    icon: 'local_drink',
    price: 89,
    period: '/wk',
    description: 'Intensive, nutrient-dense resets designed to optimize gut health, reduce systemic inflammation, and kickstart metabolic function.',
    features: [
      '21-Day Anti-Inflammatory Nutrient Density Phase',
      'Gut Microbiome & Digestive Enzyme Support Schedule',
      'Elimination & Systematic Reintroduction Blueprint',
      'Daily Habit & Hydration Accountability Tracking'
    ],
    recommendedFor: 'Athletes recovering from off-season or resetting systemic inflammation.'
  },
  {
    id: 'competition-prep',
    title: 'Pro Competition Prep',
    badge: 'Extreme',
    icon: 'military_tech',
    price: 349,
    period: '/mo',
    description: 'Uncompromising contest preparation for stage or fight night. Daily check-ins, water manipulation, and peak week mastery.',
    features: [
      'Daily Weigh-In & Progress Photo Biofeedback',
      'Peak Week Sodium, Potassium, & Water Protocol',
      'Carbohydrate Depletion & Strategic Supercompensation',
      '24/7 Direct Phone & SMS Access to Head Coach'
    ],
    recommendedFor: 'Stage competitors, boxers, MMA fighters making weight classes.'
  }
];

export const NUTRITION_SHOWCASE = [
  {
    id: 'meal-1',
    title: 'Anabolic Ribeye & Charcoal Sweet Potato',
    category: 'Post-Workout Hypertrophy',
    calories: 840,
    protein: 68,
    carbs: 74,
    fats: 28,
    prepTime: '20 Min',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'Grass-fed prime ribeye paired with slow-roasted purple sweet potatoes, sea salt crystals, and steamed broccolini. Engineered for glycogen resynthesis.',
    highlights: ['High Leucine Content (4.2g)', 'Rich in Bioavailable Iron & Zinc', 'Zero Added Refined Sugars']
  },
  {
    id: 'meal-2',
    title: 'Wild Atlantic Salmon & Ancient Grain Bowl',
    category: 'Endurance Recovery',
    calories: 720,
    protein: 52,
    carbs: 62,
    fats: 26,
    prepTime: '15 Min',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    description: 'Crisp pan-seared wild salmon over tricolor quinoa, avocado slices, pickled ginger, and sesame-tamari reduction.',
    highlights: ['3,200mg Omega-3 Fatty Acids', 'Complete Plant + Marine Amino Acid Blend', 'High Potassium for Muscle Relaxation']
  },
  {
    id: 'meal-3',
    title: 'High-Density Whey Isolate & Berry Bowl',
    category: 'Pre-Workout Fuel',
    calories: 560,
    protein: 48,
    carbs: 66,
    fats: 10,
    prepTime: '5 Min',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    description: 'Cold-filtered whey isolate whipped with organic oats, wild blueberries, crushed chia seeds, and raw honeycomb.',
    highlights: ['Rapid Digestion Rate', 'High Polyphenol Antioxidants', 'Sustained Low-GI Energy Curve']
  },
  {
    id: 'meal-4',
    title: 'Bison Flank Steak & Jasmine Rice Stack',
    category: 'Clean Bulking',
    calories: 890,
    protein: 72,
    carbs: 88,
    fats: 22,
    prepTime: '25 Min',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    description: 'Lean ground bison seasoned with smoked paprika, layered over steaming jasmine rice and charred asparagus spears.',
    highlights: ['Lean Muscle Retention', 'Ultra-Low Saturated Fat Profile', 'High Creatine Density']
  }
];

export const SUCCESS_STORIES = [
  {
    id: 'athlete-1',
    name: 'Marcus Rivera',
    sport: 'Competitive CrossFit & Weightlifting',
    goal: 'Aggressive Cut & Strength Preservation',
    metricChange: '-18 lbs Fat / +35 lbs Deadlift PR',
    timeframe: '16 Weeks',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    quote: 'NutriFuel dismantled everything I thought I knew about cutting. I maintained full energy in two-a-day sessions while stripping 6% body fat.',
    stats: {
      startWeight: '208 lbs',
      endWeight: '190 lbs',
      bodyFat: '14.8% → 8.2%',
      nutritionist: 'Dr. Sarah Jenkins'
    }
  },
  {
    id: 'athlete-2',
    name: 'Elena Rostova-Cole',
    sport: 'Distance Runner & Ultra Athlete',
    goal: 'Glycogen Periodization & Gut Health',
    metricChange: 'Sub-3hr Marathon (2:52:14)',
    timeframe: '12 Weeks',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    quote: 'No more GI distress during mile 20. The micro-nutrient and sodium timing was the single biggest differentiator in my training block.',
    stats: {
      startWeight: '132 lbs',
      endWeight: '129 lbs',
      bodyFat: '16.1% → 14.0%',
      nutritionist: 'Dr. Sarah Jenkins'
    }
  },
  {
    id: 'athlete-3',
    name: 'Darius Vance',
    sport: 'Natural Bodybuilding',
    goal: 'Hypertrophy Mass Phase',
    metricChange: '+14 lbs Lean Mass in 20 Weeks',
    timeframe: '20 Weeks',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    quote: 'Precision nutrition removes all guesswork. Every meal had a purpose, and my strength exploded without gaining unwanted adipose tissue.',
    stats: {
      startWeight: '182 lbs',
      endWeight: '196 lbs',
      bodyFat: '10.5% → 11.2%',
      nutritionist: 'Marcus Vance'
    }
  }
];

export const CURRENT_USER = {
  name: 'Alex Vance',
  email: 'alex.vance@nutrifuel.io',
  membership: 'Elite Tier',
  memberSince: 'March 2024',
  age: 28,
  weight: 185,
  height: "6'1\"",
  targetWeight: 178,
  dailyCaloriesTarget: 2850,
  dailyCaloriesConsumed: 2140,
  proteinTarget: 220,
  proteinConsumed: 175,
  carbsTarget: 280,
  carbsConsumed: 210,
  fatsTarget: 70,
  fatsConsumed: 54,
  waterTargetOz: 128,
  waterConsumedOz: 96,
  assignedNutritionist: {
    name: 'Dr. Sarah Jenkins, RD',
    avatar: 'https://images.unsplash.com/photo-1594824813591-2394d2146f48?auto=format&fit=crop&w=200&q=80',
    nextSession: 'Thursday, 3:30 PM EST'
  },
  activePlan: 'Sports Nutrition Elite (Week 6 of 12)',
  todayMeals: [
    { name: 'Meal 1: High-Density Egg White & Oat Scramble', time: '7:30 AM', cal: 620, p: 48, c: 65, f: 14, completed: true },
    { name: 'Meal 2: Pre-Workout Whey & Wild Blueberry Puree', time: '11:00 AM', cal: 480, p: 42, c: 58, f: 6, completed: true },
    { name: 'Meal 3: Post-Workout Flank Steak & Jasmine Rice', time: '2:30 PM', cal: 740, p: 60, c: 75, f: 18, completed: true },
    { name: 'Meal 4: Wild Salmon, Quinoa & Steamed Greens', time: '6:30 PM', cal: 680, p: 52, c: 55, f: 22, completed: false },
    { name: 'Meal 5: Micellar Casein & Almond Butter Sludge', time: '9:30 PM', cal: 330, p: 38, c: 12, f: 10, completed: false }
  ]
};

export const PAYMENT_HISTORY_DATA = [
  { id: 'INV-2024-0089', date: 'Aug 01, 2024', plan: 'Sports Nutrition Elite (Monthly)', amount: '$249.00', status: 'PAID', method: '•••• 4242 (Visa)' },
  { id: 'INV-2024-0062', date: 'Jul 01, 2024', plan: 'Sports Nutrition Elite (Monthly)', amount: '$249.00', status: 'PAID', method: '•••• 4242 (Visa)' },
  { id: 'INV-2024-0041', date: 'Jun 01, 2024', plan: 'Sports Nutrition Elite (Monthly)', amount: '$249.00', status: 'PAID', method: '•••• 4242 (Visa)' },
  { id: 'INV-2024-0019', date: 'May 01, 2024', plan: 'Hypertrophy Blueprint (Monthly)', amount: '$179.00', status: 'PAID', method: '•••• 4242 (Visa)' },
  { id: 'INV-2024-0005', date: 'Apr 01, 2024', plan: 'Consultation Initial Assessment', amount: '$95.00', status: 'PAID', method: '•••• 4242 (Visa)' }
];

export const ADMIN_DASHBOARD_DATA = {
  kpis: [
    { label: 'ACTIVE ATHLETES', value: '1,428', change: '+14.2%', icon: 'group', positive: true },
    { label: 'MONTHLY REVENUE', value: '$348,200', change: '+22.8%', icon: 'payments', positive: true },
    { label: 'ACTIVE NUTRITIONISTS', value: '28', change: '+3 new', icon: 'local_hospital', positive: true },
    { label: 'BOOKED CONSULTATIONS', value: '412', change: '+8.4%', icon: 'calendar_month', positive: true }
  ],
  revenueHistory: [
    { month: 'Mar', rev: 210 },
    { month: 'Apr', rev: 245 },
    { month: 'May', rev: 278 },
    { month: 'Jun', rev: 305 },
    { month: 'Jul', rev: 326 },
    { month: 'Aug', rev: 348 }
  ],
  recentConsultations: [
    { client: 'Alex Vance', dietitian: 'Dr. Sarah Jenkins', time: 'Today, 3:30 PM', type: 'Video Call', status: 'Confirmed' },
    { client: 'Rachel Adams', dietitian: 'Marcus Vance', time: 'Today, 5:00 PM', type: 'In-Person', status: 'Checked In' },
    { client: 'Tyler Knox', dietitian: 'Dr. Sarah Jenkins', time: 'Tomorrow, 10:00 AM', type: 'Video Call', status: 'Confirmed' },
    { client: 'Elena Gomez', dietitian: 'Dr. Elena Rostova', time: 'Tomorrow, 2:15 PM', type: 'Chat Review', status: 'Pending' }
  ],
  usersList: [
    { name: 'Alex Vance', email: 'alex.vance@nutrifuel.io', plan: 'Sports Nutrition Elite', status: 'Active', joined: 'Mar 2024' },
    { name: 'Rachel Adams', email: 'rachel.adams@crossfit.com', plan: 'Sports Nutrition Elite', status: 'Active', joined: 'Apr 2024' },
    { name: 'Tyler Knox', email: 'tknox@triathlon.org', plan: 'Hypertrophy Blueprint', status: 'Active', joined: 'May 2024' },
    { name: 'Elena Gomez', email: 'elena.g@marathon.io', plan: 'Diabetic Meal Plans', status: 'Active', joined: 'Jun 2024' },
    { name: 'David Chang', email: 'dchang@mma.com', plan: 'Pro Competition Prep', status: 'Active', joined: 'Jul 2024' }
  ]
};

export const PROTOTYPES_METADATA = [
  { id: 'home_nutrifuel_2', folder: 'home_nutrifuel_2', title: 'NutriFuel Landing Home', category: 'Landing' },
  { id: 'join_nutrifuel', folder: 'join_nutrifuel', title: 'Auth & Sign In / Join Portal', category: 'Authentication' },
  { id: 'home_nutrifuel_1', folder: 'home_nutrifuel_1', title: 'Sign In Alternative Layout', category: 'Authentication' },
  { id: 'about_us_nutrifuel', folder: 'about_us_nutrifuel', title: 'About NutriFuel - Forge Your Machine', category: 'Information' },
  { id: 'our_services_nutrifuel', folder: 'our_services_nutrifuel', title: 'Our Services & Pricing Plans', category: 'Services' },
  { id: 'book_a_consultation_nutrifuel', folder: 'book_a_consultation_nutrifuel', title: 'Book a Consultation Flow', category: 'Booking' },
  { id: 'nutritionist_profile_nutrifuel', folder: 'nutritionist_profile_nutrifuel', title: 'Dr. Sarah Jenkins Profile', category: 'Specialists' },
  { id: 'nutrition_in_action_nutrifuel', folder: 'nutrition_in_action_nutrifuel', title: 'Nutrition In Action Showcase', category: 'Gallery' },
  { id: 'success_stories_nutrifuel', folder: 'success_stories_nutrifuel', title: 'Success Stories & Athlete Case Studies', category: 'Social Proof' },
  { id: 'my_profile_nutrifuel', folder: 'my_profile_nutrifuel', title: 'User Profile & Macro Dashboard', category: 'Member Portal' },
  { id: 'checkout_nutrifuel', folder: 'checkout_nutrifuel', title: 'Secure Checkout & Payment', category: 'Billing' },
  { id: 'payment_history_nutrifuel', folder: 'payment_history_nutrifuel', title: 'Payment History & Invoices', category: 'Billing' },
  { id: 'admin_dashboard_nutrifuel', folder: 'admin_dashboard_nutrifuel', title: 'Admin Command Center', category: 'Admin' },
  { id: 'nutrifuel', folder: 'nutrifuel', title: 'Design System Tokens & Brand Guide', category: 'Design System' },
  { id: 'untitled_prototype_1', folder: 'untitled_prototype_1', title: 'Prototype Variant 1', category: 'Prototypes' },
  { id: 'untitled_prototype_2', folder: 'untitled_prototype_2', title: 'Prototype Variant 2', category: 'Prototypes' },
  { id: 'untitled_prototype_3', folder: 'untitled_prototype_3', title: 'Prototype Variant 3', category: 'Prototypes' },
  { id: 'untitled_prototype_4', folder: 'untitled_prototype_4', title: 'Prototype Variant 4', category: 'Prototypes' },
  { id: 'untitled_prototype_5', folder: 'untitled_prototype_5', title: 'Prototype Variant 5', category: 'Prototypes' },
  { id: 'untitled_prototype_6', folder: 'untitled_prototype_6', title: 'Prototype Variant 6', category: 'Prototypes' },
  { id: 'untitled_prototype_7', folder: 'untitled_prototype_7', title: 'Prototype Variant 7', category: 'Prototypes' }
];
