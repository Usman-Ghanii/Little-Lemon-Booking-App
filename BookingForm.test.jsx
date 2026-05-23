import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from './App';

describe('BookingForm component', () => {
  const mockSubmitForm = vi.fn();
  const mockUpdateTimes = vi.fn();
  const availableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  test('Renders the BookingForm heading', () => {
    render(<BookingForm availableTimes={availableTimes} updateTimes={mockUpdateTimes} submitForm={mockSubmitForm} />);
    const headingElement = screen.getByText('Reserve a Table');
    expect(headingElement).toBeInTheDocument();
  });

  test('Shows validation error if guests is less than 1', () => {
    render(<BookingForm availableTimes={availableTimes} updateTimes={mockUpdateTimes} submitForm={mockSubmitForm} />);
    const guestsInput = screen.getByLabelText(/Number of guests \*/i);
    
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);
    
    const submitButton = screen.getByText('Make Your reservation');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Number of guests must be between 1 and 10.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('Validates HTML5 attributes', () => {
    render(<BookingForm availableTimes={availableTimes} updateTimes={mockUpdateTimes} submitForm={mockSubmitForm} />);
    const dateInput = screen.getByLabelText(/Choose date \*/i);
    const guestsInput = screen.getByLabelText(/Number of guests \*/i);
    const occasionSelect = screen.getByLabelText(/Occasion \*/i);

    expect(dateInput).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
    expect(occasionSelect).toHaveAttribute('required');
  });

  test('initializeTimes returns a non-empty array', () => {
    const times = initializeTimes();
    expect(times.length).toBeGreaterThan(0);
  });

  test('updateTimes returns the same value as initializeTimes if action is not UPDATE_TIMES', () => {
    const initialState = initializeTimes();
    const updatedState = updateTimes(initialState, { type: 'SOME_OTHER_ACTION' });
    expect(updatedState).toEqual(initialState);
  });
});
