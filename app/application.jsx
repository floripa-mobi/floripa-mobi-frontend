/** @jsx React.DOM */

define([
  'when',
  'react',
  'underscore',
  'app/services/buses_list_service',
  'app/services/bus_detail_service',
  'app/services/user_service',
  'jsx!app/buses_list',
  'jsx!app/home/home',
  'jsx!app/navigation'
],
function (when, React, _, BusesListService, BusDetailService, UserService, BusesList, Home, Navigation) {

  var Application = React.createClass({
    getInitialState: function () {
      return {
        buses: [],
        favoriteBuses: [],
        showSelectionList: false
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
          return fetchBusesList.call(this);
        }
      });
    },

    render: function () {
      var showHome = this.state.favoriteBuses.length > 0 && !this.state.showSelectionList,
          home = <Home buses={this.state.favoriteBuses} onDelete={handleBusDeletion.bind(this)}/>,
          selectionList = <BusesList buses={this.state.buses} selectedBus={this.state.selectedBus} onSelect={handleBusSelection.bind(this)}></BusesList>;

      return (
        <div className='application'>
          <Navigation onClickAdd={openBusSelectionList.bind(this)}/>
          {showHome ? home : selectionList}
        </div>
      );
    }
  });


  function openBusSelectionList () {
    this.setState({ showSelectionList: true });
    if (this.state.buses.length === 0) { fetchBusesList.call(this); }
  }


  function handleBusDeletion (bus) {
    var that = this,
        favoriteBuses = that.state.favoriteBuses;

    favoriteBuses = _(favoriteBuses).without(bus);
    that.setState({
      favoriteBuses: favoriteBuses
    });

    saveUserState.call(this);
  }


  function handleBusSelection (bus) {
    var that = this,
        favoriteBuses = that.state.favoriteBuses;

    favoriteBuses.push(bus);
    that.setState({
      favoriteBuses: favoriteBuses,
      showSelectionList: false
    });

    BusDetailService.fetch(bus.number).then(function (data) {
      _(bus).extend(data);
      that.forceUpdate();
    });

    saveUserState.call(this);
  }


  function fetchBusesList () {
    var that = this;

    return BusesListService.fetch().then(function (buses) {
      that.setState({ buses: buses });
    });
  }


  function saveUserState () {
    this.state.user.favoriteBuses = _(this.state.favoriteBuses).map(function (bus) {
      return bus.number;
    });

    UserService.save(this.state.user);
  }


  return Application;

});
