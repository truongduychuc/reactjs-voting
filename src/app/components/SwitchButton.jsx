/**
 Created by Gray
 using WebStorm at
 21:45 on 07-Mar-20
 */
import React, { useRef } from 'react';

export const SwitchButton = ({round, checked, onChange}) => {
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
      <span className={`slider ${round ? 'round' : ''}`} />
    </label>
  )
};
