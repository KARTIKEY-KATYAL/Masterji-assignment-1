function addReview() {
  const reviewInput = document.getElementById("review");
  const reviewText = reviewInput.value.trim(); // Trim to prevent empty spaces

  if (!reviewText) {
    console.error("Review cannot be empty!");
    return;
  }

  // Create a new div to hold the review
  const reviewDiv = document.createElement("div");
  reviewDiv.className = "review-item";

  // Create a paragraph to hold the review text
  const reviewParagraph = document.createElement("p");
  reviewParagraph.textContent = reviewText;

  // Create an Edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = function () {
    reviewInput.value = reviewParagraph.textContent; // Set input value to current text
    reviewInput.focus(); // Focus on input field
    addButton.textContent = "Update"; // Change "Add" button to "Update"
    addButton.onclick = function () {
      // Change function of "Update" button
      reviewParagraph.textContent = reviewInput.value.trim(); // Update text
      reviewInput.value = ""; // Clear input field
      addButton.textContent = "Add Review"; // Reset button text
      addButton.onclick = addReview; // Restore original function
    };
  };

  // Create a Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    reviewDiv.remove(); // Remove the review div
  };

  // Append elements to the review div
  reviewDiv.appendChild(reviewParagraph);
  reviewDiv.appendChild(editButton);
  reviewDiv.appendChild(deleteButton);

  // Append the review div to the outer container
  const outer = document.getElementById("outer");
  if (outer) {
    outer.appendChild(reviewDiv);
    reviewInput.value = ""; // Clear the input field after adding
  } else {
    console.error("Element with id 'outer' not found.");
  }
}

// Get the Add button for toggling between Add and Update
const addButton = document.querySelector("button");
