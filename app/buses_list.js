define([
  'react',
  'underscore'
],
function (React, _) {

  var BusListItem = React.createClass({
    onSelect: function () {
      this.props.onSelect(this.props.bus);
    },

    render: function () {
      var bus = this.props.bus;

      return (
        <li onClick={this.onSelect}>
          {bus.name}
          <span className='number'>{bus.number}</span>
        </li>
      );
    }
  });

  var BusList = React.createClass({

    onSelect: function (bus) {
      this.props.onSelect(bus);
    },

    render: function () {
      var that = this,
          className = 'buses-list ' + that.props.className;

      return (
        <ol className={className}>
          {_(that.props.buses).map(function (bus) {
            return <BusListItem bus={bus} onSelect={that.onSelect}></BusListItem>
          })}
        </ol>
      )
    }
  });

  return BusList;

});
