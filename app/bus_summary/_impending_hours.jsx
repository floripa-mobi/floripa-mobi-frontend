/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'app/bus_summary/_proximity'
],
function (_, React, proximity) {
  /**
    Given a list of schedules, renders the impending hours at the current day and time.

    @param schedules array of shedules with origin and hours.
   */
  var ImpendingHours = React.createClass({
    render: function () {
      var schedules = findCurrentSchedules(this.props.schedules),
          className = 'impending-hours';

      return (
        <section className={className}>
          {
            _(schedules).map(function (schedule) {
              return <Schedule key={schedule.origin} schedule={schedule}></Schedule>;
            })
          }
        </section>
      );
    }
  });


  /**
    Renders a single schedule impending hours.

    @param schedule.origin
    @param schedule.hours
   */
  var Schedule = React.createClass({
    render: function () {
      var schedule = this.props.schedule;

      var minutes = _(schedule.hours).map(function (hour) {
        var split = hour.split(':');
        return split[0] * 60 + parseInt(split[1], 10);
      });

      var current = new Date().getHours() * 60 + new Date().getMinutes();

      var proximityMinutes = _(proximity(minutes, current));

      return (
        <div className='schedule'>
          <h2 className='direction'>{schedule.origin}</h2>
          <ol className='hours'>
            {
              _(proximityMinutes).map(function (hour) {
                return <li key={hour} className={hourClass(hour, current)}>{formatHour(hour)}</li>;
              })
            }
          </ol>
        </div>
      );
    }
  });


  function formatHour (minutes) {
    var minutesInTheHour = minutes % 60;

    return Math.floor(minutes / 60) + ':' + (minutesInTheHour < 10 ? '0' + minutesInTheHour : minutesInTheHour);
  }


  function hourClass (hour, current) {
    if (hour < current) { return 'missed'; }
    if (hour >= current) { return 'available'; }
  }


  function findCurrentSchedules (schedules) {
    var period = getCurrentPeriod();

    return _(schedules).filter(function (schedule) {
      return schedule.period === period;
    });
  }


  function getCurrentPeriod () {
    var dayOfTheWeek = new Date().getDay();

    if (dayOfTheWeek === 0) { return 'sunday'; }
    if (dayOfTheWeek === 6) { return 'saturday'; }
    return 'weekday';
  }


  return ImpendingHours;
});
