import React, { useState } from 'react';
import { Icon, Alert, Intent, Dialog } from '@blueprintjs/core';
import { Column, Table2, Cell } from '@blueprintjs/table';
import { useSelector } from 'react-redux';
import { reservationsSelector } from '../utils/redux/store/reservations';
import { useDispatch } from 'react-redux';
import {
  reservationDeleted,
  reservationUpdated
} from '../utils/redux/store/reservations';
import ReservationsForm from './ReservationsFrom';
import { initReservationData } from '../utils/constants';
import FormAlert from './FormAlert';

const Reservations = () => {
  const [reservationToUpdate, setReservationToUpdate] =
    useState(initReservationData);
  const [reservationIdToDelete, setReservationIdToDelete] = useState(0);
  const [openDeleteReservation, setOpenCloseDeleteReservation] =
    useState(false);
  const [openUpdateReservation, setOpenUpdateReservation] = useState(false);
  const [isOpenReservationFormError, setOpenReservationFormError] =
    useState(false);
  const reservations = useSelector(reservationsSelector);
  const dispatch = useDispatch();

  const openReservationEdit = event => {
    const reservationIndex = Number(event.currentTarget.getAttribute('index'));
    setReservationToUpdate({
      ...reservations[reservationIndex],
      date: new Date(Date.parse(reservations[reservationIndex].date))
    });
    setOpenUpdateReservation(openUpdateReservation => !openUpdateReservation);
  };

  const closeReservationEdit = () => {
    setOpenUpdateReservation(openUpdateReservation => !openUpdateReservation);
  };

  const changeReservationToUpdate = event => {
    // if the event.target is undefined set the date, else set the others
    (event.target ?? undefined) !== undefined
      ? setReservationToUpdate(previousState => ({
          ...previousState,
          [event.target.id]: event.target.value
        }))
      : setReservationToUpdate(previousState => ({
          ...previousState,
          date: event
        }));
  };

  const updateReservation = () => {
    if (reservationToUpdate.name !== '' && reservationToUpdate.guestNr !== '') {
      dispatch(
        reservationUpdated({
          ...reservationToUpdate,
          date: `${reservationToUpdate.date.toDateString()} ${reservationToUpdate.date.toLocaleTimeString(
            'en-US'
          )}`
        })
      );
      setReservationToUpdate(initReservationData);
      closeReservationEdit();
    } else {
      setOpenReservationFormError(true);
    }
  };

  const openReservationDelete = event => {
    setOpenCloseDeleteReservation(
      openDeleteReservation => !openDeleteReservation
    );
    // set the id of the given reservation we want to delete based on the index.
    setReservationIdToDelete(
      reservations[Number(event.currentTarget.getAttribute('index'))].id
    );
  };

  const closeReservationDelete = () => {
    setOpenCloseDeleteReservation(
      openDeleteReservation => !openDeleteReservation
    );
  };

  const handleReservationDelete = () => {
    dispatch(reservationDeleted({ id: reservationIdToDelete }));
    closeReservationDelete();
  };

  const handleReservationFormErrorClose = () => {
    setOpenReservationFormError(
      openReservationFormError => !openReservationFormError
    );
  };

  const cellRenderers = [
    {
      columnNr: 0,
      label: 'Name',
      renderFunction: rowIndex => <Cell>{reservations[rowIndex].name}</Cell>
    },
    {
      columnNr: 1,
      label: 'Date',
      renderFunction: rowIndex => <Cell>{reservations[rowIndex].date}</Cell>
    },
    {
      columnNr: 2,
      label: 'Guests Number',
      renderFunction: rowIndex => <Cell>{reservations[rowIndex].guestNr}</Cell>
    },
    {
      columnNr: 3,
      label: 'Email',
      renderFunction: rowIndex => <Cell>{reservations[rowIndex].email}</Cell>
    },
    {
      columnNr: 4,
      label: '',
      renderFunction: rowIndex => (
        <Cell>
          <Icon
            icon="edit"
            index={rowIndex}
            onClick={event => openReservationEdit(event)}
          ></Icon>
        </Cell>
      )
    },
    {
      columnNr: 5,
      label: '',
      renderFunction: rowIndex => (
        <Cell>
          <Icon
            index={rowIndex}
            icon="delete"
            onClick={e => openReservationDelete(e)}
          ></Icon>
        </Cell>
      )
    }
  ];

  return (
    <>
      <Table2 numRows={reservations.length}>
        {cellRenderers.map(cellRenderer => (
          <Column
            key={cellRenderer.columnNr}
            name={cellRenderer.label}
            cellRenderer={cellRenderer.renderFunction}
          />
        ))}
      </Table2>
      <Alert
        cancelButtonText="Cancel"
        confirmButtonText="Move to Trash"
        icon="trash"
        intent={Intent.DANGER}
        isOpen={openDeleteReservation}
        onCancel={closeReservationDelete}
        onConfirm={handleReservationDelete}
      >
        <p>Are you sure you want to move this reservation to Trash?</p>
      </Alert>
      <Dialog
        isOpen={openUpdateReservation}
        isCloseButtonShown={true}
        title=""
        onClose={closeReservationEdit}
      >
        <ReservationsForm
          formName="Update Reservations"
          handleClick={updateReservation}
          reservationData={reservationToUpdate}
          handleDataChange={changeReservationToUpdate}
        />
      </Dialog>
      <FormAlert
        isOpenReservationFormError={isOpenReservationFormError}
        handleReservationFormErrorClose={handleReservationFormErrorClose}
      />
    </>
  );
};

export default Reservations;
