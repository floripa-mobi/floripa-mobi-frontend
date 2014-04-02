define([
  'app/helpers/load_json'
],
function (loadJSON) {
  function fetch (callback) {
    loadJSON('/data/index.json', function (data) {
      callback(data);
    }, function () {
      callback([]);
    });
  }

  return {
    fetch: fetch
  };
});
