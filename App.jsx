import React, { useReducer, useState } from 'react';
import BookingForm from './BookingForm';
import './App.css';

// Mock API functions for the assignment
const fetchAPI = function(date) {
  let result = [];
  // Generate some random times based on the date
  let random = Math.random();
  for(let i = 17; i <= 23; i++) {
    if(random < 0.5) {
      result.push(i + ':00');
    }
    if(random < 0.5) {
      result.push(i + ':30');
    }
    random = Math.random();
  }
  return result;
};

const submitAPI = function(formData) {
  return true;
};

export const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today);
};

export const updateTimes = (state, action) => {
  if (action.type === 'UPDATE_TIMES') {
    return fetchAPI(new Date(action.date));
  }
  return state;
};

function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const updateTimesHandler = (date) => {
    dispatch({ type: 'UPDATE_TIMES', date: date });
  };

  const submitForm = (formData) => {
    const isSubmitted = submitAPI(formData);
    if (isSubmitted) {
      setBookingConfirmed(true);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Little Lemon</h1>
        <p>Chicago</p>
      </header>
      <main>
        {bookingConfirmed ? (
          <section className="confirmation-screen" aria-live="polite">
            <h2>Booking Confirmed!</h2>
            <p>Thank you for reserving a table at Little Lemon.</p>
            <button onClick={() => setBookingConfirmed(false)}>Make another booking</button>
          </section>
        ) : (
          <section className="booking-section">
            <BookingForm 
              availableTimes={availableTimes} 
              updateTimes={updateTimesHandler} 
              submitForm={submitForm} 
            />
          </section>
        )}
      </main>
      <footer>
        <p>&copy; 2026 Little Lemon Restaurant</p>
      </footer>
    </div>
  );
}

export default App;
