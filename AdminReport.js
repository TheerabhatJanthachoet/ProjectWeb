var reportJson = {};

function SelectYearReport() {
  const reportYear = document.getElementById("selectYear").value;
  const selectMonth = document.getElementById("selectMonth");
  while (selectMonth.options.length > 1) {
    selectMonth.remove(1);
  }
  var reportFilterYear = reportJson;
  if (reportYear != "") {
    reportFilterYear = reportJson.filter(
      (report) => report.BillYear === reportYear
    );
  }

  reportFilterYear.forEach((report) => {
    const option = document.createElement("option");
    option.value = report.BillMonth;
    option.text = report.BillMonth;
    selectMonth.appendChild(option);
  });

  // เริ่มต้นด้วยการรับ element ของ select ที่ต้องการกรอง
  const selectElement = document.getElementById("selectMonth");

  // สร้างอาร์เรย์เพื่อเก็บค่าตัวเลือกที่ไม่ซ้ำกัน
  const uniqueValues = [];
  // วิธีการกรอง
  for (let i = 0; i < selectElement.options.length; i++) {
    const optionValue = selectElement.options[i].value;

    // ถ้ายังไม่มีค่าในอาร์เรย์ uniqueValues
    if (uniqueValues.indexOf(optionValue) === -1) {
      uniqueValues.push(optionValue);
    }
  }

  // ลบตัวเลือกทั้งหมดใน select
  selectElement.innerHTML = "";
  // เพิ่มตัวเลือกที่ไม่ซ้ำกันลงใน select ใหม่
  uniqueValues.forEach((value) => {
    const optionElement = document.createElement("option");
    optionElement.value = value;
    if (value != "") {
      optionElement.textContent = value;
    } else {
      optionElement.textContent = "ทั้งหมด";
    }

    selectElement.appendChild(optionElement);
  });
  sortYearMonth();
  
}

async function getReport() {
  const url = new URL("http://20.187.73.118:3000/api/getreport");
  url.port = 3000;
  const res = await fetch(url, {
    method: "GET",
  });
  const bill = await res.json();
  reportJson = JSON.parse(bill);

  const selectYear = document.getElementById("selectYear");
  const years = [...new Set(reportJson.map((report) => report.BillYear))];
  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    selectYear.appendChild(option);
  });

  setdata(reportJson);
}

function sortYearMonth() {
  const getYear = document.getElementById("selectYear").value;
  const getMonth = document.getElementById("selectMonth").value;
  const tableselect = document.getElementById("tableList");
  while (tableselect.hasChildNodes()) {
    tableselect.removeChild(tableselect.firstChild);
  }
  var reportSortYearMonth = reportJson;
  if (getYear != "" && getMonth != "") {
    reportSortYearMonth = reportJson.filter(
      (reportJson) =>
        reportJson.BillYear == getYear && reportJson.BillMonth == getMonth
    );
  } else if (getYear != "" ) {
        reportSortYearMonth = reportJson.filter(
            (reportJson) =>
                reportJson.BillYear == getYear
        );
  } else if (getMonth != "") {
        reportSortYearMonth = reportJson.filter(
            (reportJson) =>
                reportJson.BillMonth == getMonth
        );
  }

  
  reportSortYearMonth.map((report) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="text-center">${report.RoomID}</td>
        <td class="text-center">${report.BillYear}</td>
        <td class="text-center">${report.BillMonth}</td>
        <td class="text-center">${report.NameGuest}</td>
        <td class="text-center">${report.LNameGuest}</td>
        <td class="text-center">${report.Watertotalprice}</td>
        <td class="text-center">${report.ElectricitytotalPrice}</td>
        <td class="text-center">${report.RoomPrice}</td>
        <td class="text-center">${report.Other}</td>
        <td class="text-center">${report.TotalPrice}</td>
        <td class="text-center">${report.Billstatus}</td>
        
        `;
    // เพิ่มแถวลงในตาราง
    tableselect.appendChild(row);
  });
}

function setdata(data) {
  const tableList = document.getElementById("tableList");

  data.map((report) => {
    // สร้างแถวของตาราง

    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="text-center">${report.RoomID}</td>
        <td class="text-center">${report.BillYear}</td>
        <td class="text-center">${report.BillMonth}</td>
        <td class="text-center">${report.NameGuest}</td>
        <td class="text-center">${report.LNameGuest}</td>
        <td class="text-center">${report.Watertotalprice}</td>
        <td class="text-center">${report.ElectricitytotalPrice}</td>
        <td class="text-center">${report.RoomPrice}</td>
        <td class="text-center">${report.Other}</td>
        <td class="text-center">${report.TotalPrice}</td>
        <td class="text-center">${report.Billstatus}</td>
        
        `;
    // เพิ่มแถวลงในตาราง
    tableList.appendChild(row);
  });
}

getReport();
