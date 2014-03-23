define([
],
function () {
  function fetch (number, callback) {
    callback({
      number: "177",
      name: "Santa Monica",
      schedule: [
        { departure: 'TITRI -> UFSC - Ida', period: 'weekday', schedule: ['10:23', '10:30', '10:50'] },
        { departure: 'TITRI -> UFSC - Ida', period: 'saturday', schedule: ['10:23', '10:30', '10:50'] },
        { departure: 'TITRI -> UFSC - Ida', period: 'sunday', schedule: ['10:23', '10:30', '10:50'] },
        { departure: 'UFSC -> TITRI - Volta', period: 'weekday', schedule: ['10:23', '10:30', '10:50'] },
        { departure: 'UFSC -> TITRI - Volta', period: 'saturday', schedule: ['10:23', '10:30', '10:50'] },
        { departure: 'UFSC -> TITRI - Volta', period: 'sunday', schedule: ['10:23', '10:30', '10:50'] }
      ]
    });
  }

  return {
    fetch: fetch
  };
});
