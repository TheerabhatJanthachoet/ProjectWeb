const BillYear = document.getElementById("BillYear");

const currentYear = new Date().getFullYear();

// เจนปีไปอีก 80 ปี
for (let i = currentYear; i <= currentYear + 80; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = i;
  BillYear.appendChild(option);
}
