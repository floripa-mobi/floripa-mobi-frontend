define([
  'app/helpers/load_json'
],
function (loadJSON) {
  function fetch (callback) {
    loadJSON('/index.json', function (data) {
      callback(data);
    }, function () {
      callback([]);
    });
  }

  return {
    fetch: fetch
  };
});
