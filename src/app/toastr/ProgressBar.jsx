import PropTypes from 'prop-types';
import React from "react";

export default class ProgressBar extends React.Component {
  static propTypes = {
    duration: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {percent: 100};
    this.intervalId = null;
  }

  componentDidMount() {
    const distance = 100 / (this.props.duration / 10);
    this.intervalId = setInterval(() => {
      const percent = this.state.percent - distance;
      this.setState(({percent: percent > 0 ? percent : 0}));
    }, 10);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.percent <= 0 && this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }
  render() {
    const {percent} = this.state;
    return (
      <div className="rrt-progress-container">
        <div className="rrt-progressbar" style={{width: `${percent}%`}} />
      </div>
    )
  }
}
