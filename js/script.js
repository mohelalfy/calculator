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
  leftDecimalLeading: false,
  rightDecimalLeading: false,
  isUndefined: false,
};

// * UI

function updateCalculationScreen() {
  if (calculation.isUndefined) {
    calculatorScreen.current.textContent = "Can't divide by 0";
    return;
  }

  let text = `${calculation.left}${calculation.leftDecimalLeading ? "." : ""}`;
  if (calculation.operator !== null) {
    text += ` ${calculation.operator}`;
  }
  if (calculation.right !== null) {
    text += ` ${calculation.right}${calculation.rightDecimalLeading ? "." : ""}`;
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
  buttons.operation.decimal.addEventListener("click", decimalPointOnClick);

  buttons.function.clear.addEventListener("click", clearScreen);
  buttons.function.del.addEventListener("click", delScreen);
}

function addKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    for (let i = 0; i < buttons.number.length; i++) {
      if (e.key === String(i)) {
        buttons.number[i].click();
        return;
      }
    }
    switch (e.key) {
      case "*":
        buttons.operation.multiply.click();
        break;
      case "/":
        buttons.operation.divide.click();
        break;
      case "+":
        buttons.operation.add.click();
        break;
      case "-":
        buttons.operation.subt.click();
        break;
      case "=":
        buttons.operation.equal.click();
        break;
      case ".":
        buttons.operation.decimal.click();
        break;
    }

    if (e.code === "Backspace") {
      buttons.function.del.click();
    } else if (e.code === "Enter" || e.code === "NumpadEnter") {
      buttons.operation.equal.click();
    }
  });
}

// * Logic

function numberButtonOnClick(buttonNumber) {
  if (calculation.operator === null) {
    calculation.left = Number(
      String(calculation.left) + (calculation.leftDecimalLeading ? "." : "") + buttonNumber
    );
    calculation.leftDecimalLeading = false;
  } else {
    calculation.right = Number(
      String(calculation.right ?? 0) + (calculation.rightDecimalLeading ? "." : "") + buttonNumber
    );
    calculation.rightDecimalLeading = false;
  }

  updateCalculationScreen();
}

function operationButtonOnClick(operation) {
  if (calculation.leftDecimalLeading || calculation.rightDecimalLeading) {
    return;
  }

  if (operation === "=" || calculation.right !== null) {
    if (calculation.operator === null || calculation.right === null) {
      return;
    }

    if (calculation.operator === "/" && calculation.right === 0) {
      calculation.isUndefined = true;
      updateCalculationScreen();
      return;
    }

    calculatorScreen.past.textContent = calculatorScreen.current.textContent;
    calculation.left = Math.round(doCalculation() * 1e7) / 1e7;
    calculation.right = null;

    if (["+", "-", "/", "x"].includes(operation)) {
      calculation.operator = operation;
    } else {
      calculation.operator = null;
    }

    updateCalculationScreen();
    return;
  }

  calculation.operator ??= operation;
  updateCalculationScreen();
}

function decimalPointOnClick() {
  if (calculation.right !== null) {
    if (!String(calculation.right).includes(".")) {
      calculation.rightDecimalLeading = true;
    }
  } else {
    if (!String(calculation.left).includes(".")) {
      calculation.leftDecimalLeading = true;
    }
  }

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
  calculation.leftDecimalLeading = false;
  calculation.rightDecimalLeading = false;
  calculation.isUndefined = false;
  calculatorScreen.past.textContent = "";

  updateCalculationScreen();
}

function delScreen() {
  if (calculation.right !== null) {
    if (calculation.isUndefined) {
      calculation.isUndefined = false;
      updateCalculationScreen();
      return;
    }
    if (String(calculation.right).length === 1 && !calculation.rightDecimalLeading) {
      calculation.right = null;
    } else {
      const numStr = String(calculation.right);
      if (numStr[numStr.length - 2] === ".") {
        calculation.rightDecimalLeading = true;
      } else if (calculation.rightDecimalLeading) {
        calculation.rightDecimalLeading = false;
        updateCalculationScreen();
        return;
      }

      calculation.right = Number(numStr.slice(0, -1));
    }
  } else if (calculation.operator !== null) {
    calculation.operator = null;
  } else {
    if (String(calculation.left).length === 1 && !calculation.leftDecimalLeading) {
      calculation.left = 0;
    } else {
      const numStr = String(calculation.left);
      if (numStr[numStr.length - 2] === ".") {
        calculation.leftDecimalLeading = true;
      } else if (calculation.leftDecimalLeading) {
        calculation.leftDecimalLeading = false;
        updateCalculationScreen();
        return;
      }

      calculation.left = Number(numStr.slice(0, -1));
    }
  }

  updateCalculationScreen();
}

// * Startup code

addButtonEvents();
addKeyboardShortcuts();
