function calculateBMI(){
    const height = parseFloat(document.getElementById("height").value)/100
    const weight = parseFloat(document.getElementById("weight").value)
    
    let bmi = (weight / (height * height)).toFixed(2);

    let category = "";

    if (bmi < 18.5) {
      category = "Underweight 😔";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = "Normal Weight 😊";
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = "Overweight 😐";
    } else {
      category = "Obese 😟";
    }

    if (height > 0 && weight > 0) {
      let bmi = (weight / (height * height)).toFixed(2);
      document.getElementById("result").innerHTML = `Your BMI is: <span class="text-red-500">${bmi}</span><br/><h1>You are ${category}`;
    } else {
      document.getElementById("result").innerText =
        "Please enter valid height and weight.";
    }
}
