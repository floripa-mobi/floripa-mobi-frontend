/** @jsx React.DOM */

define([
  'react',
  'underscore',
  'jsx!src/bus_summary/bus_summary'
],
function (React, _, BusSummary) {

  /**
    A list of bus summaries.

    @param buses an array of buses
    @param selectedBus which bus is selected
    @param onSelect triggers once a new bus is selected
   */
  var BusesList = React.createClass({
    render: function () {
      var that = this,
          buses = this.props.buses,
          className = 'buses-list ' + that.props.className;

      return (
        <ol className={className}>
          {_(buses).map(function (bus) {
            return <li key={bus.number}>
              <BusSummary bus={bus} showSchedule={isScheduleVisible.call(that, bus)} onClick={handleBusClick.bind(that, bus)}></BusSummary>
            </li>;
          })}
        </ol>
      );
    }
  });


  function isScheduleVisible (bus) {
    return this.props.selectedBus && bus.number === this.props.selectedBus.number;
  }


  function handleBusClick (bus) {
    if (this.props.onSelect) { this.props.onSelect(bus); }
  }


  return BusesList;

});
