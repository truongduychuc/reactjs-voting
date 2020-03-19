/**
 Created by Gray
 using WebStorm at
 21:45 on 07-Mar-20
 */
import React, { useRef } from 'react';
import Proptypes from 'prop-types';
import { _func } from "../../_helpers";

const propTypes = {
  round: Proptypes.bool,
  checked: Proptypes.bool,
  onChange: Proptypes.func
};

const defaultProps = {
  round: false,
  checked: false,
  onChange: _func.noop
};

const Switch = ({round, checked, onChange}) => {
  const inputRef = useRef(null);

  const handleOnChange = () => {
    onChange(inputRef.current.checked);
  };

  return (
    <label className="switch">
      <input
        ref={inputRef}
        defaultChecked={checked}
        type="checkbox"
        onChange={handleOnChange}
      />
      <span className={`slider ${round ? 'round' : ''}`}/>
    </label>
  )
};
Switch.defaultProps = defaultProps;
Switch.propTypes = propTypes;
export const SwitchButton = Switch;
