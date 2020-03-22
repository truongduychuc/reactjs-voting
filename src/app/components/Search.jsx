/**
 Created by Gray
 using WebStorm at
 14:03 on 22-Mar-20
 */
import React, { useRef } from 'react';
import { Input } from "reactstrap";
import { _func } from "../../_helpers";
import PropTypes from 'prop-types';

const SearchInput = ({onChange, placeholder, debounce}) => {
  const inputRef = useRef(null);
  const onInputChanged = !debounce ? () => {
    onChange(inputRef.current.value);
    // eslint-disable-next-line no-undef
  } : _.debounce(e => {
    onChange(inputRef.current.value);
  }, debounce);
  return (
    <Input
      innerRef={inputRef}
      placeholder={placeholder}
      onInput={onInputChanged}
    />
  )
};
SearchInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  debounce: PropTypes.number
};
SearchInput.defaultProps = {
  onChange: _func.noop,
  placeholder: "Search a user",
  debounce: 400
};

export {
  SearchInput
}
