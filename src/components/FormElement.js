import React from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { DatePicker } from '@blueprintjs/datetime';

const FormElement = ({
  label,
  id,
  required,
  value,
  placeholder,
  handleDataChange
}) => {
  const formControl =
    id !== 'date' ? (
      <InputGroup
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleDataChange}
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
  handleDataChange: PropTypes.func.isRequired
};

export default FormElement;
