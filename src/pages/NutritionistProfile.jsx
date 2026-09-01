import React from 'react';
import { NUTRITIONISTS } from '../data/mockData';
import { useBooking } from '../context/BookingContext';

export const NutritionistProfile = ({ setActivePage, selectedNutritionistId }) => {
  const { setSelectedNutritionist } = useBooking();
  const nutritionist = NUTRITIONISTS.find(n => n.id === selectedNutritionistId) || NUTRITIONISTS[0];

  const handleBookSession = () => {
    setSelectedNutritionist(nutritionist);
    setActivePage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Banner / Header */}
      <section className="relative py-16 border-b-2 border-outline-variant bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter">
          <button
            onClick={() => setActivePage('nutritionists')}
            className="font-label-caps text-xs uppercase text-on-surface-variant hover:text-secondary mb-6 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to All Nutritionists
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Specialist Avatar & Badges */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
              <div className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-secondary overflow-hidden shadow-[0_0_30px_rgba(255,74,141,0.3)] mb-4">
                <img
                  src={nutritionist.avatar}
                  alt={nutritionist.name}
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-secondary-container text-white font-label-caps text-[10px] uppercase font-bold">
                  {nutritionist.experience} EXP
                </span>
                <span className="px-3 py-1 bg-surface-container border border-white/20 text-secondary font-label-caps text-[10px] uppercase">
                  ★ {nutritionist.rating} ({nutritionist.reviewsCount} REVIEWS)
                </span>
              </div>
            </div>

            {/* Right: Bio & Credentials */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-block bg-surface-container px-3 py-1 border border-secondary/40">
                <span className="font-label-caps text-xs text-secondary uppercase font-bold">
                  {nutritionist.title}
                </span>
              </div>
              <h1 className="font-display-lg text-4xl sm:text-5xl uppercase text-white leading-none">
                {nutritionist.name}
              </h1>
              <p className="font-label-caps text-sm text-secondary uppercase tracking-wider">
                Specialization: {nutritionist.specialty}
              </p>
              <p className="font-body-md text-base text-on-surface-variant leading-relaxed pt-2">
                {nutritionist.bio}
              </p>

              {/* Action Button */}
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={handleBookSession}
                  className="px-8 py-4 bg-gradient-to-r from-secondary-container to-secondary text-primary-container font-headline-md text-sm uppercase font-bold hover:neon-glow transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                  <span>Book Consultation With {nutritionist.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Specialized Programs */}
      <section className="py-16 max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Philosophy */}
          <div className="lg:col-span-6 p-8 bg-surface-container-low border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-xs uppercase text-secondary tracking-widest block mb-2">
                Clinical Philosophy
              </span>
              <h3 className="font-display-lg text-2xl uppercase text-white mb-4">
                Biological Equation of Performance
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed italic">
                "{nutritionist.philosophy}"
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="font-label-caps text-xs uppercase text-white block font-bold mb-3">
                Board Accreditations & Degrees:
              </span>
              <ul className="space-y-2 font-label-caps text-xs text-on-surface-variant">
                {nutritionist.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-sm">verified</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Programs */}
          <div className="lg:col-span-6 p-8 bg-surface-container-low border border-white/10">
            <span className="font-label-caps text-xs uppercase text-secondary tracking-widest block mb-2">
              Featured Protocols
            </span>
            <h3 className="font-display-lg text-2xl uppercase text-white mb-6">
              Specialized Coaching Programs
            </h3>

            <div className="space-y-4">
              {nutritionist.specializedPrograms.map((prog, idx) => (
                <div key={idx} className="p-4 bg-surface-container border-l-2 border-secondary flex items-center justify-between">
                  <div>
                    <h4 className="font-display-lg text-base text-white uppercase">{prog.name}</h4>
                    <span className="font-label-caps text-[11px] text-on-surface-variant">Duration: {prog.duration}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-secondary-container text-white font-label-caps text-[10px] uppercase font-bold">
                    {prog.intensity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verified Reviews */}
      <section className="py-16 bg-surface-container-lowest border-t-2 border-outline-variant">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-display-lg text-2xl uppercase text-white">
              Athlete Testimonials & Case Results
            </h3>
            <span className="font-label-caps text-xs text-secondary uppercase">
              100% Verified Clients
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nutritionist.recentReviews.map((rev, idx) => (
              <div key={idx} className="p-6 bg-surface-container-low border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-display-lg text-base uppercase text-white">{rev.author}</span>
                  <span className="font-label-caps text-xs text-secondary">★★★★★</span>
                </div>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed italic mb-3">
                  "{rev.comment}"
                </p>
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">{rev.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
