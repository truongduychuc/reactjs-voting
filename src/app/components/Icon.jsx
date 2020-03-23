/**
 Created by Gray
 using WebStorm at
 15:26 on 08-Mar-20
 */
import React from 'react';

const NowUiIcon = ({icon, className}) => (
  <i className={`now-ui-icons ${icon} ${className}`}/>
);
NowUiIcon.defaultProps = {
  className: '',
  icon: ''
};
export {
  NowUiIcon
}
