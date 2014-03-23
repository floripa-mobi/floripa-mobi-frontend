define([
],
function () {
  function fetch (number, callback) {
    callback({
      number: "177",
      name: "Santa Monica",
      schedule: [
        { departure: 'titri', weekDays: 'uteis', schedule: ['10:23', '10:30'] },
        { departure: 'titri', weekDays: 'sabado', schedule: ['10:23', '10:30'] },
        { departure: 'titri', weekDays: 'domingo', schedule: ['10:23', '10:30'] },
        { departure: 'ufsc', weekDays: 'uteis', schedule: ['10:23', '10:30'] },
        { departure: 'ufsc', weekDays: 'sabado', schedule: ['10:23', '10:30'] },
        { departure: 'ufsc', weekDays: 'domingo', schedule: ['10:23', '10:30'] }
      ]
    });
  }

  return {
    fetch: fetch
  };
});
