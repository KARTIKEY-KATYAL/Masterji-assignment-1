setInterval(() => {
  const now = new Date(); // Get updated date & time

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const day = now.getDate();
  const month = now.getMonth() + 1; // Adjusting month index
  const year = now.getFullYear();

  document.getElementById("time").innerHTML = `${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  document.getElementById("date").innerHTML = `${day
    .toString()
    .padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
}, 1000);
