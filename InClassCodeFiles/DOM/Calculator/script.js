document.addEventListener("DOMContentLoaded", function () {
  let display = document.getElementById("display");
  let currentInput = "";
  let operator = "";
  let firstOperand = null;

  // Function to handle number input
  function onNumPress(value) {
    if (display.textContent === "0" || operator === "=") {
      display.textContent = "";
      operator = "";
    }
    display.textContent += value;
    currentInput += value;
  }

  // Function to handle operator input
  function onOperatorPress(op) {
    if (firstOperand === null) {
      firstOperand = parseFloat(currentInput);
    } else if (operator) {
      firstOperand = calculate(
        firstOperand,
        parseFloat(currentInput),
        operator
      );
    }

    operator = op;
    display.textContent = `${firstOperand} ${operator} `; // Show "a op"
    currentInput = "";
  }

  // Function to compute result
  function findTotal() {
    if (firstOperand !== null && operator && currentInput !== "") {
      let secondOperand = parseFloat(currentInput);
      let result = calculate(firstOperand, secondOperand, operator);
      display.textContent = `${firstOperand} ${operator} ${secondOperand} = ${result}`; // Show "a op b = result"
      firstOperand = result;
      operator = "=";
      currentInput = result.toString();
    }
  }

  // Function to clear display
  function clearDisplay() {
    display.textContent = "0";
    firstOperand = null;
    operator = "";
    currentInput = "";
  }

  // Function to perform calculation
  function calculate(a, b, op) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "/":
        return b !== 0 ? a / b : "Error";
      default:
        return b;
    }
  }

  // Attach event listeners to buttons
  document.querySelectorAll(".num-btn").forEach((button) => {
    button.addEventListener("click", function () {
      onNumPress(this.textContent);
    });
  });

  document.querySelectorAll(".op-btn").forEach((button) => {
    button.addEventListener("click", function () {
      onOperatorPress(this.textContent);
    });
  });

  document.getElementById("equals-btn").addEventListener("click", findTotal);
  document.getElementById("clear-btn").addEventListener("click", clearDisplay);
});
