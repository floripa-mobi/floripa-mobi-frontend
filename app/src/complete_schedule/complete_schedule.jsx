/** @jsx React.DOM */

define([
  'react',
  'underscore'
],
function (React, _) {

  var CompleteSchedule = React.createClass({
    getInitialState: function () {
      return {
        period: getCurrentPeriod()
      };
    },

    render: function () {
      var line = this.props.line,
          schedules = line.schedules,
          schedulesByPeriod = filterSchedulesByPeriod.call(this, schedules),
          periods = _(schedulesByPeriod).keys();

      return (
        <div className="complete-schedule">
          <h1 className="line-name">{line.name} - {line.number}</h1>
          {renderPeriodSelector.call(this, periods)}
          <div className="hours">
            {_(schedulesByPeriod[this.state.period]).map(renderHours.bind(this))}
          </div>
        </div>
      );
    }
  });


  function renderPeriodSelector (periods) {
    var that = this,
        allPeriods = ['weekday', 'saturday', 'sunday'];

    return (
      <ol className="period-selector">
          {
            _(allPeriods).map(function (period) {
              var className = (period === that.state.period && 'selected');
              return <li>
                <button className={className} onClick={handlePeriodSelection.bind(that, period)}>{translatePeriod(period)}</button>
              </li>;
            })
          }
      </ol>
    );
  }


  function renderHours (schedule) {
    var now = new Date().getHours() * 60 + new Date().getMinutes(),
        closestHour = null;

    return (
      <div className="hours-by-direction">
        <h2 className="direction">{schedule.origin} > {schedule.destination}</h2>
        <ol>
          {
            _(schedule.hours).map(function (hour) {
              var minutes = minuteFromHours(hour);
              if (minutes > now && !closestHour) { closestHour = minutes; }
              return <li className={closestHour === minutes && 'next'}>{hour}</li>;
            })
          }
        </ol>
      </div>
    );
  }


  function handlePeriodSelection (period) {
    this.setState({ period: period });
  }


  function filterSchedulesByPeriod (schedules) {
    return _(schedules).groupBy('period');
  }


  function translatePeriod (period) {
    var strings = {
      weekday: 'Semana',
      saturday: 'Sábado',
      sunday: 'Domingo'
    };

    return strings[period.toLowerCase()];
  }


  function getCurrentPeriod () {
    var dayOfTheWeek = new Date().getDay();

    if (dayOfTheWeek === 0) { return 'sunday'; }
    if (dayOfTheWeek === 6) { return 'saturday'; }
    return 'weekday';
  }


  function minuteFromHours (hour) {
    var split = hour.split(':');
    return split[0] * 60 + parseInt(split[1], 10);
  }


  return CompleteSchedule;

});
