define([
  'when',
  'app/helpers/load_json'
],
function (when, loadJSON) {

  function fetch (number) {
    return when.promise(function (resolve) {
      loadJSON('/data/'+number+'.json', function (data) {
        resolve(data);
      }, function () {
        resolve({});
      });
    });
  }


  return {
    fetch: fetch
  };

});
