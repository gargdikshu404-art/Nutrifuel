import React from 'react';

export const About = ({ setActivePage }) => {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Hero Section */}
      <section className="relative py-20 border-b-2 border-outline-variant overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent z-10"></div>
          <img
            alt="NutriFuel Lab"
            className="w-full h-full object-cover grayscale brightness-40 contrast-150"
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80"
          />
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-gutter">
          <div className="max-w-2xl">
            <span className="font-label-caps text-xs uppercase text-secondary tracking-widest block mb-3">
              The Origin // Est. 2020
            </span>
            <h1 className="font-display-lg text-4xl sm:text-6xl md:text-7xl uppercase text-white leading-none mb-6">
              Forge Your <br />
              <span className="text-secondary-container">Machine.</span>
            </h1>
            <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
              We reject the soft, muted trends in modern wellness. High-performance bodies are precision engines—they demand uncompromising, mathematically calculated fueling protocols.
            </p>
          </div>
        </div>
      </section>

      {/* Core Scientific Pillars */}
      <section className="py-20 bg-surface-container-lowest border-b-2 border-outline-variant">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="max-w-xl mb-14">
            <span className="font-label-caps text-xs uppercase text-secondary tracking-widest block mb-2">
              Uncompromising Foundations
            </span>
            <h2 className="font-display-lg text-3xl sm:text-5xl uppercase text-white">
              The 4 Pillars of NutriFuel Science
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-surface-container-low border-l-4 border-l-secondary-container border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-label-caps text-xs text-secondary font-bold">PILLAR 01</span>
                <span className="h-px flex-1 bg-white/10"></span>
              </div>
              <h3 className="font-display-lg text-2xl uppercase text-white mb-3">
                Cellular Bioenergetics & ATP
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                We calculate macronutrient combustion ratios to accelerate phosphocreatine regeneration, preventing lactic accumulation during maximal effort intervals.
              </p>
            </div>

            <div className="p-8 bg-surface-container-low border-l-4 border-l-secondary border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-label-caps text-xs text-secondary font-bold">PILLAR 02</span>
                <span className="h-px flex-1 bg-white/10"></span>
              </div>
              <h3 className="font-display-lg text-2xl uppercase text-white mb-3">
                Intra-Workout Glycemic Timing
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Carbohydrate periodization is sequenced to match high-flux metabolic demand. We spike insulin strictly when GLUT4 glucose transporters are translocation-primed.
              </p>
            </div>

            <div className="p-8 bg-surface-container-low border-l-4 border-l-secondary border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-label-caps text-xs text-secondary font-bold">PILLAR 03</span>
                <span className="h-px flex-1 bg-white/10"></span>
              </div>
              <h3 className="font-display-lg text-2xl uppercase text-white mb-3">
                Essential Amino Acid Kinetics
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Every meal plan guarantees a minimum 3.2g leucine threshold per bolus, keeping the mTOR anabolic pathway active across all 24 hours of circadian recovery.
              </p>
            </div>

            <div className="p-8 bg-surface-container-low border-l-4 border-l-secondary-container border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-label-caps text-xs text-secondary font-bold">PILLAR 04</span>
                <span className="h-px flex-1 bg-white/10"></span>
              </div>
              <h3 className="font-display-lg text-2xl uppercase text-white mb-3">
                Electrolyte & Osmotic Balance
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Custom milligram-precision sodium, potassium, and magnesium ratios tailored to individual sweat rates and environmental training temperatures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Matrix */}
      <section className="py-16 bg-surface-container border-b-2 border-outline-variant">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="font-display-lg text-4xl sm:text-5xl text-secondary block">100%</span>
              <span className="font-label-caps text-xs uppercase text-on-surface-variant mt-2 block">Custom Formulas</span>
            </div>
            <div>
              <span className="font-display-lg text-4xl sm:text-5xl text-white block">850k+</span>
              <span className="font-label-caps text-xs uppercase text-on-surface-variant mt-2 block">Macros Tracked</span>
            </div>
            <div>
              <span className="font-display-lg text-4xl sm:text-5xl text-secondary block">14+</span>
              <span className="font-label-caps text-xs uppercase text-on-surface-variant mt-2 block">Doctorate Staff</span>
            </div>
            <div>
              <span className="font-display-lg text-4xl sm:text-5xl text-white block">0</span>
              <span className="font-label-caps text-xs uppercase text-on-surface-variant mt-2 block">Generic Templates</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Callout */}
      <section className="py-20 bg-background text-center">
        <div className="max-w-2xl mx-auto px-gutter">
          <h2 className="font-display-lg text-3xl sm:text-5xl uppercase text-white mb-4">
            Ready to Engineer Your Potential?
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant mb-8">
            Consult with our chief dietitians and get a biological fueling protocol built for your unique physiology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => { setActivePage('book'); window.scrollTo(0,0); }}
              className="px-8 py-4 bg-secondary-container text-white font-label-caps text-xs uppercase neon-glow hover:bg-hot-pink transition-all"
            >
              Book Specialist Consult
            </button>
            <button
              onClick={() => { setActivePage('services'); window.scrollTo(0,0); }}
              className="px-8 py-4 bg-surface-container border border-white/20 text-white font-label-caps text-xs uppercase hover:border-secondary transition-all"
            >
              Explore Fuel Blueprints
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
