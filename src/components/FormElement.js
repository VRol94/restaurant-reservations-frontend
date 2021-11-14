import React from 'react';
import { FormGroup, Classes } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { DatePicker } from '@blueprintjs/datetime';

const FormElement = ({
  label,
  id,
  required,
  value,
  placeholder,
  handleDataChange,
  type
}) => {
  const formControl =
    id !== 'date' ? (
      <input
        className={Classes.INPUT}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleDataChange}
        type={type}
      />
    ) : (
      <DatePicker
        id={id}
        timePickerProps={{ disabled: false }}
        value={value}
        onChange={handleDataChange}
        minDate={new Date()}
      />
    );
  return (
    <FormGroup label={label} labelFor={id} labelInfo={required}>
      {formControl}
    </FormGroup>
  );
};

FormElement.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  handleDataChange: PropTypes.func.isRequired,
  type: PropTypes.string
};

export default FormElement;
