define([
  'when'
], function (when) {

  function fetch () {
    return when.promise(function (resolve) {
      var data = localStorage.getItem('user_data'),
          user = data && JSON.parse(data) || {};

      resolve(user);
    });
  }


  function save (user) {
    return when.promise(function (resolve) {
      localStorage.setItem('user_data', JSON.stringify(user));
      resolve(user);
    });
  }


  return {
    fetch: fetch,
    save: save
  };

});
