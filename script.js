// This script handles the mood log functionality:
// - Adding a new mood log when a mood is selected.
// - Saving mood logs in localStorage for persistence.
// - Displaying mood logs on page load and after changes.
// - Removing mood logs from both the display and localStorage.

// Function to add a new mood log entry based on the selected mood
function addmood(mood) {
  // Retrieve the container element that holds all mood log entries
  let moodLogs = document.getElementById("moodlogs");

  // Create a new div element to serve as the individual mood log entry
  let logEntry = document.createElement("div");
  logEntry.classList.add("logs");

  // Get current date and time details
  let now = new Date();
  let displayDate = now.toLocaleDateString(); // for user-friendly display
  let isoDate = now.toISOString(); // for accurate, sortable storage
  let id = now.getTime(); // unique id based on timestamp

  // Set a data attribute to link the DOM element with its unique id
  logEntry.setAttribute("data-id", id);

  // Build the HTML content for the log entry:
  // - A delete button using an emoji, triggering removal when clicked.
  // - A div containing the date and corresponding mood emoji.
  logEntry.innerHTML = `<button class="clearbtn" onclick="removeLog(${id})">🗑️</button>
                          <div class="log-details">
                            <span class="date">${displayDate}</span>
                            <span class="emoji">${getEmoji(mood)}</span>
                          </div>
                          `;

  // Append the new log entry to the mood log container in the DOM
  moodLogs.appendChild(logEntry);

  // Create a log object and save it to localStorage for persistence
  saveLog({ id: id, date: isoDate, displayDate: displayDate, mood: mood });
}

// Function to save a mood log entry in localStorage
function saveLog(logEntry) {
  // Retrieve any existing mood logs from localStorage; if none, initialize as an empty array
  let logs = JSON.parse(localStorage.getItem("moodLogs")) || [];
  // Add the new log entry to the array
  logs.push(logEntry);
  // Save the updated logs array back to localStorage
  localStorage.setItem("moodLogs", JSON.stringify(logs));
}

// Function to remove a mood log entry using its unique id and update the display
function removeLog(id) {
  // Retrieve stored logs from localStorage
  let logs = JSON.parse(localStorage.getItem("moodLogs")) || [];
  // Filter out the log entry that matches the provided id
  logs = logs.filter((log) => log.id !== id);
  // Update localStorage with the remaining logs
  localStorage.setItem("moodLogs", JSON.stringify(logs));
  // Refresh the mood logs displayed on the page
  displayMoods();
}

// Function to return the emoji associated with a given mood
function getEmoji(mood) {
  // Define a mapping of moods to their corresponding emojis
  const emojis = {
    happy: "😀",
    sad: "😔",
    neutral: "😑",
    excited: "😃",
  };
  // Return the corresponding emoji, or default to a thinking face if not recognized
  return emojis[mood] || "🤔";
}

// Function to display all stored mood logs from localStorage
function displayMoods() {
  // Retrieve the container that holds the mood logs
  let moodLogsContainer = document.getElementById("moodlogs");
  // Clear any existing content in the container
  moodLogsContainer.innerHTML = "";
  // Retrieve the stored logs (if any) from localStorage
  const logs = JSON.parse(localStorage.getItem("moodLogs")) || [];
  // Loop over each log entry stored
  logs.forEach((log) => {
    let logDate = new Date(log.date);
    let emoji = getEmoji(log.mood);
    // Validate that the stored date is valid and a proper emoji is found
    if (!isNaN(logDate.getTime()) && emoji !== "🤔") {
      // Create a new DOM element for the log entry
      let logEntry = document.createElement("div");
      logEntry.classList.add("logs");
      logEntry.setAttribute("data-id", log.id);
      // Build the HTML content for the entry, mirroring the structure in addmood()
      logEntry.innerHTML = `<button class="clearbtn" onclick="removeLog(${
        log.id
      })">🗑️</button>
                                  <div class="log-details">
                                    <span class="date">${logDate.toLocaleDateString()}</span>
                                    <span class="emoji">${emoji}</span>
                                  </div>`;
      // Append this entry back into the mood logs container
      moodLogsContainer.appendChild(logEntry);
    }
  });
}

// On window load, display all previously saved mood logs from localStorage
window.onload = displayMoods;
