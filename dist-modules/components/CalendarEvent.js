'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarEvent = function (_React$Component) {
    _inherits(CalendarEvent, _React$Component);

    function CalendarEvent(props) {
        _classCallCheck(this, CalendarEvent);

        var _this = _possibleConstructorReturn(this, (CalendarEvent.__proto__ || Object.getPrototypeOf(CalendarEvent)).call(this, props));

        _this.sharedArguments = [null, _this, _this.props.eventData, _this.props.day];
        // Bind methods
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(CalendarEvent, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.sharedArguments = [null, this, nextProps.eventData, nextProps.day];
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var _props;

            (_props = this.props).onClick.apply(_props, _toConsumableArray(this.sharedArguments.slice(1)));
            e.stopPropagation();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$onMouseOut, _props$onMouseOver;

            // Return a placeholder element if there is no event data 
            if (!this.props.eventData) {
                return _react2.default.createElement('div', { className: 'event-slot' });
            }

            var showLabel = this.props.eventData.isFirstDay || this.props.day.weekDay === 0 && this.props.wrapTitle;
            var title = showLabel ? this.props.eventData.title : '';

            var eventClasses = (0, _classnames2.default)({
                'event-slot': true,
                'event': true,
                'event-first-day': this.props.eventData.isFirstDay,
                'event-last-day': this.props.eventData.isLastDay,
                'event-has-label': showLabel
            }, this.props.eventData.eventClasses);

            return _react2.default.createElement(
                'div',
                { className: eventClasses,
                    onClick: this.handleClick,
                    onMouseOut: (_props$onMouseOut = this.props.onMouseOut).bind.apply(_props$onMouseOut, _toConsumableArray(this.sharedArguments)),
                    onMouseOver: (_props$onMouseOver = this.props.onMouseOver).bind.apply(_props$onMouseOver, _toConsumableArray(this.sharedArguments))
                },
                _react2.default.createElement(
                    'div',
                    { className: 'event-title' },
                    title
                )
            );
        }
    }]);

    return CalendarEvent;
}(_react2.default.Component);

CalendarEvent.defaultProps = {
    onClick: function onClick() {},
    onMouseOut: function onMouseOut() {},
    onMouseOver: function onMouseOver() {}
};

exports.default = CalendarEvent;