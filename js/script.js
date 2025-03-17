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

const calculatorScreen = {
  current: document.querySelector("#current-calculation"),
  past: document.querySelector("#past-calculation"),
};

const calculation = {
  left: 0,
  operator: null,
  right: null,
};

function updateCalculationScreen() {
  let text = `${calculation.left}`;
  if (calculation.operator !== null) {
    text += ` ${calculation.operator}`;
  }
  if (calculation.right !== null) {
    text += ` ${calculation.right}`;
  }

  calculatorScreen.current.textContent = text;
}

function addButtonEvents() {
  // Numbers 0-9
  for (let i = 0; i < buttons.number.length; i++) {
    const btn = buttons.number[i];

    btn.addEventListener("click", (e) => {
      if (calculation.operator === null) {
        calculation.left = Number(String(calculation.left) + i);
      } else {
        calculation.right = Number(String(calculation.right ?? 0) + i);
      }

      updateCalculationScreen();
    });
  }

  buttons.operation.add.addEventListener("click", (e) => {
    calculation.operator ??= "+";
    updateCalculationScreen();
  });
  buttons.operation.subt.addEventListener("click", (e) => {
    calculation.operator ??= "-";
    updateCalculationScreen();
  });
  buttons.operation.multiply.addEventListener("click", (e) => {
    calculation.operator ??= "x";
    updateCalculationScreen();
  });
  buttons.operation.divide.addEventListener("click", (e) => {
    calculation.operator ??= "/";
    updateCalculationScreen();
  });
}

addButtonEvents();
