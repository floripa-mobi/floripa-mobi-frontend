/** @jsx React.DOM */

define([
  'react',
  'underscore',
  'jsx!src/bus_summary/bus_summary'
],
function (React, _, BusSummary) {
  var Home = React.createClass({
    getDefaultProps: function () {
      return {
        onDelete: function () {}
      };
    },

    render: function () {
      var that = this,
          buses = this.props.buses;

      return (<ol className='home'>
        {_(buses).map(function (bus) {
          return <li key={bus.number}>
            <BusSummary bus={bus} showSchedule='true' onDelete={that.props.onDelete.bind(that, bus)} onClick={that.props.onSelect.bind(that, bus)}></BusSummary>
          </li>;
        })}
      </ol>);
    }
  });

  return Home;
});
