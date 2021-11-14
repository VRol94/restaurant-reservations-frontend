import React, { useState } from 'react';
import ReservationsForm from './ReservationsFrom';
import { useDispatch } from 'react-redux';
import { reservationAdded } from '../utils/redux/store/reservations';
import FormAlert from './FormAlert';
import useReservation from '../utils/custom-hooks/useReservation';
import styled from 'styled-components';

const CreateReservationsWrapper = styled.div`
  position: relative;
  width: 25%;
`;

const CreateReservations = () => {
  const [reservationToCreate, setReservationToCreate] = useReservation();
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
      setReservationToCreate();
    } else {
      setOpenReservationFormError(true);
    }
  };

  const changeReservationData = event => {
    setReservationToCreate({ event });
  };

  const handleReservationFormErrorClose = () => {
    setOpenReservationFormError(
      openReservationFormError => !openReservationFormError
    );
  };

  return (
    <CreateReservationsWrapper>
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
    </CreateReservationsWrapper>
  );
};

export default CreateReservations;
