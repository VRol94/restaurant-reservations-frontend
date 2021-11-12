import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: [],
  reducers: {
    reservationAdded: (reservations, action) => {
      reservations.push({
        id: ++lastId,
        name: action.payload.name,
        date: action.payload.date,
        guestNr: action.payload.guestNr,
        email: action.payload.email
      });
    },

    reservationDeleted: (reservations, action) => {
      reservations = reservations.filter(
        reservation => reservation.id !== action.payload.id
      );
    },

    reservationUpdated: (reservations, action) => {
      const reservationIndex = reservations.findIndex(
        reservation => reservation.id === action.payload.id
      );
      reservations[reservationIndex] = action.payload;
    }
  }
});

export const reserVationsSelector = createSelector(
  state => state.reservations,
  reservations => reservations
);

export const { reservationAdded, reservationDeleted } = reservationSlice;
export default reservationSlice.reducer;
