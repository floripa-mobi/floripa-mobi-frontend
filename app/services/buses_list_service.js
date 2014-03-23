define([
],
function () {
  function fetch (callback) {
    callback([
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '177', name: 'Santa Monica' },
      { number: '320', name: 'Lagoa da Conceição' },
      { number: '233', name: 'Canasvieiras Trindade' }
    ]);
  }

  return {
    fetch: fetch
  };
});
