import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import PropTypes from 'prop-types';
// import { DatePicker } from '@blueprintjs/datetime';
import FormElement from './FormElement';

const ReservationsForm = ({
  formName,
  handleClick,
  reservationData,
  handleDataChange
}) => {
  return (
    <Card interactive={true} elevation={Elevation.TWO}>
      <h1>{formName}</h1>
      <FormElement
        label={'Reserver Name'}
        id={'name'}
        required={'(required)'}
        value={reservationData.name}
        handleDataChange={handleDataChange}
        placeholder="Type the full name of the person who realizes the reservation"
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
        placeholder="Type the number of guests here"
      />
      <FormElement
        label={'Email'}
        id={'email'}
        required={''}
        value={reservationData.email}
        handleDataChange={handleDataChange}
        placeholder="Type your email here"
      />
      <Button
        onClick={() => handleClick()}
        type="submit"
        className="bp3-intent-primary"
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
