import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const Navbar = ({ activePage, setActivePage }) => {
  const { user, isAdmin, logout } = useAuth();
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
    <header className="bg-background/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 w-full transition-all duration-200">
      <div className="flex justify-between items-center px-gutter py-3.5 w-full max-w-container-max mx-auto">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 bg-secondary-container rounded-xl flex items-center justify-center neon-glow group-hover:rotate-12 transition-transform">
            <span className="material-symbols-outlined text-white text-xl">bolt</span>
          </div>
          <div className="font-display-lg text-2xl tracking-tight uppercase">
            <span className="text-white">NUTRI</span>
            <span className="text-secondary-container group-hover:text-secondary transition-colors">FUEL</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-body-md text-sm transition-all px-3 py-1.5 rounded-lg ${
                  isActive
                    ? 'bg-secondary/15 text-secondary font-bold border border-secondary/30'
                    : 'text-on-surface-variant hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Book Consultation Quick Action */}
          <button
            onClick={() => handleNavClick('book')}
            className={`hidden md:flex font-body-md text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
              activePage === 'book'
                ? 'bg-secondary text-primary-container font-bold shadow-md'
                : 'bg-surface-container border border-white/10 text-on-surface hover:border-secondary hover:text-secondary'
            }`}
          >
            Book Session
          </button>

          {/* Auth / Profile State */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 bg-surface-container border border-white/10 rounded-xl hover:border-secondary transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-surface-variant flex items-center justify-center font-display-lg text-secondary text-sm border border-white/10">
                  {user.name ? user.name.slice(0, 2).toUpperCase() : 'AV'}
                </div>
                <div className="hidden xl:block text-left pr-2">
                  <p className="font-body-md text-xs text-white font-bold leading-tight truncate max-w-[90px]">
                    {user.name.split(' ')[0]}
                  </p>
                  <span className="text-[10px] font-label-caps text-secondary uppercase">
                    {isAdmin ? 'ADMIN' : 'MEMBER'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-base">expand_more</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-white/10 rounded-xl shadow-2xl z-50 p-2 space-y-1">
                  <div className="p-2.5 border-b border-white/10 mb-1">
                    <p className="font-body-md text-xs text-white font-bold">{user.name}</p>
                    <p className="font-body-md text-[11px] text-on-surface-variant truncate">{user.email}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      handleNavClick('profile');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-on-surface hover:bg-secondary/10 hover:text-secondary rounded-lg font-body-md text-xs font-medium flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                    Athlete Profile
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('payments');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-on-surface hover:bg-secondary/10 hover:text-secondary rounded-lg font-body-md text-xs font-medium flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    Billing & Invoices
                  </button>

                  <button
                    onClick={() => {
                      handleNavClick('admin');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-on-surface hover:bg-secondary/10 hover:text-secondary rounded-lg font-body-md text-xs font-medium flex items-center gap-2"
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
                      className="w-full text-left px-3 py-2 text-error hover:bg-error-container/20 rounded-lg font-body-md text-xs font-medium flex items-center gap-2"
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
              className="font-body-md text-sm font-semibold px-5 py-2 bg-secondary-container text-white rounded-xl hover:bg-hot-pink transition-all neon-glow flex items-center gap-2"
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
          </div>
        </div>
      )}
    </header>
  );
};
