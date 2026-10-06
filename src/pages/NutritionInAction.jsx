import React, { useState } from 'react';
import { NUTRITION_SHOWCASE } from '../data/mockData';

export const NutritionInAction = ({ setActivePage }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeMealModal, setActiveMealModal] = useState(null);

  const categories = ['ALL', 'PURE VEG 🌱', 'Post-Workout Hypertrophy', 'Endurance Recovery', 'Pre-Workout Fuel', 'Clean Bulking'];

  const filteredMeals = selectedCategory === 'ALL'
    ? NUTRITION_SHOWCASE
    : selectedCategory === 'PURE VEG 🌱'
    ? NUTRITION_SHOWCASE.filter(m => m.isVeg)
    : NUTRITION_SHOWCASE.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Header Banner */}
      <section className="py-16 border-b-2 border-outline-variant bg-surface-container-lowest text-center">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="inline-block bg-secondary-container px-3 py-1 mb-3">
            <span className="font-label-caps text-xs uppercase text-white font-bold tracking-widest">
              Nutritional Architecture
            </span>
          </div>
          <h1 className="font-display-lg text-4xl sm:text-6xl uppercase text-white mb-4">
            Nutrition <span className="text-secondary-container">In Action</span>
          </h1>
          <p className="font-body-md text-base text-on-surface-variant max-w-2xl mx-auto">
            High-performance bodies demand high-density fuel. Explore our chef-crafted, biochemically calculated meal formulas.
          </p>

          {/* Category Filter */}
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-body-md text-xs font-semibold uppercase border transition-all ${
                  selectedCategory === cat
                    ? 'bg-secondary text-primary-container border-secondary font-bold shadow-md'
                    : 'bg-surface-container border-white/10 text-on-surface hover:border-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Meals Grid */}
      <section className="py-16 max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-surface-container-low border border-white/10 hover:border-secondary/50 rounded-2xl transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
            >
              <div>
                <div className="relative h-64 overflow-hidden border-b border-white/10">
                  <img
                    src={meal.image}
                    alt={meal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 contrast-125 brightness-95"
                  />
                  <div className="absolute top-3 left-3 bg-secondary-container px-3 py-1 rounded-full font-label-caps text-[10px] uppercase text-white font-bold tracking-wider">
                    {meal.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur px-3 py-1 rounded-lg border border-white/20 font-label-caps text-xs text-white">
                    ⏱ {meal.prepTime}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display-lg text-2xl uppercase text-white mb-2">{meal.title}</h3>
                  <p className="font-body-md text-xs text-on-surface-variant mb-6 leading-relaxed">
                    {meal.description}
                  </p>

                  {/* Macro Gauges */}
                  <div className="grid grid-cols-4 gap-2 text-center p-3 bg-surface-container rounded-xl border border-white/5 mb-6">
                    <div>
                      <span className="font-display-lg text-lg text-secondary block">{meal.calories}</span>
                      <span className="font-label-caps text-[9px] text-on-surface-variant uppercase">KCAL</span>
                    </div>
                    <div>
                      <span className="font-display-lg text-lg text-white block">{meal.protein}g</span>
                      <span className="font-label-caps text-[9px] text-on-surface-variant uppercase">PROTEIN</span>
                    </div>
                    <div>
                      <span className="font-display-lg text-lg text-white block">{meal.carbs}g</span>
                      <span className="font-label-caps text-[9px] text-on-surface-variant uppercase">CARBS</span>
                    </div>
                    <div>
                      <span className="font-display-lg text-lg text-white block">{meal.fats}g</span>
                      <span className="font-label-caps text-[9px] text-on-surface-variant uppercase">FATS</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-2">
                    {meal.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] font-label-caps text-on-surface-variant">
                        <span className="w-1.5 h-1.5 bg-secondary-container rounded-full"></span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveMealModal(meal)}
                  className="w-full py-3 bg-surface-container border border-white/15 rounded-xl hover:border-secondary hover:bg-secondary/10 text-white font-body-md text-xs font-semibold uppercase transition-all flex items-center justify-center gap-2"
                >
                  <span>View Biochemical Breakdown</span>
                  <span className="material-symbols-outlined text-sm">restaurant</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recipe Modal */}
      {activeMealModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-secondary max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-label-caps text-[10px] text-secondary uppercase font-bold">
                  {activeMealModal.category}
                </span>
                <h3 className="font-display-lg text-2xl uppercase text-white">
                  {activeMealModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveMealModal(null)}
                className="p-1 text-on-surface-variant hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <img
              src={activeMealModal.image}
              alt={activeMealModal.title}
              className="w-full h-48 object-cover border border-white/10"
            />

            <div className="grid grid-cols-4 gap-2 text-center p-3 bg-surface-container border border-white/10 font-label-caps text-xs">
              <div><span className="text-secondary font-bold">{activeMealModal.calories}</span> KCAL</div>
              <div><span className="text-white font-bold">{activeMealModal.protein}g</span> PRO</div>
              <div><span className="text-white font-bold">{activeMealModal.carbs}g</span> CHO</div>
              <div><span className="text-white font-bold">{activeMealModal.fats}g</span> FAT</div>
            </div>

            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              {activeMealModal.description}
            </p>

            <div className="border-t border-white/10 pt-3">
              <span className="font-label-caps text-xs uppercase text-white font-bold block mb-2">
                Micronutrient Timing & Absorption:
              </span>
              <p className="font-body-md text-xs text-on-surface-variant">
                Best consumed within 90 minutes post-training session. High sodium concentration promotes immediate intravascular volume restoration and muscular cell volumization.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveMealModal(null);
                  setActivePage('services');
                }}
                className="px-5 py-2.5 bg-secondary-container text-white font-label-caps text-xs uppercase hover:bg-hot-pink transition-all font-bold"
              >
                Get Diet Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
