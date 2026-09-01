import React from 'react';
import { SERVICES_PLANS, NUTRITIONISTS, SUCCESS_STORIES } from '../data/mockData';

export const Home = ({ setActivePage }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section (from home_nutrifuel_2 and prototypes) */}
      <section className="relative min-h-[85vh] lg:min-h-[920px] flex items-center pt-stack-lg pb-stack-lg overflow-hidden border-b-2 border-outline-variant">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 z-10 mix-blend-multiply"></div>
          <img
            alt="Athletes Training"
            className="w-full h-full object-cover object-right-top grayscale brightness-50 contrast-125"
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80"
          />
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="col-span-1 lg:col-span-8 flex flex-col justify-center">
            {/* Tag Badge */}
            <div className="inline-block bg-secondary-container px-3 py-1 mb-6 self-start">
              <span className="font-label-caps text-label-caps uppercase text-white tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 bg-white rounded-none animate-ping"></span>
                Performance Fueling
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display-lg text-4xl sm:text-6xl md:text-7xl lg:text-display-lg uppercase text-on-surface mb-stack-md leading-none tracking-tight">
              Fuel Your Body.<br />
              <span className="text-secondary-container drop-shadow-[0_0_25px_rgba(255,74,141,0.5)]">
                Trust the Experts.
              </span>
            </h1>

            {/* Body */}
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-xl leading-relaxed">
              Precision nutrition for high-performance individuals. We don't do soft wellness. We build machines. Get matched with elite dietitians to engineer your ultimate physique.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => { setActivePage('services'); window.scrollTo(0,0); }}
                className="font-label-caps text-label-caps uppercase px-8 py-4 bg-gradient-to-r from-secondary-container to-[#ff007f] text-white border-2 border-transparent hover:border-white transition-all neon-glow flex items-center justify-center gap-2 w-full sm:w-auto shadow-2xl group"
              >
                <span>Get Your Diet Plan</span>
                <span className="material-symbols-outlined text-[20px] group-hover:scale-125 transition-transform">bolt</span>
              </button>

              <button
                onClick={() => { setActivePage('book'); window.scrollTo(0,0); }}
                className="font-label-caps text-label-caps uppercase px-8 py-4 bg-surface-container border border-outline-variant hover:border-secondary-container hover:text-secondary transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Book Consultation</span>
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              </button>
            </div>

            {/* Metric Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-12 mt-8 border-t border-white/10 max-w-lg">
              <div>
                <span className="font-display-lg text-2xl sm:text-3xl text-secondary block">99.4%</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Macro Adherence</span>
              </div>
              <div>
                <span className="font-display-lg text-2xl sm:text-3xl text-white block">12+ YRS</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Sports Science</span>
              </div>
              <div>
                <span className="font-display-lg text-2xl sm:text-3xl text-secondary block">4.9 / 5</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Client Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section (from our_services_nutrifuel) */}
      <section className="py-20 bg-surface-container-lowest border-b-2 border-outline-variant">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-label-caps text-xs text-secondary uppercase tracking-widest block mb-2">
                Engineered Protocols
              </span>
              <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl uppercase text-white">
                Uncompromising Fuel Blueprints
              </h2>
            </div>
            <button
              onClick={() => { setActivePage('services'); window.scrollTo(0,0); }}
              className="font-label-caps text-xs uppercase text-secondary hover:underline flex items-center gap-1 self-start md:self-auto"
            >
              View All 5 Specialized Plans <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES_PLANS.slice(0, 3).map((plan) => (
              <div
                key={plan.id}
                className={`p-6 bg-surface-container-low border transition-all duration-300 flex flex-col justify-between group ${
                  plan.isElite
                    ? 'border-l-4 border-l-secondary-container border-white/10 hover:border-secondary shadow-[0_0_20px_rgba(255,74,141,0.15)]'
                    : 'border-white/10 hover:border-secondary/60'
                }`}
              >
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
                </div>

                <div>
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center mb-4">
                    <span className="font-label-caps text-[11px] text-surface-tint uppercase">STARTING AT</span>
                    <span className="font-display-lg text-3xl text-secondary">
                      ${plan.price}<span className="font-body-md text-sm text-on-surface-variant">{plan.period}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => { setActivePage('checkout'); window.scrollTo(0,0); }}
                    className="w-full py-3 bg-surface-container border border-white/15 hover:border-secondary hover:bg-secondary/10 text-white font-label-caps text-xs uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <span>Configure Plan</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lead Nutritionist Spotlight (from nutritionist_profile_nutrifuel) */}
      <section className="py-20 bg-background border-b-2 border-outline-variant">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative border-2 border-secondary overflow-hidden shadow-[0_0_30px_rgba(255,74,141,0.25)]">
                <img
                  src={NUTRITIONISTS[0].banner}
                  alt={NUTRITIONISTS[0].name}
                  className="w-full h-[450px] object-cover grayscale contrast-125 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-surface-container-lowest/90 backdrop-blur border border-white/10">
                  <span className="font-label-caps text-[10px] text-secondary uppercase font-bold tracking-widest block">Chief Dietitian</span>
                  <p className="font-display-lg text-xl text-white uppercase">{NUTRITIONISTS[0].name}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block bg-surface-container px-3 py-1 border border-secondary/30">
                <span className="font-label-caps text-xs text-secondary uppercase">Specialist Spotlight</span>
              </div>
              <h2 className="font-display-lg text-3xl sm:text-5xl uppercase text-white leading-none">
                Olympic-Grade Science.<br />
                <span className="text-secondary-container">Zero Guesswork.</span>
              </h2>
              <p className="font-body-md text-base text-on-surface-variant leading-relaxed">
                "{NUTRITIONISTS[0].philosophy}"
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-surface-container-low border border-white/5">
                  <span className="font-label-caps text-xs text-secondary uppercase block font-bold">12+ Years</span>
                  <span className="font-body-md text-xs text-on-surface-variant">Clinical & Sports Exp</span>
                </div>
                <div className="p-3 bg-surface-container-low border border-white/5">
                  <span className="font-label-caps text-xs text-secondary uppercase block font-bold">850+ Athletes</span>
                  <span className="font-body-md text-xs text-on-surface-variant">Coached & Fuelled</span>
                </div>
                <div className="p-3 bg-surface-container-low border border-white/5 col-span-2 sm:col-span-1">
                  <span className="font-label-caps text-xs text-secondary uppercase block font-bold">4.95 Rating</span>
                  <span className="font-body-md text-xs text-on-surface-variant">140+ Verified Reviews</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => { setActivePage('nutritionist_detail'); window.scrollTo(0,0); }}
                  className="px-6 py-3.5 bg-secondary-container text-white font-label-caps text-xs uppercase tracking-wider hover:bg-hot-pink transition-all neon-glow flex items-center gap-2"
                >
                  <span>View Full Profile</span>
                  <span className="material-symbols-outlined text-[18px]">badge</span>
                </button>
                <button
                  onClick={() => { setActivePage('book'); window.scrollTo(0,0); }}
                  className="px-6 py-3.5 bg-transparent border border-white/20 hover:border-secondary text-white font-label-caps text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <span>Book with Dr. Jenkins</span>
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Callout Section (from success_stories_nutrifuel) */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-caps text-xs text-secondary uppercase tracking-widest block mb-2">Verified Transformations</span>
            <h2 className="font-display-lg text-3xl sm:text-5xl uppercase text-white">Results Not Excuses</h2>
            <p className="font-body-md text-sm text-on-surface-variant mt-2">
              Real high-performance metrics achieved through custom metabolic bioenergetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map((story) => (
              <div key={story.id} className="p-6 bg-surface-container-low border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={story.avatar} alt={story.name} className="w-14 h-14 object-cover border border-secondary" />
                    <div>
                      <h4 className="font-display-lg text-lg text-white uppercase">{story.name}</h4>
                      <p className="font-label-caps text-[10px] text-secondary uppercase">{story.sport}</p>
                    </div>
                  </div>
                  <div className="mb-4 p-3 bg-surface-container border-l-2 border-secondary text-xs font-label-caps text-white">
                    {story.metricChange} ({story.timeframe})
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant italic leading-relaxed mb-4">
                    "{story.quote}"
                  </p>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-[10px] font-label-caps text-on-surface-variant">
                  <span>START: {story.stats.startWeight}</span>
                  <span className="text-secondary font-bold">END: {story.stats.endWeight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
