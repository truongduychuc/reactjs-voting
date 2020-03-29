import { shape, string } from 'prop-types';
import React, { isValidElement } from 'react';
import { onCSSTransitionEnd } from "./utils";
import { Icon } from "./Icon";
import cn from 'classnames';
import ProgressBar from "./ProgressBar";

class ToastrBox extends React.Component {
  static propTypes = {
    item: shape({
      options: shape({
        transitionIn: string,
        transitionOut: string
      })
    })
  };

  constructor(props) {
    super(props);

    let {
      transitionIn,
      transitionOut
    } = props.item.options;
    this.isHiding = false;
    this.shouldClose = false;
    this.intervalId = null;
    this.ignoreIsHiding = false;

    this.transitionIn = transitionIn || this.props.transitionIn;
    this.transitionOut = transitionOut || this.props.transitionOut;

    this.id = props.item.a11yId || Math.floor(Math.random() * 9999);

    this.state = {
      progressBar: null
    }
  }

  componentDidMount() {
    const {item} = this.props;
    if (this.props.inMemory[item.id]) {
      return;
    }
    const timeOut = this._getItemTimeOut();
    if (timeOut) {
      this._setIntervalId(setTimeout(this._removeToastr, timeOut));
    }

    if (timeOut && item.options.progressBar) {
      this.setState({progressbar: {duration: this._getItemTimeOut()}});
    }

    this._setTransition();
    onCSSTransitionEnd(this.toastrBoxElement, this._onAnimationComplete);
    this.props.addToMemory(item.id);
    if (this.closeButton !== undefined && !item.options.disableCloseButtonFocus) {
      this.closeButton.focus();
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }

    setTimeout(() => {
      if (document.getElementsByClassName('toastr-control').length > 0) {
        document.getElementsByClassName('toastr-control')[0].focus();
      }
    }, 50);
  }

  toastr = () => {
    if (this.props.item.type === 'message') {
      return this.renderMessage();
    }
    return this.renderToastr();
  };

  renderMessage = () => {
    const {
      title,
      message,
      options
    } = this.props.item;

    return (
      <div className="toastr-box">
        <div className="rrt-title">
          {title}
          {this.renderCloseButton()}
        </div>
        <div className="rrt-text">
          {message}
          {options.component && this.renderSubComponent()}
        </div>
      </div>
    )
  };

  renderToastr = () => {
    const {
      type,
      options,
      message,
      title
    } = this.props.item;

    const ariaAttributes = {};

    if (title) {
      ariaAttributes['aria-labelledby'] = `dialogTitle-${this.id}`;
    }

    if (message) {
      ariaAttributes['aria-describedby'] = `dialogDesc-${this.id}`
    }

    return (
      <div className={cn('toastr-box', type && 'box-' + type)}>
        {options.status && type === 'light' && <div className={cn('toastr-status', options.status)}/>}
        <div className="rrt-body" role="alertdialog" {...ariaAttributes}>
          {message && <div id={`dialogDesc-${this.id}`} className="rrt-text">{message}</div>}
          {options.component && this.renderSubComponent()}
        </div>
        <div className="rrt-right-container">
          {options.showCloseButton && this.renderCloseButton()}
        </div>
        {this.state.progressBar ? <ProgressBar {...this.state.progressBar} /> : null}
      </div>
    )
  };

  renderIcon = () => {
    const {
      type,
      options
    } = this.props.item;

    if (isValidElement(options.icon)) {
      return React.cloneElement(options.icon);
    }
    const iconName = (type === 'light') ? options.icon : type;
    return <Icon name={iconName}/>;
  };

  renderCloseButton = () => {
    let closeButtonAttributes = {
      tabIndex: 0,
      role: 'button',
      onKeyPress: this.handlePressEnterOrSpaceKeyCloseButton
    };
    if (this.isToastrClickable) {
      closeButtonAttributes = {};
    }
    return (
      <div
        className="close-toastr toastr-control"
        aria-label="toastr"
        onClick={this.handleClickCloseButton}
        ref={ref => this.closeButton = ref}
        {...closeButtonAttributes}
      >
        <span>&#x2715;</span>
      </div>
    )

  };

  get isToastrClickable() {
    const {onToastrClick, closeOnToastrClick} = this.props.item.options;
    const hasOnToastrClick = !!onToastrClick;
    return hasOnToastrClick || closeOnToastrClick;
  }

  handlePressEnterOrSpaceKeyCloseButton = e => {
    if (e.key === ' ' || e.key === 'Enter') {
      this.handleClickCloseButton(e);
    }
  };

  handleClickCloseButton = e => {
    let {onCloseButtonClick} = this.props.item.options;

    e.stopPropagation();
    this.ignoreIsHiding = true;
    if (onCloseButtonClick) {
      onCloseButtonClick();
    }

    this._setShouldClose(true);
    this._removeToastr();
  };

  // box will not be vanished
  // timeout will be removed (mouse is on the notification so it can not be close like user is reading it).
  mouseEnter = () => {
    clearTimeout(this.intervalId);
    this._setIntervalId(null);
    this._setIsHiding(false);
    const {progressBar} = this.props.item.options;

    const timeOut = this._getItemTimeOut();
    if (timeOut && progressBar) {
      this.setState({progressBar: null});
    }
  };

  // mouse leave
  // set timeout for making toastr leave the screen
  mouseLeave = () => {
    const {removeOnHover, removeOnHoverTimeout} = this.props.item.options;
    if (!this.isHiding && (removeOnHover || this.shouldClose)) {
      const interval = removeOnHover === true ? (removeOnHoverTimeout || 1000) : removeOnHover;
      this._setIntervalId(setTimeout(this._removeToastr, interval));
    }
  };

  renderSubComponent = () => {
    const {
      id,
      options
    } = this.props.item;

    const removeCurrentToastrFunc = () => this.props.remove(id);

    if (isValidElement(options.component)) {
      return React.cloneElement(options.component, {
        remove: removeCurrentToastrFunc
      })
    }
    const Tag = options.component;
    return (
      <Tag remove={removeCurrentToastrFunc}/>
    )
  };
  handleClickToastr = () => {
    let {onToastrClick, closeOnToastrClick} = this.props.items.options;
    this.ignoreIsHiding = true;
    if (onToastrClick) {
      onToastrClick();
    }
    if (closeOnToastrClick) {
      this._setShouldClose(true);
    }
  };

  handlePressEnterOrSpaceKeyToastr = e => {
    if (e.key === ' ' || e.key === 'Enter') {
      this.handleClickToastr(e);
    }
  };

  _onAnimationComplete = () => {
    const {remove, item} = this.props;
    const {options, id} = item;
    if (this.isHiding || this.ignoreIsHiding) {
      this._setIsHiding(false);
      this.ignoreIsHiding = false;
      remove(id);
      if (options.onHideComplete) {
        options.onHideComplete();
      }
    } else if (!this.isHiding && options.onShowComplete) {
      options.onShowComplete();
    }
  };
  _getItemTimeOut = () => {
    const {item} = this.props;
    let {timeOut} = item.options;
    if (typeof timeOut === 'undefined') {
      timeOut = this.props.timeOut;
    }

    return timeOut;
  };

  _setTransition(hide, autoRemove = true) {
    const animationType = hide ? this.transitionOut : this.transitionIn;
    const onEndListener = e => {
      if (e && e.target === this.toastrBoxElement) {
        this.toastrBoxElement.classList.remove(animationType);
      }
    };

    if (this.toastrBoxElement) {
      if (autoRemove) {
        onCSSTransitionEnd(this.toastrBoxElement, onEndListener)
      }
      this.toastrBoxElement.classList.add(animationType);
    }
  }

  _setIntervalId = intervalId => {
    this.intervalId = intervalId;
  };
  _setShouldClose = val => {
    this.shouldClose = val;
  };
  _setIsHiding = val => {
    this.isHiding = val;
  };

  _removeToastr = () => {
    if (!this.isHiding) {
      this._setIsHiding(true);
      this._setTransition(true, false);
      onCSSTransitionEnd(this.toastrBoxElement, this._onAnimationComplete);
    }
  };

  render() {
    const {options} = this.props.item;
    let toastrClickAtributes = {};
    if (this.isToastrClickable) {
      toastrClickAtributes.role = 'button';
      toastrClickAtributes.tabIndex = 0;
      toastrClickAtributes.onClick = this.handleClickToastr;
      toastrClickAtributes.onKeyPress = this.handlePressEnterOrSpaceKeyToastr;
    }

    return (
      <div
        ref={ref => this.toastrBoxElement = ref}
        className={cn(
          'toastr',
          'animated',
          options.className
        )}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        {...toastrClickAtributes}
      >
        {this.toastr()}
      </div>
    )
  }
}

export {
  ToastrBox
}
