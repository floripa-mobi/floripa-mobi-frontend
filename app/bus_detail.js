define([
  'react'
],
function (React) {
  var BusDetail = React.createClass({
    close: function () {
      this.props.onClose();
    },

    render: function () {
      var bus = this.props.bus,
          className = 'bus-detail ' + this.props.className;

      return (
        <div className={className} onClick={this.close}>
          <h1>{bus.name}</h1>
        </div>
      );
    }
  });

  return BusDetail;
});
