/**
 Created by Gray
 using WebStorm at
 10:46 on 01-Apr-20
 */
import React from 'react';
import PropTypes from 'prop-types';

const FormError = props => (
  <div className="form-error">{props.children}</div>
);
FormError.propTypes = {
  children: PropTypes.node
};
export {
  FormError
}
