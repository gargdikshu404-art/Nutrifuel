import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES_PLANS, PAYMENT_HISTORY_DATA } from '../data/mockData';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userEmail, refetchProfile } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(SERVICES_PLANS[1]); // Default to Sports Nutrition Elite
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0); // in percentage
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchPaymentHistory = async () => {
    if (!userEmail) return;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/payments/history', {
        headers: {
          'X-User-Email': userEmail
        }
      });
      if (res.ok) {
        const data = await res.json();
        setPaymentHistory(data);
      } else {
        fallbackPayments();
      }
    } catch (err) {
      console.warn("Backend API not reachable for payments, using fallback data.", err);
      fallbackPayments();
    }
  };

  const fallbackPayments = () => {
    setPaymentHistory(PAYMENT_HISTORY_DATA);
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, [userEmail]);

  const selectPlanForCheckout = (plan) => {
    setSelectedPlan(plan);
  };

  const applyPromo = (code) => {
    if (code.toUpperCase() === 'FUEL20' || code.toUpperCase() === 'OLYMPIC') {
      setDiscountApplied(20);
      return { success: true, message: '20% Athletic Discount Applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try FUEL20' };
  };

  const completeCheckout = async (orderData) => {
    setIsProcessing(true);
    const payload = {
      planId: selectedPlan.id,
      cardNumber: orderData.cardNumber || '8821',
      brand: orderData.brand || 'Visa',
      discountApplied: discountApplied
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': userEmail
        },
        body: JSON.stringify(payload)
      });
      setIsProcessing(false);
      if (res.ok) {
        const newInvoice = await res.json();
        setPaymentHistory((prev) => [newInvoice, ...prev]);
        // Trigger profile update to update active plan instantly
        if (refetchProfile) refetchProfile();
        return newInvoice;
      }
    } catch (err) {
      console.error("Checkout API request failed:", err);
    }

    // Fallback if API fails
    setIsProcessing(false);
    const newInvoice = {
      id: `INV-2024-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      plan: `${selectedPlan.title} (${selectedPlan.period === '/wk' ? 'Weekly' : 'Monthly'})`,
      amount: `$${(selectedPlan.price * (1 - discountApplied / 100)).toFixed(2)}`,
      status: 'PAID',
      method: `•••• ${orderData.cardNumber ? orderData.cardNumber.slice(-4) : '8821'} (${orderData.brand || 'Visa'})`
    };

    setPaymentHistory((prev) => [newInvoice, ...prev]);
    return newInvoice;
  };

  return (
    <CartContext.Provider
      value={{
        selectedPlan,
        selectPlanForCheckout,
        discountCode,
        setDiscountCode,
        discountApplied,
        applyPromo,
        paymentHistory,
        completeCheckout,
        isProcessing,
        setIsProcessing,
        refetchPaymentHistory: fetchPaymentHistory
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

