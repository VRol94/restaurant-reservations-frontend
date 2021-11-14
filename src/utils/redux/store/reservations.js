import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { initialState } from '../../constants';

let lastId = 2;

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
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
      const reservationId = reservations.findIndex(
        reservation => reservation.id === action.payload.id
      );
      reservations.splice(reservationId, 1);
    },

    reservationUpdated: (reservations, action) => {
      const reservationId = reservations.findIndex(
        reservation => reservation.id === action.payload.id
      );
      reservations[reservationId] = action.payload;
    }
  }
});

export const reservationsSelector = createSelector(
  state => state.reservations,
  reservations => reservations
);

export const { reservationAdded, reservationDeleted, reservationUpdated } =
  reservationSlice.actions;
export default reservationSlice.reducer;
