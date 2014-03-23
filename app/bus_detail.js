define([
  'react',
  'underscore'
],
function (React, _) {
  var Schedule = React.createClass({
    render: function () {
      var schedule = this.props.schedule,
          past = schedule.schedule[0],
          present = schedule.schedule[1],
          future = schedule.schedule[2];

      return (
        <div className='schedule'>
          <h2>{schedule.departure}</h2>
          <ol>
            <li className='hour past'>{past}</li>
            <li className='hour present'>{present}</li>
            <li className='hour future'>{future}</li>
          </ol>
        </div>
      )
    }
  });


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
