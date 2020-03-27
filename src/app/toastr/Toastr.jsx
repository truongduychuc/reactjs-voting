/**
 Created by Gray
 using WebStorm at
 04:49 on 19-Mar-20
 */
import React from 'react';
import PropTypes from 'prop-types';
import { POSITIONS, TRANSITIONS } from "./types";
import cn from 'classnames';
import { connect } from 'react-redux';
import { ToastrBox } from "./ToastrBox";
import { updateConfig } from "./utils";
import { EE } from "./emitter";
import { creator } from './actions';

class Toastr extends React.Component {
  static propTypes = {
    toastr: PropTypes.object,
    position: PropTypes.oneOf(POSITIONS),
    newestOnTop: PropTypes.bool,
    timeOut: PropTypes.number,
    progressBar: PropTypes.bool,
    transitionIn: PropTypes.oneOf(TRANSITIONS.in),
    transitionOut: PropTypes.oneOf(TRANSITIONS.out),
    preventDuplicates: PropTypes.bool,
    closeOnToastrClick: PropTypes.bool
  };
  static defaultProps = {
    position: 'top-right',
    newestOnTop: true,
    timeOut: 5000,
    progressBar: false,
    transitionIn: TRANSITIONS.in[0],
    transitionOut: TRANSITIONS.out[0],
    preventDuplicates: false,
    closeOnToastrClick: false,
    getState: state => state.toastr,
    confirmOptions: {
      okText: 'OK',
      cancelText: 'Cancel'
    }
  };
  toastrFired = {};

  toastrPositions = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ];

  constructor(props) {
    super(props);
    updateConfig(props);
  }

  componentDidMount() {
    const {add, clean, removeByType, remove} = this.props;
    EE.on('add/toastr', add);
    EE.on('clean/toastr', clean);
    EE.on('removeByType/toastr', removeByType);
    EE.on('remove/toastr', remove);
  }

  componentWillUnmount() {
    EE.removeListener('toastr/confirm');
    EE.removeListener('add/toastr');
    EE.removeListener('clean/toastr');
    EE.removeListener('removeByType/toastr');
    EE.removeListener('remove/toastr')
    this.toastrFired = {};
  }

  _addToMemory = id => {
    this.toastrFired[id] = true;
  };

  _renderToastrForPosition = position => {
    const {toastrs, progressBar, transitionIn, transitionOut, closeOnToastrClick} = this.props.toastr;
    if (toastrs) {
      return toastrs
        .filter(item => item.position === position)
        .map(item => {
          const mergedItem = {
            ...item,
            options: {
              progressBar,
              transitionIn,
              transitionOut,
              closeOnToastrClick,
              ...item.options
            }
          };

          return (
            <div key={item.id}>
              <ToastrBox
                inMemory={this.toastrFired}
                addToMemory={() => this._addToMemory(item.id)}
                item={mergedItem}
                {...this.props}
              />
              {item.options && item.options.attention &&
              <div
                onClick={() => {
                  if (typeof item.options.onAttentionClick === 'function') {
                    item.options.onAttentionClick(item.id);
                  } else {
                    this.props.remove(item.id);
                  }
                }}
                className="toastr-attention"
              />
              }
            </div>
          )
        })
    }
  };
  _renderToastrs = () => {
    const {toastr} = this.props;
    const width = toastr.toastrs && toastr.toastrs[0] && toastr.toastrs[0].options && toastr.toastrs[0].options.width;
    const style = width ? {width: width} : {};
    return (
      <div>
        {this.toastrPositions.map(position => {
          return (
            <div key={position} className={position} style={style}>
              {this._renderToastrForPosition(position)}
            </div>
          )
        })
        }
      </div>
    )
  };

  render() {
    const {className} = this.props;
    return (
      <div className={cn('redux-toastr', className)} aria-live="assertive">
        {this._renderToastrs()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  toastr: ownProps.getState ? ownProps.getState(state) : state.toastr
});
const ReduxToastr = connect(mapStateToProps, creator)(Toastr);

export {
  ReduxToastr
}
