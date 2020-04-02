import React from "react";
import {
  faBell,
  faCheckCircle,
  faEnvelopeOpen,
  faExclamationCircle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toastrType } from "./types";
import PropTypes from 'prop-types';

const Icon = (props) => {
  const {type} = props;

  const _getIconWithColor = type => {
    switch (type) {
      case toastrType.PRIMARY:
        return {
          icon: faBell
        };
      case toastrType.SUCCESS:
        return {
          icon: faCheckCircle
        };
      case toastrType.INFO:
        return {
          icon: faInfoCircle
        };
      case toastrType.WARNING:
        return {
          icon: faCheckCircle
        };
      case toastrType.LIGHT:
        return {
          icon: faCheckCircle
        };
      case toastrType.MESSAGE:
        return {
          icon: faEnvelopeOpen
        };
      case toastrType.ERROR:
        return {
          icon: faExclamationCircle
        };
      default:
        return {
          icon: faEnvelopeOpen
        };
    }
  };
  return (
    <FontAwesomeIcon fontSize="20px" {..._getIconWithColor(type)}/>
  )
};
Icon.defaultProps = {
  type: 'primary'
};
Icon.propTypes = {
  type: PropTypes.string
};
export { Icon }
