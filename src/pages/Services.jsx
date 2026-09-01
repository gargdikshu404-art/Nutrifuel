import React, { useState } from 'react';
import { SERVICES_PLANS } from '../data/mockData';
import { useCart } from '../context/CartContext';

export const Services = ({ setActivePage }) => {
  const { selectPlanForCheckout } = useCart();
  const [activeCategory, setActiveCategory] = useState('ALL');

  const handleSelectPlan = (plan) => {
    selectPlanForCheckout(plan);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPlans = activeCategory === 'ALL'
    ? SERVICES_PLANS
    : activeCategory === 'ELITE'
    ? SERVICES_PLANS.filter(p => p.badge === 'Elite' || p.badge === 'Extreme')
    : activeCategory === 'CLINICAL'
    ? SERVICES_PLANS.filter(p => p.badge === 'Clinical' || p.badge === 'Short Term')
    : SERVICES_PLANS;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Header Banner */}
      <section className="py-16 border-b-2 border-outline-variant bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter text-center">
          <div className="inline-block bg-secondary-container px-3 py-1 mb-4">
            <span className="font-label-caps text-xs uppercase text-white tracking-widest font-bold">
              High-Performance Protocols
            </span>
          </div>
          <h1 className="font-display-lg text-4xl sm:text-6xl uppercase text-white tracking-tight mb-4">
            Fuel Your <span className="text-secondary-container">Ambition</span>
          </h1>
          <p className="font-body-md text-base text-on-surface-variant max-w-2xl mx-auto">
            Choose a calculated biological blueprint. Every tier includes biofeedback monitoring, customized macro splits, and direct dietitian support.
          </p>

          {/* Filter Chips */}
          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {['ALL', 'ELITE', 'CLINICAL', 'HYPERTROPHY'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-label-caps text-xs uppercase border transition-all ${
                  activeCategory === cat
                    ? 'bg-secondary text-primary-container border-secondary font-bold neon-glow'
                    : 'bg-surface-container border-white/10 text-on-surface hover:border-white/30'
                }`}
              >
                {cat} PROTOCOLS
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className={`p-8 bg-surface-container-low border transition-all duration-300 flex flex-col justify-between group ${
                  plan.isElite
                    ? 'border-2 border-secondary-container shadow-[0_0_25px_rgba(255,74,141,0.2)] relative'
                    : 'border-white/10 hover:border-secondary/60'
                }`}
              >
                {plan.isElite && (
                  <div className="absolute -top-3.5 right-6 bg-secondary-container px-3 py-0.5 font-label-caps text-[10px] uppercase text-white font-bold tracking-wider">
                    MOST RECOMMENDED
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="material-symbols-outlined text-secondary text-4xl group-hover:scale-110 transition-transform">
                      {plan.icon}
                    </span>
                    <span className={`px-2.5 py-1 font-label-caps text-[10px] uppercase tracking-wider ${
                      plan.isElite ? 'bg-secondary-container text-white' : 'border border-white/20 text-on-surface'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="font-display-lg text-2xl uppercase text-white mb-2">{plan.title}</h3>
                  <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    <span className="font-label-caps text-[10px] text-secondary uppercase font-bold tracking-wider block mb-1">
                      Included in Blueprint:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-body-md text-on-surface">
                        <span className="material-symbols-outlined text-secondary text-base shrink-0 mt-0.5">check_circle</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="border-t border-white/10 pt-4 mb-5 flex justify-between items-baseline">
                    <span className="font-label-caps text-xs text-surface-tint uppercase">STARTING AT</span>
                    <span className="font-display-lg text-3xl text-secondary">
                      ${plan.price}
                      <span className="font-body-md text-sm text-on-surface-variant">{plan.period}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-4 font-label-caps text-xs uppercase transition-all flex items-center justify-center gap-2 ${
                      plan.isElite
                        ? 'bg-gradient-to-r from-secondary-container to-secondary text-primary-container font-bold hover:neon-glow hover:brightness-110'
                        : 'bg-surface-container border border-white/20 text-white hover:border-secondary hover:bg-secondary/10'
                    }`}
                  >
                    <span>Deploy Blueprint</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-surface-container-lowest border-t-2 border-outline-variant">
        <div className="max-w-container-max mx-auto px-gutter">
          <h2 className="font-display-lg text-3xl uppercase text-white mb-8 text-center">
            Blueprint Comparison Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-body-md text-sm">
              <thead>
                <tr className="border-b-2 border-outline-variant bg-surface-container font-label-caps text-xs uppercase text-white">
                  <th className="p-4">Feature Metric</th>
                  <th className="p-4 text-center">Hypertrophy</th>
                  <th className="p-4 text-center text-secondary">Sports Nutrition (Elite)</th>
                  <th className="p-4 text-center">Diabetic / Glycemic</th>
                  <th className="p-4 text-center">Pro Competition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-surface-container-low">
                  <td className="p-4 text-white font-bold">1-on-1 Dietitian Telehealth</td>
                  <td className="p-4 text-center text-on-surface-variant">Monthly</td>
                  <td className="p-4 text-center text-secondary font-bold">Bi-Weekly</td>
                  <td className="p-4 text-center text-on-surface-variant">Monthly</td>
                  <td className="p-4 text-center text-white">Weekly + Daily SMS</td>
                </tr>
                <tr className="hover:bg-surface-container-low">
                  <td className="p-4 text-white font-bold">Daily Macro Adjustment</td>
                  <td className="p-4 text-center text-on-surface-variant">Weekly Sync</td>
                  <td className="p-4 text-center text-secondary font-bold">Daily Dynamic</td>
                  <td className="p-4 text-center text-on-surface-variant">Bi-Weekly</td>
                  <td className="p-4 text-center text-white">Daily Real-Time</td>
                </tr>
                <tr className="hover:bg-surface-container-low">
                  <td className="p-4 text-white font-bold">Electrolyte / Water Manipulation</td>
                  <td className="p-4 text-center text-on-surface-variant">—</td>
                  <td className="p-4 text-center text-secondary font-bold">✓ Included</td>
                  <td className="p-4 text-center text-on-surface-variant">—</td>
                  <td className="p-4 text-center text-white">✓ Peak Week Protocol</td>
                </tr>
                <tr className="hover:bg-surface-container-low">
                  <td className="p-4 text-white font-bold">Continuous Glucose Monitor (CGM) Sync</td>
                  <td className="p-4 text-center text-on-surface-variant">—</td>
                  <td className="p-4 text-center text-secondary font-bold">✓ Optional</td>
                  <td className="p-4 text-center text-on-surface-variant">✓ Included</td>
                  <td className="p-4 text-center text-white">✓ Included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
