const buttons = {
  number: [
    document.querySelector("#btn-zero"),
    document.querySelector("#btn-1"),
    document.querySelector("#btn-2"),
    document.querySelector("#btn-3"),
    document.querySelector("#btn-4"),
    document.querySelector("#btn-5"),
    document.querySelector("#btn-6"),
    document.querySelector("#btn-7"),
    document.querySelector("#btn-8"),
    document.querySelector("#btn-9"),
  ],
  operation: {
    divide: document.querySelector("#btn-divide"),
    multiply: document.querySelector("#btn-multiply"),
    subt: document.querySelector("#btn-subt"),
    add: document.querySelector("#btn-add"),
    equal: document.querySelector("#btn-equal"),
    decimal: document.querySelector("#btn-decimal"),
  },
  function: {
    clear: document.querySelector("#btn-clear"),
    del: document.querySelector("#btn-backspace"),
  },
};

const screen = {
  current: document.querySelector("#current-calculation"),
  past: document.querySelector("#past-calculation"),
};
