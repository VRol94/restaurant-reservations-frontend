import React from 'react';
import { Alert } from '@blueprintjs/core';
import PropTypes from 'prop-types';

const FormAlert = ({
  isOpenReservationFormError,
  handleReservationFormErrorClose
}) => {
  return (
    <Alert
      confirmButtonText="Okay"
      isOpen={isOpenReservationFormError}
      onClose={handleReservationFormErrorClose}
    >
      <p>
        Please complete all the fields marked as required in order to submit the
        form.
      </p>
    </Alert>
  );
};

FormAlert.propTypes = {
  isOpenReservationFormError: PropTypes.bool.isRequired,
  handleReservationFormErrorClose: PropTypes.func.isRequired
};

export default FormAlert;
