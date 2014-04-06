/** @jsx React.DOM */

define([
  'when',
  'react',
  'underscore',
  'app/services/buses_list_service',
  'app/services/bus_detail_service',
  'app/services/user_service',
  'jsx!app/buses_list',
  'jsx!app/home/home'
],
function (when, React, _, BusesListService, BusDetailService, UserService, BusesList, Home) {

  var Application = React.createClass({
    getInitialState: function () {
      return {
        buses: [],
        favoriteBuses: []
      };
    },

    componentWillMount: function () {
      var that = this;

      UserService.fetch().then(function (user) {
        that.setState({ user: user });
        var promises = _(user.favoriteBuses).map(function (busNumber) {
          return BusDetailService.fetch(busNumber);
        });

        return when.all(promises);
      }).then(function (buses) {
        that.setState({ favoriteBuses: buses });

        if (buses.length === 0) {

          return BusesListService.fetch().then(function (buses) {
            that.setState({ buses: buses });
          });
        }
      });
    },

    render: function () {
      var showHome = this.state.favoriteBuses.length > 0,
          home = <Home buses={this.state.favoriteBuses}/>,
          selectionList = <BusesList buses={this.state.buses} selectedBus={this.state.selectedBus} onSelect={handleBusSelection.bind(this)}></BusesList>;

      return (
        <div className='application'>
          {showHome ? home : selectionList}
        </div>
      );
    }
  });


  function handleBusSelection (bus) {
    var that = this,
        favoriteBuses = that.state.favoriteBuses;

    favoriteBuses.push(bus);
    that.setState({ favoriteBuses: favoriteBuses });

    BusDetailService.fetch(bus.number).then(function (data) {
      _(bus).extend(data);
      that.forceUpdate();
    });
  }


  return Application;

});
