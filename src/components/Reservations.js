import React, { useState, useEffect } from 'react';
import { Icon, Alert, Intent, Dialog, Classes } from '@blueprintjs/core';
import { Column, Table2, Cell } from '@blueprintjs/table';
import { useSelector } from 'react-redux';
import {
  loadReservations,
  reservationsSelector,
  changeReservation,
  deleteReservation
} from '../utils/redux/store/reservations';
import { useDispatch } from 'react-redux';
import ReservationsForm from './ReservationsFrom';
import FormAlert from './FormAlert';
import useReservation from '../utils/custom-hooks/useReservation';
import {
  reservationToDelete,
  editReservation,
  reservationsData
} from '../utils/constants';
import { print } from 'graphql';

const Reservations = () => {
  const [reservationToUpdate, setReservationToUpdate] = useReservation();
  const [reservationIdToDelete, setReservationIdToDelete] = useState(0);
  const [openDeleteReservation, setOpenCloseDeleteReservation] =
    useState(false);
  const [openUpdateReservation, setOpenUpdateReservation] = useState(false);
  const [isOpenReservationFormError, setOpenReservationFormError] =
    useState(false);
  const reservations = useSelector(reservationsSelector);
  const dispatch = useDispatch();

  const loadReservationsOnScreen = () => {
    dispatch(
      loadReservations({
        query: reservationsData
      })
    );
  };

  useEffect(() => {
    loadReservationsOnScreen();
  }, []);

  const openReservationEdit = event => {
    const reservationIndex = Number(event.currentTarget.getAttribute('index'));
    setReservationToUpdate({
      reservation: {
        ...reservations[reservationIndex],
        date: new Date(Date.parse(reservations[reservationIndex].date))
      }
    });
    setOpenUpdateReservation(openUpdateReservation => !openUpdateReservation);
  };

  const closeReservationEdit = () => {
    setOpenUpdateReservation(openUpdateReservation => !openUpdateReservation);
  };

  const changeReservationToUpdate = event => {
    setReservationToUpdate({ event });
  };

  const updateReservation = () => {
    if (reservationToUpdate.name !== '' && reservationToUpdate.guestNr !== '') {
      dispatch(
        changeReservation({
          query: print(editReservation),
          variables: {
            id: Number(reservationToUpdate.id),
            name: reservationToUpdate.name,
            date: String(reservationToUpdate.date),
            guestNr: Number(reservationToUpdate.guestNr),
            email: reservationToUpdate.email
          }
        })
      );
      setReservationToUpdate();
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
    dispatch(
      deleteReservation({
        query: print(reservationToDelete),
        variables: {
          id: reservationIdToDelete
        }
      })
    );
    closeReservationDelete();
  };

  const handleReservationFormErrorClose = () => {
    setOpenReservationFormError(
      openReservationFormError => !openReservationFormError
    );
  };
  // set up the columns which to render in the table
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
      <Table2
        numRows={reservations.length}
        className={Classes.DARK}
        columnWidths={[250, 250, 250, 250, 250, 250]}
      >
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
