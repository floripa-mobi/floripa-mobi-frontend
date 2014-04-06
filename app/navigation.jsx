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
      return (
        <header className='navigation'>
          <nav>
            <ol>
              <li><button className="add-favorite-bus" onClick={this.props.onClickAdd}>Add</button></li>
            </ol>
          </nav>
        </header>
      );
    }
  });


  return Navigation;

});
