import React, { createContext, useContext, useState, useEffect } from 'react';
import { NUTRITIONISTS } from '../data/mockData';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { userEmail } = useAuth();
  const [selectedNutritionist, setSelectedNutritionist] = useState(NUTRITIONISTS[0]); // Sarah Jenkins
  const [consultationType, setConsultationType] = useState('videocam'); // videocam, chat, meeting_room
  const [selectedDate, setSelectedDate] = useState('2024-10-24');
  const [selectedTime, setSelectedTime] = useState('02:00 PM');
  const [clientGoals, setClientGoals] = useState('Targeting lean hypertrophy with carb cycling around 6 AM workouts.');
  const [confirmedBookings, setConfirmedBookings] = useState([]);

  const fetchBookings = async () => {
    if (!userEmail) return;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/bookings', {
        headers: {
          'X-User-Email': userEmail
        }
      });
      if (res.ok) {
        const data = await res.json();
        setConfirmedBookings(data);
      } else {
        fallbackBookings();
      }
    } catch (err) {
      console.warn("Backend API not reachable for bookings, using fallback data.", err);
      fallbackBookings();
    }
  };

  const fallbackBookings = () => {
    setConfirmedBookings([
      {
        id: 'BK-8902',
        nutritionist: NUTRITIONISTS[0],
        type: 'Video Call',
        date: 'Thursday, Oct 24, 2024',
        time: '02:00 PM EST',
        status: 'Confirmed'
      }
    ]);
  };

  useEffect(() => {
    fetchBookings();
  }, [userEmail]);

  const addBooking = async (bookingData) => {
    const payload = {
      nutritionistId: bookingData.nutritionist?.id || selectedNutritionist?.id || NUTRITIONISTS[0].id,
      type: bookingData.type || consultationType,
      date: bookingData.date || selectedDate,
      time: bookingData.time || selectedTime,
      goals: bookingData.goals || clientGoals
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': userEmail
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const newBooking = await res.json();
        setConfirmedBookings((prev) => [newBooking, ...prev]);
        return newBooking;
      }
    } catch (err) {
      console.error("Booking API request failed:", err);
    }

    // Fallback if API fails
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      nutritionist: bookingData.nutritionist || selectedNutritionist,
      type: bookingData.type === 'videocam' ? 'Video Call' : bookingData.type === 'chat' ? 'Chat Consultation' : 'In-Person Session',
      date: bookingData.date || selectedDate,
      time: bookingData.time || selectedTime,
      goals: bookingData.goals || clientGoals,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    setConfirmedBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  return (
    <BookingContext.Provider
      value={{
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
        confirmedBookings,
        addBooking,
        refetchBookings: fetchBookings
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);

