define([
  'react'
],
function (React) {
  var WelcomeScreen = React.createClass({
    render: function () {
      return <div className="welcome-screen">
        <h1>Bem vindo ao floripa.mobi</h1>
        <p>Horário de ônibus fácil no seu smartphone</p>
        <button onClick={this.props.onDismiss}>adicionar ônibus</button>
      </div>;
    }
  });


  return WelcomeScreen;
});
