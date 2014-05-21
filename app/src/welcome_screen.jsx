define([
  'react'
],
function (React) {
  var WelcomeScreen = React.createClass({
    render: function () {
      return <div className="welcome-screen">
        <h1>Bem vindo ao floripa.mobi</h1>
        <p>Adicione suas linhas favoritas e acompanhe os horarios dos onibus que mais usa.</p>
      </div>;
    }
  });


  return WelcomeScreen;
});
