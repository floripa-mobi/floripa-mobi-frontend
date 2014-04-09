define([
  'react',
  'fastclick',
  'jsx!app/application'
],
function (React, FastClick, Application) {
  React.renderComponent(
    Application(),
    document.getElementById('main')
  );

  // removes loading
  document.getElementById('body').className = '';

  FastClick.attach(document.body);
});
