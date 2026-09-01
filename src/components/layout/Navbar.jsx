import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const Navbar = ({ activePage, setActivePage, openPrototypeDrawer }) => {
  const { user, isAdmin, logout, switchRole } = useAuth();
  const { selectedPlan } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'nutritionists', label: 'Nutritionists' },
    { id: 'action', label: 'In Action' },
    { id: 'stories', label: 'Testimonials' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-background/95 backdrop-blur-md border-b-2 border-outline-variant sticky top-0 z-50 w-full transition-all duration-200">
      <div className="flex justify-between items-center px-gutter py-3 w-full max-w-container-max mx-auto">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-secondary-container rounded-none flex items-center justify-center neon-glow group-hover:rotate-12 transition-transform">
            <span className="material-symbols-outlined text-white text-xl">bolt</span>
          </div>
          <div className="font-display-lg text-headline-md tracking-tighter uppercase">
            <span className="text-white">NUTRI</span>
            <span className="text-secondary-container group-hover:text-secondary transition-colors">FUEL</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-label-caps text-label-caps uppercase transition-all py-1 border-b-2 tracking-widest ${
                  isActive
                    ? 'text-secondary border-secondary shadow-[0_4px_10px_-2px_rgba(255,74,141,0.5)]'
                    : 'text-on-surface hover:text-secondary border-transparent'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* 21 Stitch Prototypes Explorer Button */}
          <button
            onClick={openPrototypeDrawer}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-surface-container border border-secondary/40 text-secondary hover:bg-secondary/10 font-label-caps text-[11px] uppercase tracking-wider transition-all"
            title="Inspect all 21 original stitch prototypes"
          >
            <span className="material-symbols-outlined text-[16px]">folder_open</span>
            <span>Prototypes (21)</span>
          </button>

          {/* Book Consultation Quick Action */}
          <button
            onClick={() => handleNavClick('book')}
            className={`hidden md:flex font-label-caps text-label-caps uppercase px-4 py-2 border transition-all ${
              activePage === 'book'
                ? 'bg-secondary text-primary-container border-secondary font-bold'
                : 'border-white/20 text-on-surface hover:border-secondary hover:text-secondary'
            }`}
          >
            Book Session
          </button>

          {/* Auth / Profile State */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 bg-surface-container border border-outline-variant hover:border-secondary transition-all"
              >
                <div className="w-8 h-8 bg-surface-variant flex items-center justify-center font-display-lg text-secondary text-sm border border-white/10">
                  {user.name ? user.name.slice(0, 2).toUpperCase() : 'AV'}
                </div>
                <div className="hidden xl:block text-left pr-2">
                  <p className="font-label-caps text-[11px] uppercase text-white font-bold leading-tight truncate max-w-[90px]">
                    {user.name.split(' ')[0]}
                  </p>
                  <span className="text-[9px] font-label-caps text-secondary uppercase">
                    {isAdmin ? 'ADMIN' : 'MEMBER'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-base">expand_more</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border-2 border-outline-variant shadow-2xl z-50 p-2 space-y-1">
                  <div className="p-2 border-b border-white/10 mb-1">
                    <p className="font-label-caps text-xs text-white uppercase font-bold">{user.name}</p>
                    <p className="font-body-md text-[11px] text-on-surface-variant truncate">{user.email}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      handleNavClick('profile');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-on-surface hover:bg-secondary/10 hover:text-secondary font-label-caps text-xs uppercase flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                    Athlete Profile
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('payments');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-on-surface hover:bg-secondary/10 hover:text-secondary font-label-caps text-xs uppercase flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    Billing & Invoices
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('admin');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-on-surface hover:bg-secondary/10 hover:text-secondary font-label-caps text-xs uppercase flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                    Admin Dashboard
                  </button>

                  <div className="border-t border-white/10 my-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-error hover:bg-error-container/20 font-label-caps text-xs uppercase flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('join')}
              className="font-label-caps text-label-caps uppercase px-5 py-2.5 bg-secondary-container text-white border border-transparent hover:border-white transition-all neon-glow flex items-center gap-2"
            >
              <span>Sign In</span>
              <span className="material-symbols-outlined text-[18px]">login</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-on-surface hover:text-secondary focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b-2 border-secondary px-gutter py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left py-2 font-label-caps text-sm uppercase ${
                activePage === link.id ? 'text-secondary font-bold pl-2 border-l-2 border-secondary' : 'text-on-surface'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('book')}
              className="w-full py-2.5 bg-secondary-container text-white font-label-caps text-xs uppercase flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Book Consultation
            </button>
            <button
              onClick={() => {
                openPrototypeDrawer();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 bg-surface-container border border-secondary/30 text-secondary font-label-caps text-xs uppercase flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">folder_open</span>
              Explore All 21 Stitch Prototypes
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
