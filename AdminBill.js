var dataJson = {};

// Get a reference to the form element
const billForm = document.querySelector(".modal-body form");

// Add a submit event listener to the form
billForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the input values
  const selectedMonth = document.getElementById("BillMonth").value;
  const selectedYear = document.getElementById("BillYear").value;
  const waterUnitPrice = document.getElementById("WaterUnitPrice").value;
  const electricityUnitPrice = document.getElementById("ElectricityUnitPrice").value;

  // Store the input values in an object
  const billInfo = {
    month: selectedMonth,
    year: selectedYear,
    waterPrice: waterUnitPrice,
    electricityPrice: electricityUnitPrice,
  };

  // You can now use the 'billInfo' object for further processing or display
  console.log("User input:", billInfo);

  // Optional: Trigger the modal transition to the next step
  const billInfoModal = new bootstrap.Modal(document.getElementById("Billinfomation"));
  billInfoModal.show();
});
