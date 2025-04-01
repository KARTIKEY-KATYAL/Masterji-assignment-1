function setTime() {
  let timedisplay = document.getElementById("time");
  let now = new Date();
  let hrs = now.getHours();
  if (hrs > 12) {
    hrs -= 12;
  }
  let min = now.getMinutes().toString().padStart(2, "0");
  let sec = now.getSeconds().toString().padStart(2, "0");
  let ampm = now.getHours() >= 12 ? "PM" : "AM";
  timedisplay.textContent = `${hrs}:${min}:${sec}:${ampm}`
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let date = now.toLocaleDateString(undefined, options);


  let dateDisplay = document.getElementById("date");

  dateDisplay.textContent = date;
}

setInterval(setTime,1000)

setTime()