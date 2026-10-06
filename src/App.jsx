import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

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

  return (
    <AuthProvider>
      <CartProvider>
        <BookingProvider>
          <div className="min-h-screen bg-background text-on-surface flex flex-col font-body-md selection:bg-secondary-container selection:text-white">
            {/* Main Navbar */}
            <Navbar
              activePage={activePage}
              setActivePage={setActivePage}
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
            />
          </div>
        </BookingProvider>
      </CartProvider>
    </AuthProvider>
  );
}
