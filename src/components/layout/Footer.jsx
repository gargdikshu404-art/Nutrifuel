import React from 'react';

export const Footer = ({ setActivePage, openPrototypeDrawer }) => {
  return (
    <footer className="bg-surface-container-lowest border-t-2 border-secondary relative z-20 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg px-gutter py-stack-lg w-full max-w-container-max mx-auto">
        <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
          <div 
            onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="cursor-pointer font-display-lg text-headline-lg text-on-surface uppercase tracking-tighter flex items-center gap-2"
          >
            <span>NUTRI</span>
            <span className="text-secondary-container">FUEL</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs leading-relaxed">
            Engineering elite human performance through uncompromising nutritional science and athlete-specific bioenergetics.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container border border-white/10 font-label-caps text-[10px] uppercase text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
              ATHLETIC PROTOCOLS v2.4
            </span>
          </div>
        </div>

        <div className="col-span-1 md:col-span-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-auto">
            <div>
              <h4 className="font-label-caps text-xs uppercase text-white font-bold mb-3 tracking-wider">Navigation</h4>
              <ul className="space-y-2 font-label-caps text-xs uppercase text-on-surface-variant">
                <li><button onClick={() => { setActivePage('home'); window.scrollTo(0,0); }} className="hover:text-secondary transition-colors">Home</button></li>
                <li><button onClick={() => { setActivePage('about'); window.scrollTo(0,0); }} className="hover:text-secondary transition-colors">About Us</button></li>
                <li><button onClick={() => { setActivePage('services'); window.scrollTo(0,0); }} className="hover:text-secondary transition-colors">Services</button></li>
                <li><button onClick={() => { setActivePage('nutritionists'); window.scrollTo(0,0); }} className="hover:text-secondary transition-colors">Nutritionists</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-label-caps text-xs uppercase text-white font-bold mb-3 tracking-wider">Members</h4>
              <ul className="space-y-2 font-label-caps text-xs uppercase text-on-surface-variant">
                <li><button onClick={() => { setActivePage('profile'); window.scrollTo(0,0); }} className="hover:text-secondary transition-colors">My Profile</button></li>
                <li><button onClick={() => { setActivePage('book'); window.scrollTo(0,0); }} className="hover:text-secondary transition-colors">Book Consult</button></li>
                <li><button onClick={() => { setActivePage('payments'); window.scrollTo(0,0); }} className="hover:text-secondary transition-colors">Billing Logs</button></li>
                <li><button onClick={() => { setActivePage('admin'); window.scrollTo(0,0); }} className="hover:text-secondary transition-colors">Admin Panel</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-label-caps text-xs uppercase text-white font-bold mb-3 tracking-wider">Prototypes</h4>
              <ul className="space-y-2 font-label-caps text-xs uppercase text-on-surface-variant">
                <li><button onClick={openPrototypeDrawer} className="text-secondary hover:underline flex items-center gap-1">All 21 Folders <span className="material-symbols-outlined text-xs">arrow_forward</span></button></li>
                <li><button onClick={() => { setActivePage('action'); window.scrollTo(0,0); }} className="hover:text-secondary transition-colors">In Action</button></li>
                <li><button onClick={() => { setActivePage('stories'); window.scrollTo(0,0); }} className="hover:text-secondary transition-colors">Testimonials</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-12 border-t border-outline-variant pt-stack-sm flex flex-col sm:flex-row justify-between items-center gap-4 mt-stack-md">
          <span className="font-label-caps text-[11px] uppercase text-on-surface-variant">
            © 2024 NUTRIFUEL INC. ALL ATHLETIC RIGHTS RESERVED.
          </span>
          <div className="flex items-center gap-6 font-label-caps text-[11px] uppercase text-on-surface-variant">
            <span className="hover:text-secondary cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-secondary cursor-pointer">Terms of Bioenergetics</span>
            <span className="hover:text-secondary cursor-pointer">HIPAA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
