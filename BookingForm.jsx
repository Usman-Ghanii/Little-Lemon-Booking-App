import React, { useState } from 'react';

const BookingForm = ({ availableTimes, updateTimes, submitForm }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('');

  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [guestsError, setGuestsError] = useState('');
  const [occasionError, setOccasionError] = useState('');

  const validateDate = (value) => {
    if (!value) {
      setDateError('Please choose a date.');
      return false;
    }
    setDateError('');
    return true;
  };

  const validateTime = (value) => {
    if (!value) {
      setTimeError('Please choose a time.');
      return false;
    }
    setTimeError('');
    return true;
  };

  const validateGuests = (value) => {
    if (value < 1 || value > 10) {
      setGuestsError('Number of guests must be between 1 and 10.');
      return false;
    }
    setGuestsError('');
    return true;
  };

  const validateOccasion = (value) => {
    if (!value) {
      setOccasionError('Please choose an occasion.');
      return false;
    }
    setOccasionError('');
    return true;
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    validateDate(newDate);
    updateTimes(newDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDateValid = validateDate(date);
    const isTimeValid = validateTime(time);
    const isGuestsValid = validateGuests(guests);
    const isOccasionValid = validateOccasion(occasion);

    if (isDateValid && isTimeValid && isGuestsValid && isOccasionValid) {
      submitForm({ date, time, guests, occasion });
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} aria-label="Table Booking Form">
      <h2 id="booking-title">Reserve a Table</h2>
      
      <div className="form-group">
        <label htmlFor="res-date">Choose date *</label>
        <input 
          type="date" 
          id="res-date" 
          value={date} 
          onChange={handleDateChange} 
          required 
          aria-required="true"
          aria-invalid={!!dateError}
          aria-describedby="date-error"
        />
        {dateError && <span id="date-error" className="error-message" role="alert">{dateError}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="res-time">Choose time *</label>
        <select 
          id="res-time" 
          value={time} 
          onChange={(e) => { setTime(e.target.value); validateTime(e.target.value); }} 
          required 
          aria-required="true"
          aria-invalid={!!timeError}
          aria-describedby="time-error"
        >
          <option value="" disabled>Select a time</option>
          {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {timeError && <span id="time-error" className="error-message" role="alert">{timeError}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of guests *</label>
        <input 
          type="number" 
          placeholder="1" 
          min="1" 
          max="10" 
          id="guests" 
          value={guests} 
          onChange={(e) => { setGuests(parseInt(e.target.value) || ''); validateGuests(parseInt(e.target.value) || 0); }} 
          required
          aria-required="true"
          aria-invalid={!!guestsError}
          aria-describedby="guests-error"
        />
        {guestsError && <span id="guests-error" className="error-message" role="alert">{guestsError}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion *</label>
        <select 
          id="occasion" 
          value={occasion} 
          onChange={(e) => { setOccasion(e.target.value); validateOccasion(e.target.value); }} 
          required
          aria-required="true"
          aria-invalid={!!occasionError}
          aria-describedby="occasion-error"
        >
          <option value="" disabled>Select an occasion</option>
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        {occasionError && <span id="occasion-error" className="error-message" role="alert">{occasionError}</span>}
      </div>

      <button type="submit" className="submit-button" aria-label="Make your reservation">
        Make Your reservation
      </button>
    </form>
  );
};

export default BookingForm;
