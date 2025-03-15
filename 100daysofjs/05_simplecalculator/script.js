function oper(oper) {
const num1 = parseInt(document.getElementById("firstNo").value);
const num2 = parseInt(document.getElementById("secondNo").value);
const resultans = document.getElementById("result");
    console.log(oper)
    if (oper === "+") {
        console.log("add")
        const result = num1 + num2
        resultans.textContent = result
    } else if (oper === "-") {
        console.log("sub")
        const result = num1 - num2
        resultans.textContent = result
    } else if (oper === "*") {
        console.log("mul")
        const result = num1 * num2
        resultans.textContent = result
    } else if (oper === "/") {
        console.log("div")
        const result = num1 / num2
        resultans.textContent = result.toFixed(2)
    }
}