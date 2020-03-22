/**
 Created by Gray
 using WebStorm at
 21:45 on 07-Mar-20
 */
import React from 'react';
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

class SwitchButton extends React.Component {
  inputRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      originalCheck: props.checked
    }
  }

  componentDidMount() {
    this.inputRef.current.checked = this.state.originalCheck;
  }

  // used to rollback to origin value as we desire
  restoreValue = () => {
    this.inputRef.current.checked = this.props.checked;
  };
  handleOnChange = () => {
    this.props.onChange(this.inputRef.current.checked);
  };

  render() {
    const {round} = this.props;
    return (
      <label className="switch">
        <input
          ref={this.inputRef}
          type="checkbox"
          onChange={this.handleOnChange}
        />
        <span className={`slider ${round ? 'round' : ''}`}/>
      </label>
    )
  }
}

SwitchButton.defaultProps = defaultProps;
SwitchButton.propTypes = propTypes;
export {
  SwitchButton
}
