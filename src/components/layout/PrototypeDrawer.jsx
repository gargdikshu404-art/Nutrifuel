import React, { useState } from 'react';
import { PROTOTYPES_METADATA } from '../../data/mockData';

export const PrototypeDrawer = ({ isOpen, onClose, onSelectPrototype, activePrototype }) => {
  const [filterCategory, setFilterCategory] = useState('ALL');

  if (!isOpen) return null;

  const categories = ['ALL', 'Landing', 'Authentication', 'Services', 'Booking', 'Specialists', 'Gallery', 'Social Proof', 'Member Portal', 'Billing', 'Admin', 'Prototypes'];

  const filteredList = filterCategory === 'ALL'
    ? PROTOTYPES_METADATA
    : PROTOTYPES_METADATA.filter(p => p.category === filterCategory);

  const getPageMapping = (folder) => {
    switch (folder) {
      case 'home_nutrifuel_2':
      case 'untitled_prototype_1':
      case 'untitled_prototype_2':
      case 'untitled_prototype_3':
      case 'untitled_prototype_4':
      case 'untitled_prototype_5':
      case 'untitled_prototype_6':
      case 'untitled_prototype_7':
        return 'home';
      case 'home_nutrifuel_1':
      case 'join_nutrifuel':
        return 'join';
      case 'about_us_nutrifuel':
        return 'about';
      case 'our_services_nutrifuel':
        return 'services';
      case 'book_a_consultation_nutrifuel':
        return 'book';
      case 'nutritionist_profile_nutrifuel':
        return 'nutritionist_detail';
      case 'nutrition_in_action_nutrifuel':
        return 'action';
      case 'success_stories_nutrifuel':
        return 'stories';
      case 'my_profile_nutrifuel':
        return 'profile';
      case 'checkout_nutrifuel':
        return 'checkout';
      case 'payment_history_nutrifuel':
        return 'payments';
      case 'admin_dashboard_nutrifuel':
        return 'admin';
      case 'nutrifuel':
        return 'about';
      default:
        return 'home';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-surface-container-lowest border-l-2 border-secondary h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b-2 border-outline-variant flex items-center justify-between bg-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary-container flex items-center justify-center neon-glow">
              <span className="material-symbols-outlined text-white text-lg">folder_special</span>
            </div>
            <div>
              <h2 className="font-display-lg text-xl uppercase text-white tracking-wider">
                Stitch Prototypes Inspector
              </h2>
              <p className="font-label-caps text-[11px] text-secondary uppercase">
                All 21 Subfolders Converted to React
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-white hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-5 py-3 border-b border-outline-variant bg-surface-container-low overflow-x-auto flex gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 font-label-caps text-[10px] uppercase whitespace-nowrap border transition-all ${
                filterCategory === cat
                  ? 'bg-secondary text-primary-container border-secondary font-bold'
                  : 'bg-transparent border-white/10 text-on-surface-variant hover:border-white/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Prototype Cards List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-label-caps text-on-surface-variant mb-2">
            <span>Showing {filteredList.length} of 21 Folders</span>
            <span className="text-secondary font-bold">100% React Native</span>
          </div>

          {filteredList.map((item, idx) => {
            const isCurrent = activePrototype === item.id;
            const targetPage = getPageMapping(item.folder);

            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectPrototype(item, targetPage);
                  onClose();
                }}
                className={`p-4 border transition-all cursor-pointer group flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-surface-container border-secondary shadow-[0_0_15px_rgba(255,74,141,0.25)]'
                    : 'bg-surface-container-low border-white/10 hover:border-secondary/60 hover:bg-surface-container'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-label-caps text-[11px] text-secondary font-bold">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display-lg text-lg text-white group-hover:text-secondary transition-colors uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 bg-background border border-white/20 text-[10px] font-label-caps uppercase text-secondary shrink-0">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-label-caps text-on-surface-variant pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1 font-mono text-[11px] text-on-surface/80">
                    <span className="material-symbols-outlined text-[14px] text-secondary">folder</span>
                    stitch_nutrifuel_bold_ui_design/{item.folder}
                  </span>
                  <span className="text-secondary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Launch <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-outline-variant bg-surface-container flex items-center justify-between text-xs font-label-caps text-on-surface-variant">
          <span>DESIGN SPEC: NutriFuel Bold UI</span>
          <span className="text-secondary font-bold">ATHLETIC HIGH-CONTRAST</span>
        </div>
      </div>
    </div>
  );
};
