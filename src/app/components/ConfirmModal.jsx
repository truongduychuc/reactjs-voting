import React from "react";
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { dom } from "../../_helpers";
import ReactDOM from 'react-dom';

class ConfirmModal extends React.Component {
  promise;
  confirmRef = React.createRef();

  componentDidMount() {
    this.promise = new $.Deferred();
    // return this.confirmRef.current.focus();
  }

  abort = () => this.promise.reject();
  confirm = () => this.promise.resolve();

  render() {
    const {
      confirmLabel,
      abortLabel,
      title,
      message
    } = this.props;


    return (
      <Modal
        isOpen={true}
        toggle={this.abort}
      >
        <ModalHeader>
          {title}
        </ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button
            ref={this.confirmRef}
            color="primary"
            onClick={this.confirm}
          >
            {confirmLabel}
          </Button>
          <Button onClick={this.abort} color="light">
            {abortLabel}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ConfirmModal.defaultProps = {
  confirmLabel: 'OK',
  abortLabel: 'Cancel',
  title: 'Confirmation',
  message: 'Are you sure?'
};
ConfirmModal.propTypes = {
  confirmLabel: PropTypes.string,
  abortLabel: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string
};

export const confirm = (message, options) => {
  let cleanup, component, props, wrapper;
  if (!options) {
    options = {}
  }
  props = $.extend({
    message: message
  }, options);
  if (!dom.canUseDOM) {
    console.warn('Error when preparing to append modal');
  }
  wrapper = document.body.appendChild(document.createElement('div'));
  component = ReactDOM.render(<ConfirmModal {...props}/>, wrapper);
  cleanup = () => {
    ReactDOM.unmountComponentAtNode(wrapper);
    return setTimeout(() => wrapper.remove());
  };
  return component.promise.always(cleanup).promise();
};