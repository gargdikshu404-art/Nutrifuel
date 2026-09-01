import React from 'react';
import { NUTRITIONISTS } from '../data/mockData';
import { useBooking } from '../context/BookingContext';

export const Nutritionists = ({ setActivePage, setSelectedNutritionistId }) => {
  const { setSelectedNutritionist } = useBooking();

  const handleViewProfile = (nutr) => {
    setSelectedNutritionistId(nutr.id);
    setActivePage('nutritionist_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectBook = (nutr) => {
    setSelectedNutritionist(nutr);
    setActivePage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Header */}
      <section className="py-16 border-b-2 border-outline-variant bg-surface-container-lowest text-center">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="inline-block bg-secondary-container px-3 py-1 mb-4">
            <span className="font-label-caps text-xs uppercase text-white tracking-widest font-bold">
              Board-Certified Bioenergeticists
            </span>
          </div>
          <h1 className="font-display-lg text-4xl sm:text-6xl uppercase text-white mb-4">
            Elite Dietitians & <span className="text-secondary-container">Sports Nutritionists</span>
          </h1>
          <p className="font-body-md text-base text-on-surface-variant max-w-2xl mx-auto">
            Our clinical team consists of PhD biochemists, Olympic sports dietitians, and master strength coaches dedicated to individual metabolic optimization.
          </p>
        </div>
      </section>

      {/* Nutritionists List */}
      <section className="py-16 max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NUTRITIONISTS.map((nutr) => (
            <div
              key={nutr.id}
              className="bg-surface-container-low border border-white/10 hover:border-secondary transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <div className="relative h-64 overflow-hidden border-b border-white/10">
                  <img
                    src={nutr.avatar}
                    alt={nutr.name}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur px-2.5 py-1 border border-secondary text-secondary font-label-caps text-[10px] uppercase font-bold">
                    ★ {nutr.rating} ({nutr.reviewsCount})
                  </div>
                </div>

                <div className="p-6">
                  <span className="font-label-caps text-[11px] text-secondary uppercase font-bold tracking-wider block mb-1">
                    {nutr.title}
                  </span>
                  <h3 className="font-display-lg text-2xl uppercase text-white mb-2">
                    {nutr.name}
                  </h3>
                  <p className="font-body-md text-xs text-on-surface-variant line-clamp-3 mb-4 leading-relaxed">
                    {nutr.bio}
                  </p>
                  <div className="p-3 bg-surface-container border-l-2 border-secondary mb-4">
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase block">Focus Area:</span>
                    <span className="font-label-caps text-xs text-white uppercase">{nutr.specialty}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => handleViewProfile(nutr)}
                  className="w-full py-3 bg-surface-container border border-white/20 hover:border-secondary text-white font-label-caps text-xs uppercase transition-all flex items-center justify-center gap-2"
                >
                  <span>View Clinical Bio</span>
                  <span className="material-symbols-outlined text-sm">badge</span>
                </button>
                <button
                  onClick={() => handleDirectBook(nutr)}
                  className="w-full py-3 bg-secondary-container text-white font-label-caps text-xs uppercase hover:bg-hot-pink transition-all neon-glow flex items-center justify-center gap-2 font-bold"
                >
                  <span>Book Consultation</span>
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
