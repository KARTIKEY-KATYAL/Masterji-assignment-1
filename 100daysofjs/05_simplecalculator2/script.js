document.addEventListener("DOMContentLoaded", function () {
  const exp = document.getElementById("input");
  const output = document.getElementById("resultexp");

  // Retrieve the last entered expression from localStorage
  const lastExpression = localStorage.getItem("lastExpression");
  if (lastExpression) {
    exp.value = lastExpression; // Pre-fill input field with the last expression
    output.innerHTML = calculate(lastExpression); // Calculate & show last result
  }

  exp.addEventListener("input", function () {
    const result = calculate(exp.value);
    output.innerHTML = result;
    localStorage.setItem("lastExpression", exp.value); // Store latest expression
  });
});

function calculate(expression) {
  try {
    let result = eval(expression).toFixed(2);
    if (result == Infinity || isNaN(result)) {
      return "Invalid expression";
    }
    return result;
  } catch (error) {
    return "Invalid expression";
  }
}
