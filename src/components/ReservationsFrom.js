import React from 'react';
import { Button, Card, Elevation, Classes } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import FormElement from './FormElement';

const ReservationsForm = ({
  formName,
  handleClick,
  reservationData,
  handleDataChange
}) => {
  return (
    <Card interactive={true} elevation={Elevation.TWO} className={Classes.DARK}>
      <h1>{formName}</h1>
      <FormElement
        label={'Reserver Name'}
        id={'name'}
        required={'(required)'}
        value={reservationData.name}
        handleDataChange={handleDataChange}
        placeholder="Type the reserver name"
        type="text"
      />
      <FormElement
        label={'Reservation Date and Time'}
        id={'date'}
        required={'(required)'}
        value={reservationData.date}
        handleDataChange={handleDataChange}
      />
      <FormElement
        label={'Number of Guests'}
        id={'guestNr'}
        required={'(required)'}
        value={reservationData.guestNr}
        handleDataChange={handleDataChange}
        placeholder="Type the nr of guests"
        type="number"
      />
      <FormElement
        label={'Email'}
        id={'email'}
        required={''}
        value={reservationData.email}
        handleDataChange={handleDataChange}
        placeholder="Type your email"
        type="email"
      />
      <Button
        onClick={() => handleClick()}
        type="submit"
        className={Classes.INTENT_PRIMARY}
      >
        Submit
      </Button>
    </Card>
  );
};

ReservationsForm.propTypes = {
  formName: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  reservationData: PropTypes.object.isRequired,
  handleDataChange: PropTypes.func.isRequired
};

export default ReservationsForm;
