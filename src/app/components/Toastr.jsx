import React from 'react';
import {Col, UncontrolledAlert} from 'reactstrap';

export class ToastrNotification extends React.Component {
    notificationRef = React.createRef();

    state = {
        notifyTL: [],
        notifyTC: [],
        notifyTR: [],
        notifyBL: [],
        notifyBC: [],
        notifyBR: [],
        notifyID: []
    };

    componentWillUnmount() {
        this.state.notifyID.forEach(id => {
            window.clearTimeout(id);
        })
    }

    onDismiss = (nNumber, place, noAnimate) => {
        const notify = [];
        // notification queue gotten from state;
        let sNotify = this.state["notify" + place.toUpperCase()];
        let dNotify;
        for (let i = 0; i < sNotify.length; i++) {
            if (sNotify[i].key !== nNumber + "") {
                if (sNotify[i].props.className.indexOf("fadeOutUp") !== -1) {
                    dNotify = React.cloneElement(sNotify[i]);
                } else {
                    if (noAnimate === undefined) {
                        let animation;
                        if (place.indexOf("b") !== -1) {
                            animation = sNotify[i].key > nNumber + '' ? ' animated moveDown' : '';
                        } else {
                            animation = sNotify[i].key > nNumber + '' ? ' animated moveUp' : '';
                        }
                        dNotify = React.cloneElement(sNotify[i], {
                            className: 'alert-with-icon' + animation
                        });
                    } else {
                        dNotify = React.cloneElement(sNotify[i], {
                            className: 'alert-with-icon'
                        });
                    }
                }
                notify.push(dNotify);
            } else {
                if (noAnimate === undefined) {
                    dNotify = React.cloneElement(sNotify[i], {
                        className: 'alert-with-icon animated fadeOutUp'
                    });
                    notify.push(dNotify);
                }
            }
        }
        if (noAnimate === undefined) {
            let id = setTimeout(() => {
                this.onDismiss(nNumber, place, "noAnimate");
            }, 800);
            this.setState({
                notifyID: [id].concat(this.state.notifyID)
            });
        }
        sNotify = {};
        sNotify["notify" + place.toUpperCase()] = notify;
        this.setState(sNotify);
    };

    notificationAlerts = ({place, closeButton, type, icon, message, autoDismiss}) => {
        let notify = this.state["notify" + place.toUpperCase()];
        let nNumber = notify.length;
        if (notify.length > 0) {
            if (place.indexOf("b") !== -1) {
                nNumber = parseInt(notify[0].key, 10) + 1;
            } else {
                nNumber = parseInt(notify[notify.length - 1].key, 10) + 1;
            }
        }
        let toggle;
        if (closeButton !== false) {
            toggle = () => this.onDismiss(nNumber, place);
        }
        const notification = (
            <UncontrolledAlert
                color={type}
                className="alert-with-icon animated fadeInDown"
                toggle={toggle}
                key={nNumber}
            >{icon ? (
                <span
                    data-notify="icon"
                    className={icon}
                />
            ) : null}
                <span data-notify="message">
                {message}
            </span>
            </UncontrolledAlert>
        );
        if (place.indexOf("b") !== -1) {
            notify.unshift(notification);
        } else {
            notify.push(notification)
        }
        let sNotify = {};
        sNotify['notify' + place.toUpperCase()] = notify;

        if (autoDismiss > 0) {
            let id = setTimeout(() => {
                this.onDismiss(nNumber, place);
            }, autoDismiss * 1000 + (notify.length - 1) * 1000);
            this.setState({
                notifyID: [id].concat(this.state.notifyID)
            });
        }
        this.setState(sNotify);
    };

    showAllNotifications = place => {
        if (this.state["notify" + place.toUpperCase()].length > 0) {
            const style = {
                display: 'inline-block',
                margin: '0px auto',
                position: 'fixed',
                transition: 'all 0.5s ease-in-out',
                zIndex: '1031'
            };
            if (place.indexOf("t") !== -1) {
                style['top'] = '20px';
                switch (place) {
                    case 'tl':
                        style['left'] = '20px';
                        break;
                    case 'tc':
                        style['left'] = '0px';
                        style['right'] = '0px';
                        break;
                    case 'tr':
                        style['right'] = '20px';
                        break;
                    default:
                        break;
                }
            } else {
                style['bottom'] = '20px';
                switch (place) {
                    case 'bl':
                        style['left'] = '20px';
                        break;
                    case 'bc':
                        style['left'] = '0px';
                        style['right'] = '0px';
                        break;
                    case 'br':
                        style['right'] = '20px';
                        break;
                    default:
                        break;
                }
            }
            return (
                <Col
                    xs={11}
                    sm={4}
                    xl={3}
                    style={style}
                >{this.state[`notify${place.toUpperCase()}`].map(item => item)}</Col>
            )
        }
    };

    render() {
        return (
            <div ref={this.notificationRef}>
                {this.showAllNotifications("tl")}
                {this.showAllNotifications("tc")}
                {this.showAllNotifications("tr")}
                {this.showAllNotifications("bl")}
                {this.showAllNotifications("bc")}
                {this.showAllNotifications("br")}
            </div>
        )
    }
}