'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calendarBase = require('calendar-base');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CalendarDay = require('./components/CalendarDay');

var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

var _CalendarEvent = require('./components/CalendarEvent');

var _CalendarEvent2 = _interopRequireDefault(_CalendarEvent);

var _CalendarTitle = require('./components/CalendarTitle');

var _CalendarTitle2 = _interopRequireDefault(_CalendarTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventCalendar = function (_React$Component) {
    _inherits(EventCalendar, _React$Component);

    function EventCalendar(props) {
        _classCallCheck(this, EventCalendar);

        var _this = _possibleConstructorReturn(this, (EventCalendar.__proto__ || Object.getPrototypeOf(EventCalendar)).call(this, props));

        _this._eventTargets = {};

        _this.state = {
            today: _this.getToday()
        };

        _this.calendar = new _calendarBase.Calendar({ siblingMonths: true });

        // Bind methods
        _this.getCalendarDays = _this.getCalendarDays.bind(_this);
        _this.getDaysWithEvents = _this.getDaysWithEvents.bind(_this);
        _this.getEventMeta = _this.getEventMeta.bind(_this);
        _this.getToday = _this.getToday.bind(_this);

        return _this;
    }

    _createClass(EventCalendar, [{
        key: 'getToday',
        value: function getToday() {
            var today = new Date();
            return {
                day: today.getDate(),
                month: today.getMonth(),
                year: today.getFullYear()
            };
        }
    }, {
        key: 'getCalendarDays',
        value: function getCalendarDays() {
            var _this2 = this;

            return this.calendar.getCalendar(this.props.year, this.props.month).map(function (day) {
                day.eventSlots = Array(_this2.props.maxEventSlots).fill(false);
                return day;
            });
        }
    }, {
        key: 'getEventMeta',
        value: function getEventMeta(days, eventStart, eventEnd) {
            var eventStartInView = this.calendar.isDateSelected(eventStart);
            var eventEndInView = this.calendar.isDateSelected(eventEnd);
            var firstDayOfMonth = days[0];
            var lastDayOfMonth = days[days.length - 1];

            var eventMeta = {
                // Asserts Event is visible in this month view
                isVisibleInView: false,
                visibleEventLength: days.length,
                // Returns the index (interval from first visible day) of [...days] of event's first "visible" day
                firstVisibleDayIndex: eventStartInView ? _calendarBase.Calendar.interval(firstDayOfMonth, eventStart) - 1 : 0
            };

            // Asserts Event is visible in this month view
            if (eventStartInView || eventEndInView) {
                // Asserts event's first or last day is visible in this month view
                eventMeta.isVisibleInView = true;
            } else if (eventStart.month < this.props.month && eventEnd.month > this.props.month) {
                // Asserts at least part of month is
                eventMeta.isVisibleInView = true;
            }

            // Determine the visible length of the event during the month
            if (eventStartInView && eventEndInView) {
                eventMeta.visibleEventLength = _calendarBase.Calendar.interval(eventStart, eventEnd);
            } else if (!eventStartInView && eventEndInView) {
                eventMeta.visibleEventLength = _calendarBase.Calendar.interval(firstDayOfMonth, eventEnd);
            } else if (eventStartInView && !eventEndInView) {
                eventMeta.visibleEventLength = _calendarBase.Calendar.interval(eventStart, lastDayOfMonth);
            }

            return eventMeta;
        }
    }, {
        key: 'getDaysWithEvents',
        value: function getDaysWithEvents() {
            var _this3 = this;

            // Get all the days in this months calendar view
            // Sibling Months included
            var days = this.getCalendarDays();

            // Set Range Limits on calendar
            this.calendar.setStartDate(days[0]);
            this.calendar.setEndDate(days[days.length - 1]);

            // Iterate over each of the supplied events
            this.props.events.forEach(function (eventItem) {

                var eventStart = _this3.getCalendarDayObject(eventItem.start);
                var eventEnd = _this3.getCalendarDayObject(eventItem.end);
                var eventMeta = _this3.getEventMeta(days, eventStart, eventEnd);

                if (eventMeta.isVisibleInView) {
                    var eventLength = eventMeta.visibleEventLength;
                    var eventSlotIndex = days[eventMeta.firstVisibleDayIndex].eventSlots.indexOf(false);
                    var dayIndex = 0;

                    // For each day in the event
                    while (dayIndex < eventLength) {
                        // Clone the event object so we acn add day specfic data
                        var eventData = Object.assign({}, eventItem);

                        if (dayIndex === 0) {
                            // Flag first day of event
                            eventData.isFirstDay = true;
                        }

                        if (dayIndex === eventLength - 1) {
                            // Flag last day of event
                            eventData.isLastDay = true;
                        }

                        if (!eventData.isFirstDay || !eventData.isLastDay) {
                            // Flag between day of event
                            eventData.isBetweenDay = true;
                        }

                        // Apply Event Data to the correct slot for that day
                        days[eventMeta.firstVisibleDayIndex + dayIndex].eventSlots[eventSlotIndex] = eventData;

                        // Move to next day of event
                        dayIndex++;
                    }
                }
            });

            return days;
        }
    }, {
        key: 'getCalendarDayObject',
        value: function getCalendarDayObject(date) {
            var dateArray = date.split('-');
            return {
                year: dateArray[0],
                // Subtract 1 from month to allow for human declared months
                month: dateArray[1] - 1,
                day: dateArray[2]
            };
        }
    }, {
        key: 'getLastIndexOfEvent',
        value: function getLastIndexOfEvent(slots) {

            var lastIndexOfEvent = slots.map(function (slot, index) {
                return slot !== false ? index : false;
            }).filter(function (element) {
                return element;
            }).pop();

            return lastIndexOfEvent < 3 || lastIndexOfEvent === undefined ? 2 : lastIndexOfEvent;
        }
    }, {
        key: 'getSerializedDay',
        value: function getSerializedDay(day) {
            return [day.weekDay, day.day, day.month, day.year].join('');
        }
    }, {
        key: 'renderDaysOfTheWeek',
        value: function renderDaysOfTheWeek() {
            return this.props.daysOfTheWeek.map(function (title, index) {
                return _react2.default.createElement(_CalendarTitle2.default, {
                    key: 'title_' + index,
                    title: title
                });
            });
        }
    }, {
        key: 'renderEvents',
        value: function renderEvents(day) {
            var _this4 = this;

            // Trim excess slots
            var eventSlots = day.eventSlots.slice(0, this.getLastIndexOfEvent(day.eventSlots) + 1);

            return eventSlots.map(function (eventData, index) {
                return _react2.default.createElement(_CalendarEvent2.default, {
                    key: 'event_' + index + _this4.getSerializedDay(day),
                    day: day,
                    eventData: eventData,
                    onClick: _this4.props.onEventClick,
                    onMouseOut: _this4.props.onEventMouseOut,
                    onMouseOver: _this4.props.onEventMouseOver,
                    wrapTitle: _this4.props.wrapTitle
                });
            });
        }
    }, {
        key: 'renderCalendarDays',
        value: function renderCalendarDays() {
            var _this5 = this;

            return this.getDaysWithEvents().map(function (day, index) {
                var isToday = _calendarBase.Calendar.interval(day, _this5.state.today) === 1;
                var events = _this5.renderEvents(day);

                return _react2.default.createElement(_CalendarDay2.default, {
                    key: 'day_' + _this5.getSerializedDay(day),
                    day: day,
                    events: events,
                    isToday: isToday,
                    onClick: _this5.props.onDayClick
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'flexContainer' },
                this.renderDaysOfTheWeek(),
                this.renderCalendarDays()
            );
        }
    }]);

    return EventCalendar;
}(_react2.default.Component);

EventCalendar.defaultProps = {
    daysOfTheWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    events: [],
    wrapTitle: true,
    maxEventSlots: 10
};

exports.default = EventCalendar;