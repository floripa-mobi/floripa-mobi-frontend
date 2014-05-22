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
    getInitialState: function () {
      return {
        searchTerm: ''
      };
    },

    render: function () {
      var that = this,
          buses = this.props.buses;

      return (
        <div className='buses-list'>
          <input type='text' placeholder="Digite para buscar..." onChange={handleSearch.bind(this)}/>
          <ol>
            {_(buses).chain().filter(performSearch.bind(this)).map(function (bus) {
              return <li key={bus.number}>
                <BusSummary bus={bus} showSchedule={isScheduleVisible.call(that, bus)} onClick={handleBusClick.bind(that, bus)}></BusSummary>
              </li>;
            }).value()}
          </ol>
        </div>
      );
    }
  });


  function performSearch (bus) {
    return bus.name && bus.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1;
  }


  function handleSearch (event) {
    this.setState({ searchTerm: event.target.value });
  }


  function isScheduleVisible (bus) {
    return this.props.selectedBus && bus.number === this.props.selectedBus.number;
  }


  function handleBusClick (bus) {
    if (this.props.onSelect) { this.props.onSelect(bus); }
  }


  return BusesList;

});
