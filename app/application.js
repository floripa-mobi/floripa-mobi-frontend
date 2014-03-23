define([
  'react',
  'app/services/buses_list_service',
  'app/services/bus_detail_service',
  'jsx!app/buses_list'
],
function (React, BusesListService, BusDetailService, BusesList, BusDetail) {

  var Application = React.createClass({
    getInitialState: function () {
      return {
        buses: [],
        selectedBus: null
      };
    },

    componentWillMount: function () {
      var that = this;

      BusesListService.fetch(function (buses) {
        that.setState({ buses: buses });
      });
    },

    render: function () {
      return (
        <div className='application'>
          <BusesList buses={this.state.buses} selectedBus={this.state.selectedBus} onSelect={handleBusSelection.bind(this)}></BusesList>
        </div>
      )
    }
  });


  function handleBusSelection (bus) {
    var that = this;

    that.setState({
      selectedBus: bus
    });

    BusDetailService.fetch(bus.number, function (data) {
      _(bus).extend(data);
      that.forceUpdate();
    });
  }


  return Application;

});
