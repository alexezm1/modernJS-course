// Listen for submit

document.querySelector("#loan-form").addEventListener("submit", function (e) {
  e.preventDefault();
  // Hide results
  document.querySelector("#results").style.display = "none";

  // Show loader
  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateResults, 2000);
});

function calculateResults() {
  //   e.preventDefault();

  // UI variables
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    document.querySelector("#results").style.display = "block";
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

// Show error Function

function showError(error) {
  document.querySelector("#loading").style.display = "none";
  document.querySelector("#results").style.display = "none";

  const errorDiv = document.createElement("div");

  // Get Elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading

  card.insertBefore(errorDiv, heading);

  // Clear error after 3 secs

  setTimeout(clearError, 3000);
}

// Clear error function
function clearError() {
  document.querySelector(".alert").remove();
}
