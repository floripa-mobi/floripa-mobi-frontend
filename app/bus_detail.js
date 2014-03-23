define([
  'react',
  'underscore',
  'app/helpers/proximity'
],
function (React, _, proximity) {
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
          <h2>{schedule.origin}</h2>
          <ol className='hours'>
            {
              _(proximityMinutes).map(function (hour) {
                return <li className={hourClass(hour, current)}>{formatHour(hour)}</li>
              })
            }
          </ol>
        </div>
      )
    }
  });


  function formatHour (minutes) {
    return Math.floor(minutes / 60) + ':' + minutes % 60;
  }


  function hourClass (hour, current) {
    if (hour < current) { return 'missed'; }
    if (hour >= current) { return 'available'; };
  }


  var BusDetail = React.createClass({
    close: function () {
      this.props.onClose();
    },

    render: function () {
      var bus = this.props.bus,
          schedules = getCurrentSchedules(bus.schedule),
          className = 'bus-detail ' + this.props.className;

      return (
        <div className={className} onClick={this.close}>
          <h1>{bus.name}</h1>
          {
            _(schedules).map(function (schedule) {
              return <Schedule schedule={schedule}></Schedule>
            })
          }
        </div>
      );
    }
  });


  function getCurrentSchedules (schedules) {
    var period = getCurrentPeriod();

    console.log(period)

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


  return BusDetail;
});
