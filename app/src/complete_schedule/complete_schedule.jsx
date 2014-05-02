/** @jsx React.DOM */

define([
  'react',
  'underscore'
],
function (React, _) {

  var CompleteSchedule = React.createClass({
    getInitialState: function () {
      return {
        period: 'weekday'
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
    var that = this;

    return (
      <ol className="period-selector">
          {
            _(periods).map(function (period) {
              var className = period === that.state.period && 'selected';
              return <li className={className}>
                <button onClick={handlePeriodSelection.bind(that, period)}>{period}</button>
              </li>;
            })
          }
      </ol>
    );
  }


  function renderHours (schedule) {
    return (
      <div className="hours-by-direction">
        <h2>{schedule.origin} > {schedule.destination}</h2>
        <ol>
          {
            _(schedule.hours).map(function (hour) {
              return <li>{hour}</li>;
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


  return CompleteSchedule;

});
