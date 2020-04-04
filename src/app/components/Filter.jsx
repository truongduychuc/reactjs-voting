/**
 Created by Gray
 using WebStorm at
 14:07 on 22-Mar-20
 */
import React, { useRef } from 'react';
import { toInteger } from "../../utils/number";
import { Input } from "reactstrap";
import PropTypes from "prop-types";
import { _func } from "../../_helpers";

const Filter = (props) => {
  const {options, onSelectionChange, placeholder, inputClassName, defaultValue} = props;
  const filterRef = useRef(null);
  const onChange = () => {
    onSelectionChange(toInteger(filterRef.current.value))
  };
  return (
    <Input
      defaultValue={defaultValue}
      type="select"
      innerRef={filterRef}
      onChange={onChange}
      className={inputClassName}
    >
      <option value="" disabled>{placeholder}</option>
      {
        options.map(option => (
          <option
            value={option._k}
            key={`roleOption${option._k}`}
          >{option._l}</option>
        ))
      }
    </Input>
  )
};
Filter.propTypes = {
  options: PropTypes.array,
  onSelectionChange: PropTypes.func,
  placeholder: PropTypes.string,
  inputClassName: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};
Filter.defaultProps = {
  options: [],
  onSelectionChange: _func.noop,
  placeholder: 'Filter by a role',
  defaultValue: ''
};
export {
  Filter
}
