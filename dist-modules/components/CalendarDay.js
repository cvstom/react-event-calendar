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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarDay = function (_React$Component) {
    _inherits(CalendarDay, _React$Component);

    function CalendarDay() {
        _classCallCheck(this, CalendarDay);

        return _possibleConstructorReturn(this, (CalendarDay.__proto__ || Object.getPrototypeOf(CalendarDay)).apply(this, arguments));
    }

    _createClass(CalendarDay, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                day = _props.day,
                isToday = _props.isToday,
                events = _props.events,
                onClick = _props.onClick;

            var dayClasses = (0, _classnames2.default)({
                'flexColumn': true,
                'day': true,
                'inactive': day.siblingMonth,
                'today': isToday
            });

            return _react2.default.createElement(
                'div',
                {
                    onClick: onClick.bind(null, this, day),
                    className: dayClasses },
                _react2.default.createElement(
                    'div',
                    { className: 'inner-grid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'date' },
                        day.day
                    ),
                    events
                )
            );
        }
    }]);

    return CalendarDay;
}(_react2.default.Component);

exports.default = CalendarDay;


CalendarDay.defaultProps = {
    onClick: function onClick() {}
};