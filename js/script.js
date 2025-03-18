// * Query selectors

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

// * UI

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
    buttons.number[i].addEventListener("click", () => numberButtonOnClick(i));
  }

  buttons.operation.add.addEventListener("click", () => operationButtonOnClick("+"));
  buttons.operation.subt.addEventListener("click", () => operationButtonOnClick("-"));
  buttons.operation.multiply.addEventListener("click", () => operationButtonOnClick("x"));
  buttons.operation.divide.addEventListener("click", () => operationButtonOnClick("/"));
  buttons.operation.equal.addEventListener("click", () => operationButtonOnClick("="));

  buttons.function.clear.addEventListener("click", clearScreen);
  buttons.function.del.addEventListener("click", delScreen);
}

// * Logic

function numberButtonOnClick(buttonNumber) {
  if (calculation.operator === null) {
    calculation.left = Number(String(calculation.left) + buttonNumber);
  } else {
    calculation.right = Number(String(calculation.right ?? 0) + buttonNumber);
  }

  updateCalculationScreen();
}

function operationButtonOnClick(operation) {
  if (operation === "=") {
    if (calculation.operator === null || calculation.right === null) {
      return;
    }
    calculatorScreen.past.textContent = calculatorScreen.current.textContent;
    calculation.left = Math.round(doCalculation() * 1e7) / 1e7;
    calculation.operator = null;
    calculation.right = null;
    updateCalculationScreen();
    return;
  }

  calculation.operator ??= operation;
  updateCalculationScreen();
}

function doCalculation() {
  let result;

  switch (calculation.operator) {
    case "x":
      result = calculation.left * calculation.right;
      break;
    case "/":
      result = calculation.left / calculation.right;
      break;
    case "+":
      result = calculation.left + calculation.right;
      break;
    case "-":
      result = calculation.left - calculation.right;
      break;
  }

  return result;
}

function clearScreen() {
  calculation.left = 0;
  calculation.operator = null;
  calculation.right = null;

  updateCalculationScreen();
}

function delScreen() {
  if (calculation.right !== null) {
    if (String(calculation.right).length === 1) {
      calculation.right = null;
    } else {
      calculation.right = Number(String(calculation.right).slice(0, -1));
    }
  } else if (calculation.operator !== null) {
    calculation.operator = null;
  } else {
    if (String(calculation.left).length === 1) {
      calculation.left = 0;
    } else {
      calculation.left = Number(String(calculation.left).slice(0, -1));
    }
  }

  updateCalculationScreen();
}

// * Startup code

addButtonEvents();
