define([
  'when',
  'src/helpers/load_json'
],
function (when, loadJSON) {

  function fetch () {
    return when.promise(function (resolve) {
      loadJSON('/data/index.json', function (data) {
        resolve(data);
      }, function () {
        resolve([]);
      });
    });
  }


  return {
    fetch: fetch
  };

});
