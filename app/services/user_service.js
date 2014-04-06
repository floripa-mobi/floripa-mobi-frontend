define([
  'when'
], function (when) {

  function fetch () {
    return when.promise(function (resolve) {
      resolve({
        favoriteBuses: []
      });
    });
  }


  return {
    fetch: fetch
  };

});
