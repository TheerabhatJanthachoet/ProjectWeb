// Get the current date
const currentDate = new Date();

// Options for formatting the date
const options = { year: 'numeric', month: 'long', day: 'numeric' };

// Format the date using the options
const formattedDate = currentDate.toLocaleDateString('th-TH', options);

// Get the label element by its ID
const dateLabel = document.getElementById('billdate');

// Update the label's content with the formatted date
dateLabel.textContent = `วันที่ ${formattedDate}`;
