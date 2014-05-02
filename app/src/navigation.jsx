/** @jsx React.DOM */

define([
  'react'
],
function (React) {

  var Navigation = React.createClass({
    getDefaultProps: function () {
      return {
        onClickAdd: function () {}
      };
    },

    render: function () {
      var loading = this.props.loading,
          className = loading ? 'navigation loading' : 'navigation';

      return (
        <header className={className}>
          <nav>
            <ol>
              <li><button className="back" onClick={this.props.onClickBack}>Add</button></li>
              <li><button className="add-favorite-bus" onClick={this.props.onClickAdd}>Add</button></li>
            </ol>
          </nav>
        </header>
      );
    }
  });


  return Navigation;

});
