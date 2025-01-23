const form = document.querySelector("#form");
let bill = document.querySelector(".bill-input-container .bill-input");
let tips = document.querySelectorAll(".tip-container .tip-btn");
let tipTotal = document.querySelector(".tip-total-container .tip-amount-total");
let total = document.querySelector(
  ".complete-total-amount-container .complete-total-amount"
);
let numOfPeople = document.querySelector(
  ".num-of-people-container .num-of-people-input"
);
let resetButton = document.querySelector(".reset-button");
let customTip = document.querySelector("#custom-tip");
let errorMessage = document.querySelector(".error-message");

let selectedTip = 0; // To track the selected tip percentage

// Add event listener for custom tip input
customTip.addEventListener("input", () => {
  selectedTip = parseFloat(customTip.value) || 0; // Update the selected tip
  calculateTotals(); // Recalculate totals
});

// Add event listeners for tip buttons
tips.forEach((tip) => {
  tip.addEventListener("click", () => {
    selectedTip = parseFloat(tip.value); // Update the selected tip
    calculateTotals(); // Recalculate totals
  });
});

// Add event listeners for bill and numOfPeople inputs
[bill, numOfPeople].forEach((input) => {
  input.addEventListener("input", () => {
    calculateTotals(); // Recalculate totals when these inputs change
  });
});

// Reset button logic
resetButton.addEventListener("click", () => {
  form.reset();
  selectedTip = 0; // Reset the selected tip
  tipTotal.textContent = "$0.00";
  total.textContent = "$0.00";
});

// Function to calculate totals
function calculateTotals() {
  errorFunction(); // Show/hide error for numOfPeople input

  let billValue = parseFloat(bill.value) || 0; // Default to 0 if invalid
  let numOfPeopleValue = parseFloat(numOfPeople.value) || 1; // Default to 1 if invalid

  if (!numOfPeopleValue) {
    errorMessage.classList.remove("hidden");

    tipTotal.textContent = "$0.00";
    total.textContent = "$0.00";
    return;
  }

  let tipPerPerson = (billValue * (selectedTip / 100)) / numOfPeopleValue;
  tipTotal.textContent = `$${tipPerPerson.toFixed(2)}`;

  let completeTotal =
    (billValue + billValue * (selectedTip / 100)) / numOfPeopleValue;
  total.textContent = `$${completeTotal.toFixed(2)}`;
}

function errorFunction() {
  let numOfPeopleValue = parseFloat(numOfPeople.value);

  if (!numOfPeopleValue) {
    errorMessage.classList.remove("hidden");
    document
      .querySelector(".num-of-people-container")
      .classList.add("error-outline");
  } else {
    errorMessage.classList.add("hidden");
    document
      .querySelector(".num-of-people-container")
      .classList.remove("error-outline");
  }
}
