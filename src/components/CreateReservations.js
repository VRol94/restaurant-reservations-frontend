import React, { useState } from 'react';
import ReservationsForm from './ReservationsFrom';
import { useDispatch } from 'react-redux';
import { reservationAdded } from '../utils/redux/store/reservations';
import { initReservationData } from '../utils/constants';
import FormAlert from './FormAlert';

const CreateReservations = () => {
  const [reservationToCreate, setReservationToCreate] =
    useState(initReservationData);
  const [isOpenReservationFormError, setOpenReservationFormError] =
    useState(false);
  const dispatch = useDispatch();

  const submitCreateReservation = () => {
    if (reservationToCreate.name !== '' && reservationToCreate.guestNr !== '') {
      dispatch(
        reservationAdded({
          ...reservationToCreate,
          date: `${reservationToCreate.date.toDateString()} ${reservationToCreate.date.toLocaleTimeString(
            'en-US'
          )}`
        })
      );
      setReservationToCreate({ ...initReservationData });
    } else {
      setOpenReservationFormError(true);
    }
  };

  const changeReservationData = event => {
    //if the event.target is undefined set the date, else set the others
    (event.target ?? undefined) !== undefined
      ? setReservationToCreate(previousState => ({
          ...previousState,
          [event.target.id]: event.target.value
        }))
      : setReservationToCreate(previousState => ({
          ...previousState,
          date: event
        }));
  };

  const handleReservationFormErrorClose = () => {
    setOpenReservationFormError(
      openReservationFormError => !openReservationFormError
    );
  };

  return (
    <>
      <ReservationsForm
        formName={'Create Reservations'}
        handleClick={submitCreateReservation}
        reservationData={reservationToCreate}
        handleDataChange={changeReservationData}
      />
      <FormAlert
        isOpenReservationFormError={isOpenReservationFormError}
        handleReservationFormErrorClose={handleReservationFormErrorClose}
      />
    </>
  );
};

export default CreateReservations;
