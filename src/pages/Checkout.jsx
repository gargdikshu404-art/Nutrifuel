import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export const Checkout = ({ setActivePage }) => {
  const { selectedPlan, discountCode, setDiscountCode, discountApplied, applyPromo, completeCheckout } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    email: user?.email || 'alex.vance@nutrifuel.io',
    phone: '+1 (555) 382-9912',
    nameOnCard: 'ALEX VANCE',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvc: '891'
  });

  const [promoMessage, setPromoMessage] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState(null);

  const subtotal = selectedPlan?.price || 2499;
  const discountAmount = (subtotal * (discountApplied / 100));
  const total = subtotal - discountAmount;

  const handleApplyCode = (e) => {
    e.preventDefault();
    const result = applyPromo(discountCode);
    setPromoMessage(result);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const inv = completeCheckout(formData);
    setCreatedInvoice(inv);
    setIsCompleted(true);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff4a8d', '#ff007f', '#ffffff']
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface py-12">
      <div className="max-w-4xl mx-auto px-gutter">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-outline-variant pb-6 mb-8">
          <div>
            <span className="font-label-caps text-[10px] text-secondary uppercase font-bold tracking-widest block mb-1">
              Encrypted Billing Tunnel
            </span>
            <h1 className="font-display-lg text-3xl sm:text-4xl uppercase text-white">
              Secure <span className="text-secondary-container">Checkout</span>
            </h1>
          </div>
          <button
            onClick={() => setActivePage('services')}
            className="font-label-caps text-xs uppercase text-on-surface-variant hover:text-white flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">close</span> Cancel
          </button>
        </div>

        {isCompleted ? (
          <div className="p-8 bg-surface-container border-2 border-secondary text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mx-auto neon-glow">
              <span className="material-symbols-outlined text-white text-3xl">verified</span>
            </div>

            <div>
              <span className="font-label-caps text-xs text-secondary uppercase font-bold tracking-wider">
                TRANSACTION COMPLETE
              </span>
              <h2 className="font-display-lg text-3xl uppercase text-white mt-1">
                Blueprint Deployed Successfully
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant max-w-md mx-auto mt-2">
                Your subscription to <strong>{selectedPlan.title}</strong> is now live. An invoice receipt has been generated.
              </p>
            </div>

            <div className="p-5 bg-surface-container-low border border-white/10 max-w-md mx-auto text-left font-label-caps text-xs space-y-2">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-on-surface-variant uppercase">Invoice ID:</span>
                <span className="text-secondary font-mono font-bold">{createdInvoice?.id}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-on-surface-variant uppercase">Amount Charged:</span>
                <span className="text-white font-bold">{createdInvoice?.amount}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-on-surface-variant uppercase">Status:</span>
                <span className="text-secondary font-bold">PAID & SETTLED</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={() => { setActivePage('payments'); window.scrollTo(0,0); }}
                className="px-8 py-3 bg-secondary-container text-white font-label-caps text-xs uppercase font-bold hover:bg-hot-pink transition-all neon-glow"
              >
                View Payment Invoices
              </button>
              <button
                onClick={() => { setActivePage('profile'); window.scrollTo(0,0); }}
                className="px-8 py-3 bg-surface-container border border-white/20 text-white font-label-caps text-xs uppercase hover:border-secondary transition-all"
              >
                Go to Member Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <form onSubmit={handleCheckoutSubmit} className="lg:col-span-7 space-y-6">
              {/* Contact Information */}
              <div className="p-6 bg-surface-container-low border border-white/10 space-y-4">
                <h3 className="font-display-lg text-lg uppercase text-white flex items-center gap-2">
                  <span className="w-5 h-5 bg-secondary text-primary-container font-label-caps text-xs font-bold flex items-center justify-center">1</span>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-caps text-[11px] uppercase text-on-surface-variant block mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-white/20 p-2.5 font-body-md text-sm text-white focus:border-secondary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-[11px] uppercase text-on-surface-variant block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-background border border-white/20 p-2.5 font-body-md text-sm text-white focus:border-secondary focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-6 bg-surface-container-low border border-white/10 space-y-4">
                <h3 className="font-display-lg text-lg uppercase text-white flex items-center gap-2">
                  <span className="w-5 h-5 bg-secondary text-primary-container font-label-caps text-xs font-bold flex items-center justify-center">2</span>
                  Payment Method (UPI / Card)
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="font-label-caps text-[11px] uppercase text-on-surface-variant block mb-1">Cardholder Full Name</label>
                    <input
                      type="text"
                      value={formData.nameOnCard}
                      onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
                      className="w-full bg-background border border-white/20 p-2.5 font-body-md text-sm text-white uppercase focus:border-secondary focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-[11px] uppercase text-on-surface-variant block mb-1">Card / UPI ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-background border border-white/20 p-2.5 font-mono text-sm text-white focus:border-secondary focus:outline-none pr-10"
                        required
                      />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-secondary">credit_card</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-label-caps text-[11px] uppercase text-on-surface-variant block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="w-full bg-background border border-white/20 p-2.5 font-mono text-sm text-white focus:border-secondary focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-label-caps text-[11px] uppercase text-on-surface-variant block mb-1">Security CVC</label>
                      <input
                        type="password"
                        value={formData.cvc}
                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                        className="w-full bg-background border border-white/20 p-2.5 font-mono text-sm text-white focus:border-secondary focus:outline-none"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-secondary-container to-secondary text-primary-container font-headline-md text-base uppercase font-bold hover:neon-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>Authorize & Pay ₹{total.toFixed(2)}</span>
                <span className="material-symbols-outlined text-lg">lock</span>
              </button>
            </form>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-surface-container-low border border-white/10 space-y-4">
                <h3 className="font-display-lg text-xl uppercase text-white border-b border-white/10 pb-3">
                  Order Summary
                </h3>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-display-lg text-lg uppercase text-white">{selectedPlan.title}</h4>
                    <span className="font-label-caps text-[11px] text-secondary uppercase font-bold">
                      {selectedPlan.badge} Tier
                    </span>
                  </div>
                  <span className="font-display-lg text-xl text-white">
                    ₹{selectedPlan.price}{selectedPlan.period}
                  </span>
                </div>

                <p className="font-body-md text-xs text-on-surface-variant">
                  {selectedPlan.description}
                </p>

                {/* Promo Code Form */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Try FUEL20"
                      className="flex-1 bg-background border border-white/20 p-2 font-mono text-xs uppercase text-white focus:border-secondary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCode}
                      className="px-4 py-2 bg-surface-container border border-white/20 text-white font-label-caps text-xs uppercase hover:border-secondary"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <span className={`text-[10px] font-label-caps uppercase mt-1.5 block ${promoMessage.success ? 'text-secondary font-bold' : 'text-error'}`}>
                      {promoMessage.message}
                    </span>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-white/10 font-label-caps text-xs space-y-2">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Base Subscription:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discountApplied > 0 && (
                    <div className="flex justify-between text-secondary font-bold">
                      <span>Promo Discount ({discountApplied}%):</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Tax & Processing:</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between text-base font-display-lg uppercase text-white pt-2 border-t border-white/10">
                    <span>Total Due Now:</span>
                    <span className="text-secondary">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
