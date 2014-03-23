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

  FastClick.attach(document.body);
});
