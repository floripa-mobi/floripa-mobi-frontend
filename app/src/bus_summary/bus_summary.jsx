/** @jsx React.DOM */

define([
  'react',
  'hammer',
  'jsx!src/bus_summary/_impending_hours'
],
function (React, Hammer, ImpendingHours) {
  /**
    Renders a bus sumary with or without its impending hours.

    @param bus information about the bus (name, number, schedule)
    @param showSchedule {Boolean} indicater whether should show the schedule.
   */
  var BusSummary = React.createClass({
    getDefaultProps: function () {
      return {
        onClick: function () {},
        onDelete: function () {}
      };
    },

    componentDidMount: function () {
      var node = this.getDOMNode();

      Hammer(node).on("swipeleft", this.props.onDelete);
    },

    componentWillUnmount: function () {
      var node = this.getDOMNode();

      Hammer(node).off("swipeleft");
    },

    render: function () {
      var bus = this.props.bus,
          showSchedule = this.props.showSchedule;

      return (
        <article className='bus-summary' onClick={this.props.onClick}>
          <h1 className='bus-name'>{bus.name} <span className='number'>{bus.number}</span></h1>
          { showSchedule && <h2 className="company-name">{bus.company || 'Public'}</h2> }
          { showSchedule && <ImpendingHours schedules={bus.schedules}></ImpendingHours> }
        </article>
      );
    }
  });


  return BusSummary;
});
