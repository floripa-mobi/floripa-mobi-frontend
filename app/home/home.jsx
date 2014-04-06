/** @jsx React.DOM */

define([
  'react',
  'underscore',
  'jsx!app/bus_summary/bus_summary'
],
function (React, _, BusSummary) {
  var Home = React.createClass({
    render: function () {
      var buses = this.props.buses;

      return (<ol className='home'>
        {_(buses).map(function (bus) {
          return <li key={bus.number}>
            <BusSummary bus={bus} showSchedule='true'></BusSummary>
          </li>;
        })}
      </ol>);
    }
  });

  return Home;
});
