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
          props = this.props;

      return (<ol className='home'>
        {_(props.buses).map(function (bus) {
          return <li key={bus.number}>
            {props.editing && <button className='remove' onClick={props.onDelete.bind(that, bus)}>—</button>}
            <BusSummary bus={bus} showSchedule='true' onDelete={props.onDelete.bind(that, bus)} onClick={props.onSelect.bind(that, bus)}></BusSummary>
          </li>;
        })}
      </ol>);
    }
  });

  return Home;
});
