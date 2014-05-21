/** @jsx React.DOM */

define([
  'when',
  'react',
  'underscore',
  'src/services/buses_list_service',
  'src/services/bus_detail_service',
  'src/services/user_service',
  'jsx!src/buses_list',
  'jsx!src/home/home',
  'jsx!src/navigation',
  'jsx!src/welcome_screen',
  'jsx!src/complete_schedule/complete_schedule',
  'src/helpers/analytics'
],
function (when, React, _, BusesListService, BusDetailService, UserService, BusesList, Home, Navigation, WelcomeScreen, CompleteSchedule) {

  var Application = React.createClass({
    getInitialState: function () {
      return {
        buses: [],
        favoriteBuses: [],
        showSelectionList: false,
        loading: false,
        selectedBus: null
      };
    },

    componentWillMount: function () {
      var that = this;

      this.setState({ loading: true });

      UserService.fetch().then(function (user) {

        that.setState({ user: user });
        var promises = _(user.favoriteBuses).map(function (busNumber) {
          return BusDetailService.fetch(busNumber);
        });

        return when.all(promises);
      }).then(function (buses) {
        that.setState({ favoriteBuses: buses });

        if (buses.length === 0) {
          return fetchBusesList.call(that);
        }
      }).then(function () {
        that.setState({ loading: false });
      });

      // updates the schedule every minute
      setInterval(function () {
        that.forceUpdate();
      }, 60000);
    },

    render: function () {
      var state = this.state,
          showSelectionList = this.state.showSelectionList,
          home = <Home buses={this.state.favoriteBuses} onDelete={handleBusDeletion.bind(this)} onSelect={handleBusDetail.bind(this)}/>,
          selectionList = <BusesList buses={this.state.buses} onSelect={handleBusSelection.bind(this)}></BusesList>,
          loading = this.state.loading;

      return (
        <div className='application'>
          <Navigation loading={loading} onClickAdd={openBusSelectionList.bind(this)} onClickBack={handleHomeClick.bind(this)}/>
          {showSelectionList && selectionList}
          {!showSelectionList && state.favoriteBuses.length === 0 && <WelcomeScreen/>}
          {!showSelectionList && !this.state.selectedBus && home}
          {!showSelectionList && this.state.selectedBus && <CompleteSchedule line={this.state.selectedBus}/>}
        </div>
      );
    }
  });


  function handleBusDetail (bus) {
    this.setState({ selectedBus: bus });
  }


  function handleHomeClick () {
    this.setState({ showSelectionList: false, selectedBus: null });
  }


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

    if (!_(favoriteBuses).findWhere({ number: bus.number })) {
      favoriteBuses.push(bus);
    }

    that.setState({
      favoriteBuses: favoriteBuses,
      showSelectionList: false
    });

    this.setState({ loading: true });

    BusDetailService.fetch(bus.number).then(function (data) {
      _(bus).extend(data);
      that.forceUpdate();
    }).then(function () {
      that.setState({ loading: false });
    });

    saveUserState.call(this);
  }


  function fetchBusesList () {
    var that = this;

    this.setState({ loading: true });

    return BusesListService.fetch().then(function (buses) {
      that.setState({ buses: buses });
    }).then(function () {
      that.setState({ loading: false });
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
