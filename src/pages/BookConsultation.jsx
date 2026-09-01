import React, { useState } from 'react';
import { NUTRITIONISTS } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import confetti from 'canvas-confetti';

export const BookConsultation = ({ setActivePage }) => {
  const {
    selectedNutritionist,
    setSelectedNutritionist,
    consultationType,
    setConsultationType,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    clientGoals,
    setClientGoals,
    addBooking
  } = useBooking();

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);

  const availableTimeSlots = [
    '08:30 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:45 PM', '05:15 PM', '06:30 PM'
  ];

  const calendarDays = [
    { day: 21, active: false },
    { day: 22, active: true },
    { day: 23, active: true },
    { day: 24, active: true, selected: selectedDate.endsWith('24') },
    { day: 25, active: true },
    { day: 26, active: true },
    { day: 27, active: false },
    { day: 28, active: true },
    { day: 29, active: true },
    { day: 30, active: true },
    { day: 31, active: true }
  ];

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const newBooking = addBooking({
      nutritionist: selectedNutritionist,
      type: consultationType,
      date: selectedDate,
      time: selectedTime,
      goals: clientGoals
    });

    setCreatedBooking(newBooking);
    setBookingSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4a8d', '#ff007f', '#ffffff']
      });
    } catch {
      // fallback if canvas-confetti unsupported
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface py-12">
      <div className="max-w-4xl mx-auto px-gutter">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-block bg-secondary-container px-3 py-1 mb-3">
            <span className="font-label-caps text-xs uppercase text-white font-bold tracking-widest">
              Direct Clinical Consultation
            </span>
          </div>
          <h1 className="font-display-lg text-4xl sm:text-5xl uppercase text-white mb-2">
            Book a <span className="text-secondary-container">Consultation</span>
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant max-w-lg mx-auto">
            Select your sports dietitian, choose your consultation format, and schedule a dedicated performance review.
          </p>
        </div>

        {bookingSuccess ? (
          <div className="p-8 bg-surface-container border-2 border-secondary text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mx-auto neon-glow">
              <span className="material-symbols-outlined text-white text-3xl">check</span>
            </div>

            <div>
              <span className="font-label-caps text-xs text-secondary uppercase font-bold tracking-wider">
                APPOINTMENT CONFIRMED
              </span>
              <h2 className="font-display-lg text-3xl uppercase text-white mt-1">
                Consultation Initialized
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant max-w-md mx-auto mt-2">
                Your consultation has been booked with <strong className="text-white">{selectedNutritionist.name}</strong>.
              </p>
            </div>

            <div className="p-5 bg-surface-container-low border border-white/10 max-w-md mx-auto text-left font-label-caps text-xs space-y-2">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-on-surface-variant uppercase">Consultant:</span>
                <span className="text-white uppercase font-bold">{selectedNutritionist.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-on-surface-variant uppercase">Format:</span>
                <span className="text-secondary uppercase font-bold">{consultationType === 'videocam' ? 'Video Call' : consultationType === 'chat' ? 'Chat Consultation' : 'In-Person'}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-on-surface-variant uppercase">Schedule:</span>
                <span className="text-white uppercase font-bold">{selectedDate} @ {selectedTime}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-on-surface-variant uppercase">Booking Ref:</span>
                <span className="text-secondary font-mono font-bold">{createdBooking?.id || 'BK-8902'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={() => { setActivePage('profile'); window.scrollTo(0,0); }}
                className="px-8 py-3 bg-secondary-container text-white font-label-caps text-xs uppercase neon-glow hover:bg-hot-pink transition-all font-bold"
              >
                View in Member Dashboard
              </button>
              <button
                onClick={() => setBookingSuccess(false)}
                className="px-8 py-3 bg-surface-container border border-white/20 text-white font-label-caps text-xs uppercase hover:border-secondary transition-all"
              >
                Book Another Slot
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirmBooking} className="space-y-8">
            {/* Step 1: Select Nutritionist */}
            <section className="bg-surface-container-low border border-white/10 p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="w-6 h-6 bg-secondary text-primary-container font-label-caps text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-display-lg text-xl uppercase text-white">Select Performance Specialist</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {NUTRITIONISTS.map((nutr) => {
                  const isSelected = selectedNutritionist.id === nutr.id;
                  return (
                    <div
                      key={nutr.id}
                      onClick={() => setSelectedNutritionist(nutr)}
                      className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-surface-container border-secondary shadow-[0_0_15px_rgba(255,74,141,0.3)]'
                          : 'bg-background border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img src={nutr.avatar} alt={nutr.name} className="w-12 h-12 object-cover border border-secondary shrink-0" />
                        <div>
                          <h3 className="font-display-lg text-sm uppercase text-white">{nutr.name.split(',')[0]}</h3>
                          <span className="font-label-caps text-[10px] text-secondary uppercase block">{nutr.experience}</span>
                        </div>
                      </div>
                      <p className="font-body-md text-[11px] text-on-surface-variant line-clamp-2">
                        {nutr.specialty}
                      </p>
                      {isSelected && (
                        <div className="mt-2 text-right">
                          <span className="inline-flex items-center gap-1 text-[10px] font-label-caps text-secondary uppercase font-bold">
                            <span className="material-symbols-outlined text-sm">check_circle</span> Selected
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Consultation Format */}
            <section className="bg-surface-container-low border border-white/10 p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="w-6 h-6 bg-secondary text-primary-container font-label-caps text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-display-lg text-xl uppercase text-white">Consultation Mode</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'videocam', label: '1-on-1 Video Call', icon: 'videocam', desc: '45-Min Live Screen & Bio Review' },
                  { id: 'chat', label: 'Async Protocol Chat', icon: 'chat', desc: 'Direct Messaging & Meal Audits' },
                  { id: 'meeting_room', label: 'In-Person Lab Visit', icon: 'meeting_room', desc: 'DEXA & Sweat Sodium Analysis' }
                ].map((mode) => {
                  const isSelected = consultationType === mode.id;
                  return (
                    <div
                      key={mode.id}
                      onClick={() => setConsultationType(mode.id)}
                      className={`p-4 border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-secondary text-primary-container border-secondary font-bold shadow-[0_0_15px_rgba(255,74,141,0.4)]'
                          : 'bg-background border-white/10 hover:border-white/30 text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-2xl">{mode.icon}</span>
                        <h4 className="font-label-caps text-xs uppercase font-bold">{mode.label}</h4>
                      </div>
                      <p className={`font-body-md text-xs ${isSelected ? 'text-primary-container/80' : 'text-on-surface-variant'}`}>
                        {mode.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Step 3: Date & Time Picker */}
            <section className="bg-surface-container-low border border-white/10 p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="w-6 h-6 bg-secondary text-primary-container font-label-caps text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-display-lg text-xl uppercase text-white">Select Date & Time Slot</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div className="p-4 bg-background border border-white/10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-label-caps text-xs uppercase text-white font-bold">October 2024</span>
                    <span className="font-label-caps text-[10px] text-secondary uppercase">EST Timezone</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center font-label-caps text-[10px] text-on-surface-variant mb-2">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center font-label-caps text-xs">
                    {calendarDays.map((d, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDate(`2024-10-${d.day}`)}
                        className={`py-2 border transition-colors ${
                          selectedDate === `2024-10-${d.day}`
                            ? 'bg-secondary text-primary-container border-secondary font-bold'
                            : d.active
                            ? 'bg-surface-container text-white border-white/5 hover:border-secondary'
                            : 'text-white/20 border-transparent cursor-not-allowed'
                        }`}
                      >
                        {d.day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="p-4 bg-background border border-white/10">
                  <span className="font-label-caps text-xs uppercase text-white font-bold block mb-3">
                    Available Slots ({selectedDate})
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    {availableTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`p-2.5 font-label-caps text-xs uppercase border transition-all text-center ${
                          selectedTime === slot
                            ? 'bg-secondary-container text-white border-secondary-container font-bold neon-glow'
                            : 'bg-surface-container border-white/10 text-on-surface hover:border-secondary'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Step 4: Intake Notes */}
            <section className="bg-surface-container-low border border-white/10 p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="w-6 h-6 bg-secondary text-primary-container font-label-caps text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h2 className="font-display-lg text-xl uppercase text-white">Athletic Targets & Biofeedback Notes</h2>
              </div>

              <div>
                <label className="font-label-caps text-xs uppercase text-on-surface-variant block mb-2">
                  Describe current training schedule, dietary restrictions, or primary competition date:
                </label>
                <textarea
                  value={clientGoals}
                  onChange={(e) => setClientGoals(e.target.value)}
                  rows={3}
                  className="w-full bg-background border border-white/20 p-3 font-body-md text-sm text-white focus:border-secondary focus:ring-0 focus:outline-none"
                  placeholder="E.g., 5-day hypertrophy split, 6 AM fasted workouts, preparing for sub-3hr marathon..."
                  required
                />
              </div>
            </section>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-secondary-container to-secondary text-primary-container font-headline-md text-lg uppercase font-bold hover:neon-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>Confirm & Lock In Consultation</span>
              <span className="material-symbols-outlined text-2xl">arrow_forward</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
