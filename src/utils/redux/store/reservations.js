import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { initialState, url } from '../../constants';
import moment from 'moment';
import { apiCallBegan } from './api';

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    reservationsLoaded: (reservations, action) => {
      reservations.list = action.payload.data.reservations;
    },

    reservationAdded: (reservations, action) => {
      reservations.list.push(action.payload.data);
    },

    reservationDeleted: (reservations, action) => {
      const reservationId = reservations.list.findIndex(
        reservation => reservation.id === action.payload.id
      );
      reservations.list.splice(reservationId, 1);
    },

    reservationUpdated: (reservations, action) => {
      const reservationId = reservations.list.findIndex(
        reservation =>
          reservation.id === action.payload.data.updateReservation.id
      );
      reservations.list[reservationId] = action.payload.data.updateReservation;
    }
  }
});

export const reservationsSelector = createSelector(
  state => state.reservations,
  reservations => reservations.list
);

export const {
  reservationsLoaded,
  reservationAdded,
  reservationDeleted,
  reservationUpdated
} = reservationSlice.actions;
export default reservationSlice.reducer;

export const loadReservations = reservations => (dispatch, getState) => {
  const { lastFetch } = getState().reservations;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      method: 'post',
      data: reservations,
      onSuccess: reservationsLoaded
    })
  );
};

export const addReservation = reservation =>
  apiCallBegan({
    url,
    method: 'post',
    data: reservation,
    onSuccess: reservationAdded
  });

export const changeReservation = reservation =>
  apiCallBegan({
    url,
    method: 'post',
    data: reservation,
    onSuccess: reservationUpdated
  });

export const deleteReservation = reservation =>
  apiCallBegan({
    url,
    method: 'post',
    data: reservation,
    onSuccess: reservationDeleted
  });
