import React, { useState } from 'react';
import { SUCCESS_STORIES } from '../data/mockData';

export const SuccessStories = ({ setActivePage }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Header */}
      <section className="py-16 border-b-2 border-outline-variant bg-surface-container-lowest text-center">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="inline-block bg-secondary-container px-3 py-1 mb-3">
            <span className="font-label-caps text-xs uppercase text-white font-bold tracking-widest">
              Verified Case Studies
            </span>
          </div>
          <h1 className="font-display-lg text-4xl sm:text-6xl uppercase text-white mb-4">
            Results <span className="text-secondary-container">Not Excuses</span>
          </h1>
          <p className="font-body-md text-base text-on-surface-variant max-w-2xl mx-auto">
            Explore the biological transformations and personal records engineered through NutriFuel's precision nutrition protocols.
          </p>

          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {['ALL', 'CUTTING', 'ENDURANCE', 'HYPERTROPHY'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-label-caps text-xs uppercase border transition-all ${
                  activeFilter === filter
                    ? 'bg-secondary text-primary-container border-secondary font-bold'
                    : 'bg-surface-container border-white/10 text-on-surface hover:border-secondary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-surface-container-low border border-white/10 hover:border-secondary transition-all flex flex-col justify-between p-6 group"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-16 h-16 object-cover border-2 border-secondary grayscale contrast-125"
                  />
                  <div>
                    <h3 className="font-display-lg text-xl uppercase text-white">{story.name}</h3>
                    <span className="font-label-caps text-[11px] text-secondary uppercase block font-bold">
                      {story.sport}
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">
                      Coach: {story.stats.nutritionist}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-surface-container border-l-4 border-l-secondary-container mb-6">
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase block mb-1">
                    Primary Goal & Metric Shift:
                  </span>
                  <p className="font-display-lg text-lg text-white uppercase">{story.metricChange}</p>
                  <span className="font-label-caps text-xs text-secondary block mt-1">Duration: {story.timeframe}</span>
                </div>

                <p className="font-body-md text-xs text-on-surface-variant italic leading-relaxed mb-6">
                  "{story.quote}"
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2 p-3 bg-background border border-white/10 text-[11px] font-label-caps mb-4">
                  <div>
                    <span className="text-on-surface-variant block uppercase text-[9px]">Starting Stats</span>
                    <span className="text-white font-bold">{story.stats.startWeight}</span>
                  </div>
                  <div>
                    <span className="text-secondary block uppercase text-[9px]">Finished Stats</span>
                    <span className="text-secondary font-bold">{story.stats.endWeight}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-white/5">
                    <span className="text-on-surface-variant uppercase text-[9px]">Body Composition: </span>
                    <span className="text-white font-bold">{story.stats.bodyFat}</span>
                  </div>
                </div>

                <button
                  onClick={() => { setActivePage('services'); window.scrollTo(0,0); }}
                  className="w-full py-3 bg-surface-container border border-white/20 hover:border-secondary text-white font-label-caps text-xs uppercase transition-all flex items-center justify-center gap-2"
                >
                  <span>Build Similar Plan</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-surface-container border-t-2 border-outline-variant text-center">
        <div className="max-w-xl mx-auto px-gutter space-y-4">
          <h2 className="font-display-lg text-3xl uppercase text-white">Your Transformation Starts Today</h2>
          <p className="font-body-md text-sm text-on-surface-variant">
            Connect with our team to customize an athletic protocol for your specific body composition and competition goals.
          </p>
          <button
            onClick={() => { setActivePage('book'); window.scrollTo(0,0); }}
            className="px-8 py-4 bg-secondary-container text-white font-label-caps text-xs uppercase font-bold hover:bg-hot-pink transition-all neon-glow"
          >
            Schedule Consultation Now
          </button>
        </div>
      </section>
    </div>
  );
};
