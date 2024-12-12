
//  function setRating(value) {
//     // Update hidden input with selected rating value
//     document.getElementById("rating").value = value;

//     // Update the star display
//     const stars = document.querySelectorAll(".star");
//     stars.forEach((star, index) => {
//       if (index < value) {
//         star.innerHTML = "&#9733;";  // Filled star
//         star.style.color = "gold";    // Change color to gold
//       } else {
//         star.innerHTML = "&#9734;";  // Empty star
//         star.style.color = "lightgray";  // Change color to light gray
//       }
//     });
//   }

// Function to set the rating when a star is clicked
function setRating(value) {
    // Update the value of the hidden input
    document.getElementById("rating").value = value;

    // Get all star elements
    const stars = document.querySelectorAll(".star");

    // Update the star display based on the selected rating
    stars.forEach((star, index) => {
        if (index < value) {
            star.innerHTML = "&#9733;"; // Filled star
            star.style.color = "gold";  // Gold color for selected stars
        } else {
            star.innerHTML = "&#9734;"; // Empty star
            star.style.color = "lightgray"; // Light gray for unselected stars
        }
    });

    // Hide the error message (if it exists) after a valid selection
    const errorElement = document.getElementById("rating-error");
    if (errorElement) {
        errorElement.style.display = "none";
    }
}

// Add event listener to validate rating on form submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("review-form");

    form.addEventListener("submit", function (event) {
        const ratingValue = document.getElementById("rating").value;

        // If no rating is selected, prevent submission and show an error
        if (ratingValue === "0") {
            event.preventDefault(); // Stop form submission

            // Check if error message already exists
            let errorElement = document.getElementById("rating-error");
            if (!errorElement) {
                // Create error message if it doesn't exist
                errorElement = document.createElement("div");
                errorElement.id = "rating-error";
                errorElement.style.color = "red";
                errorElement.style.marginTop = "10px";
                errorElement.textContent = "Please select a star rating.";
                form.querySelector(".stars").after(errorElement); // Add error below stars
            }

            errorElement.style.display = "block";
        }
    });
});
