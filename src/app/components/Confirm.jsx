/**
 Created by Gray
 using WebStorm at
 23:55 on 07-Mar-20
 */
import React from "react";
import { render } from "react-dom";

let resolve;

export class Confirm extends React.Component {
  state = {
    isOpen: false,
  };
  // rest of the componet
  handleCancel = () => {
    this.setState({isOpen: false});
    resolve(false);
  };

  handleConfirm = () => {
    this.setState({isOpen: false});
    resolve(true);
  };

  show = () => {
    this.setState({isOpen: true});
    return new Promise((res) => {
      resolve = res;
    });
  };

  static create() {
    const containerElement = document.createElement('div');
    document.body.appendChild(containerElement);
    return render(<Confirm/>, containerElement);
  }

  render() {
    const {isOpen} = this.state;
    return (
      <div className={!isOpen ? 'modal' : 'modal is-active'}>
        <button className="delete" aria-label="close" onClick={this.handleCancel}/>
        <div>
          <section>
            <p>Are you sure?</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={this.handleConfirm}>OK</button>
            <button className="button" onClick={this.handleCancel}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}
