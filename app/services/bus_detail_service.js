define([
],
function () {
  function fetch (number, callback) {
    callback({
      number: "177",
      name: "Santa Monica",
      schedule: [
        { departure: 'TITRI -> UFSC - Ida', period: 'weekday', hours: ['3:23', '3:30', '3:50'] },
        { departure: 'TITRI -> UFSC - Ida', period: 'saturday', hours: ['3:23', '3:30', '3:50'] },
        { departure: 'TITRI -> UFSC - Ida', period: 'sunday', hours: ['3:23', '3:30', '3:50'] },
        { departure: 'UFSC -> TITRI - Volta', period: 'weekday', hours: ['3:23', '3:30', '3:50'] },
        { departure: 'UFSC -> TITRI - Volta', period: 'saturday', hours: ['3:23', '3:30', '3:50'] },
        { departure: 'UFSC -> TITRI - Volta', period: 'sunday', hours: ['3:23', '3:30', '3:50'] }
      ]
    });
  }

  return {
    fetch: fetch
  };
});
