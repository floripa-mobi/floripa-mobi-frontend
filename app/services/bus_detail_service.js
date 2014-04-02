define([
  'app/helpers/load_json'
],
function (loadJSON) {
  function fetch (number, callback) {
    loadJSON('/data/'+number+'.json', function (data) {
      callback(data);
    }, function () {
      callback({});
    });
  }

  return {
    fetch: fetch
  };
});
