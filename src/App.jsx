import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PrototypeDrawer } from './components/layout/PrototypeDrawer';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Nutritionists } from './pages/Nutritionists';
import { NutritionistProfile } from './pages/NutritionistProfile';
import { NutritionInAction } from './pages/NutritionInAction';
import { SuccessStories } from './pages/SuccessStories';
import { BookConsultation } from './pages/BookConsultation';
import { JoinAuth } from './pages/JoinAuth';
import { UserProfile } from './pages/UserProfile';
import { Checkout } from './pages/Checkout';
import { PaymentHistory } from './pages/PaymentHistory';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedNutritionistId, setSelectedNutritionistId] = useState('sarah-jenkins');
  const [isPrototypeDrawerOpen, setIsPrototypeDrawerOpen] = useState(false);
  const [activePrototype, setActivePrototype] = useState('home_nutrifuel_2');
  const [prototypeNotification, setPrototypeNotification] = useState(null);

  const handleSelectPrototype = (prototypeItem, targetPage) => {
    setActivePrototype(prototypeItem.id);
    setActivePage(targetPage);
    setPrototypeNotification(`Loaded React screen for: ${prototypeItem.folder}`);
    setTimeout(() => setPrototypeNotification(null), 4000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <CartProvider>
        <BookingProvider>
          <div className="min-h-screen bg-background text-on-surface flex flex-col font-body-md selection:bg-secondary-container selection:text-white">
            {/* Top Prototype Status Bar (Dismissable / Interactive) */}
            <div className="bg-surface-container-lowest border-b border-white/10 px-4 py-1.5 flex items-center justify-between text-[11px] font-label-caps text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                <span>CONVERTED REACT REPOSITORY:</span>
                <span className="text-secondary font-bold font-mono">stitch_nutrifuel_bold_ui_design ({activePrototype})</span>
              </div>
              <button
                onClick={() => setIsPrototypeDrawerOpen(true)}
                className="text-secondary hover:underline flex items-center gap-1 font-bold"
              >
                <span>Switch Prototype (21 Folders)</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </button>
            </div>

            {prototypeNotification && (
              <div className="bg-secondary-container text-white py-1.5 px-4 text-center font-label-caps text-xs uppercase font-bold animate-in slide-in-from-top duration-200">
                ⚡ {prototypeNotification}
              </div>
            )}

            {/* Main Navbar */}
            <Navbar
              activePage={activePage}
              setActivePage={setActivePage}
              openPrototypeDrawer={() => setIsPrototypeDrawerOpen(true)}
            />

            {/* Active Page View */}
            <main className="flex-1">
              {activePage === 'home' && <Home setActivePage={setActivePage} />}
              {activePage === 'about' && <About setActivePage={setActivePage} />}
              {activePage === 'services' && <Services setActivePage={setActivePage} />}
              {activePage === 'nutritionists' && (
                <Nutritionists
                  setActivePage={setActivePage}
                  setSelectedNutritionistId={setSelectedNutritionistId}
                />
              )}
              {activePage === 'nutritionist_detail' && (
                <NutritionistProfile
                  setActivePage={setActivePage}
                  selectedNutritionistId={selectedNutritionistId}
                />
              )}
              {activePage === 'action' && <NutritionInAction setActivePage={setActivePage} />}
              {activePage === 'stories' && <SuccessStories setActivePage={setActivePage} />}
              {activePage === 'book' && <BookConsultation setActivePage={setActivePage} />}
              {activePage === 'join' && <JoinAuth setActivePage={setActivePage} />}
              {activePage === 'profile' && <UserProfile setActivePage={setActivePage} />}
              {activePage === 'checkout' && <Checkout setActivePage={setActivePage} />}
              {activePage === 'payments' && <PaymentHistory setActivePage={setActivePage} />}
              {activePage === 'admin' && <AdminDashboard setActivePage={setActivePage} />}
            </main>

            {/* Footer */}
            <Footer
              setActivePage={setActivePage}
              openPrototypeDrawer={() => setIsPrototypeDrawerOpen(true)}
            />

            {/* Prototype Drawer Modal */}
            <PrototypeDrawer
              isOpen={isPrototypeDrawerOpen}
              onClose={() => setIsPrototypeDrawerOpen(false)}
              onSelectPrototype={handleSelectPrototype}
              activePrototype={activePrototype}
            />
          </div>
        </BookingProvider>
      </CartProvider>
    </AuthProvider>
  );
}
