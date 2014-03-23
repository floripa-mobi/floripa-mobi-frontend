define([
  'react',
  'app/services/buses_list_service',
  'app/services/bus_detail_service',
  'jsx!app/buses_list',
  'jsx!app/bus_detail'
],
function (React, BusesListService, BusDetailService, BusesList, BusDetail) {

  var Application = React.createClass({
    getInitialState: function () {
      return {
        buses: [],
        showing: 'list',
        selectedBus: {}
      };
    },

    componentWillMount: function () {
      var that = this;

      BusesListService.fetch(function (buses) {
        that.setState({ buses: buses });
      });
    },

    selectBus: function (bus) {
      var that = this;

      console.log(bus);

      that.setState({
        showing: 'detail',
        selectedBus: bus
      });

      BusDetailService.fetch(bus.number, function (bus) {
        that.setState({ selectedBus: bus });
      })
    },

    closeSelection: function () {
      var that = this;
      that.setState({ showing: 'list' });
    },

    render: function () {
      var listClassName = this.state.showing === 'list' ?  '' : 'left',
          detailClassName = this.state.showing === 'detail' ? '' : 'right';

      return (
        <div className='application'>
          <BusesList className={listClassName} buses={this.state.buses} onSelect={this.selectBus}></BusesList>
          <BusDetail className={detailClassName} bus={this.state.selectedBus} onClose={this.closeSelection}></BusDetail>
        </div>
      )
    }
  });

  return Application;

});
