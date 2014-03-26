/** @jsx React.DOM */

define([
  'react',
  'jsx!app/bus_summary/_impending_hours'
],
function (React, ImpendingHours) {
  /**
    Renders a bus sumary with or without its impending hours.

    @param bus information about the bus (name, number, schedule)
    @param showSchedule {Boolean} indicater whether should show the schedule.
   */
  var BusSummary = React.createClass({
    handleClick: function () {
      this.props.onClick.apply(this, arguments);
    },

    render: function () {
      var bus = this.props.bus,
          showSchedule = this.props.showSchedule;

      return (
        <article className='bus-summary' onClick={this.handleClick}>
          <h1>{bus.name} <span className='number'>{bus.number}</span></h1>
          { showSchedule && <ImpendingHours schedules={bus.schedules}></ImpendingHours> }
        </article>
      );
    }
  });


  return BusSummary;
});
