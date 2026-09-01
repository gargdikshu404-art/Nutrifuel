import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const PaymentHistory = ({ setActivePage }) => {
  const { paymentHistory, selectedPlan } = useCart();
  const [downloadToast, setDownloadToast] = useState(null);

  const handleDownloadInvoice = (inv) => {
    setDownloadToast(`Invoice receipt ${inv.id} generated and downloaded.`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface py-12">
      <div className="max-w-container-max mx-auto px-gutter space-y-8">
        {/* Header */}
        <div className="border-b-2 border-outline-variant pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-block bg-secondary-container px-2.5 py-0.5 mb-2">
              <span className="font-label-caps text-[10px] uppercase text-white font-bold tracking-widest">
                Financial Operations
              </span>
            </div>
            <h1 className="font-display-lg text-3xl sm:text-4xl uppercase text-white">
              Payment <span className="text-secondary-container">History</span>
            </h1>
            <p className="font-body-md text-xs text-on-surface-variant">
              Review your past transactions, active recurring subscriptions, and export billing statements.
            </p>
          </div>

          <button
            onClick={() => setActivePage('services')}
            className="px-5 py-2.5 bg-secondary-container text-white font-label-caps text-xs uppercase font-bold hover:bg-hot-pink transition-all neon-glow flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">upgrade</span>
            <span>Upgrade Blueprint</span>
          </button>
        </div>

        {downloadToast && (
          <div className="p-3 bg-surface-container border-2 border-secondary text-secondary font-label-caps text-xs uppercase font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-sm">download_done</span>
            {downloadToast}
          </div>
        )}

        {/* Subscription & Card Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Subscription */}
          <div className="p-6 bg-surface-container-low border-2 border-secondary/40 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-label-caps text-xs text-secondary uppercase font-bold tracking-wider">
                Current Active Protocol
              </span>
              <span className="px-2 py-0.5 bg-secondary-container text-white font-label-caps text-[10px] uppercase font-bold">
                ACTIVE
              </span>
            </div>
            <h3 className="font-display-lg text-2xl uppercase text-white">
              {selectedPlan?.title || 'Sports Nutrition Elite'}
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant">
              Billed at <strong className="text-white">${selectedPlan?.price || 249}.00{selectedPlan?.period || '/mo'}</strong>. Next auto-renewal on <strong className="text-secondary">September 01, 2024</strong>.
            </p>
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => alert('Subscription configuration updated.')}
                className="px-3 py-2 bg-surface-container border border-white/20 hover:border-secondary text-white font-label-caps text-xs uppercase"
              >
                Manage Billing Cycle
              </button>
            </div>
          </div>

          {/* Primary Payment Method */}
          <div className="p-6 bg-surface-container-low border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-label-caps text-xs text-white uppercase font-bold">
                Primary Payment Card
              </span>
              <span className="material-symbols-outlined text-secondary text-xl">credit_card</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-surface-container border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-secondary">
                VISA
              </div>
              <div>
                <span className="font-mono text-sm text-white font-bold block">•••• •••• •••• 4242</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Expires 12/28 • Default</span>
              </div>
            </div>
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => alert('Card management panel opened.')}
                className="px-3 py-2 bg-surface-container border border-white/20 hover:border-secondary text-white font-label-caps text-xs uppercase"
              >
                Update Card Details
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-surface-container-low border border-white/10 overflow-hidden">
          <div className="p-5 bg-surface-container border-b border-white/10 flex justify-between items-center">
            <h3 className="font-display-lg text-lg uppercase text-white">
              Billing Ledger & Transaction Receipts
            </h3>
            <span className="font-label-caps text-xs text-on-surface-variant">
              {paymentHistory.length} Invoices Found
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-md text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-surface-container-lowest font-label-caps text-xs uppercase text-on-surface-variant">
                  <th className="p-4">Invoice ID</th>
                  <th className="p-4">Billing Date</th>
                  <th className="p-4">Plan / Description</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-label-caps text-xs">
                {paymentHistory.map((inv) => (
                  <tr key={inv.id} className="hover:bg-surface-container/60 transition-colors">
                    <td className="p-4 text-secondary font-mono font-bold">{inv.id}</td>
                    <td className="p-4 text-white">{inv.date}</td>
                    <td className="p-4 text-white uppercase">{inv.plan}</td>
                    <td className="p-4 text-white font-bold">{inv.amount}</td>
                    <td className="p-4 text-on-surface-variant font-mono">{inv.method}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-secondary/10 border border-secondary/40 text-secondary font-bold">
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDownloadInvoice(inv)}
                        className="px-3 py-1.5 bg-surface-container border border-white/20 hover:border-secondary text-white font-label-caps text-[11px] uppercase transition-colors inline-flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
