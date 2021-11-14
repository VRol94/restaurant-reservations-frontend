import { useState } from 'react';
import { initReservationData } from '../constants';

const useReservation = () => {
  const [reservation, setReservation] = useState(initReservationData);

  const changeReservation = ({
    event = undefined,
    reservation = initReservationData
  } = {}) => {
    // if the event.target is undefined set the date, else set the others
    if (event !== undefined) {
      (event.target ?? undefined) !== undefined
        ? setReservation(previousState => ({
            ...previousState,
            [event.target.id]: event.target.value
          }))
        : setReservation(previousState => ({
            ...previousState,
            date: event
          }));
    } else {
      setReservation(reservation);
    }
  };

  return [reservation, changeReservation];
};

export default useReservation;
