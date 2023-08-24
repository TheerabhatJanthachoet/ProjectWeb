var reportJson = {};

function openBillForm() {
  window.open("bill.html", "_blank");
}


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

function setdatamonth() {
  
  const getyearstatus = document.getElementById("yearSelect").value;
  

  const monthdata = reportJson.filter((reportJson) => reportJson.BillYear == getyearstatus);

  

  const monthstatus = document.getElementById("monthSelect");

  while (monthstatus.hasChildNodes()) {
    monthstatus.removeChild(monthstatus.firstChild);
  }
  monthdata.map((month) => {
    // สร้างตัวเลือก
    // GuestFirstname.appendChild(month)
    const row = document.createElement("option");
    row.value = month.BillMonth;
    row.innerText = month.BillMonth;
    monthstatus.appendChild(row);
  });
  if (monthstatus.hasChildNodes()) {
    monthstatus.firstChild.setAttribute("selected", true);
  }

  // เริ่มต้นด้วยการรับ element ของ select ที่ต้องการกรอง
  const selectElement2 = document.getElementById("monthSelect");
  // สร้างอาร์เรย์เพื่อเก็บค่าตัวเลือกที่ไม่ซ้ำกัน
  const uniqueValues2 = [];

  // วิธีการกรอง
  for (let i = 0; i < selectElement2.options.length; i++) {
    const optionValue2 = selectElement2.options[i].value;

    // ถ้ายังไม่มีค่าในอาร์เรย์ uniqueValues
    if (uniqueValues2.indexOf(optionValue2) === -1) {
      uniqueValues2.push(optionValue2);
    }
  }
  // ลบตัวเลือกทั้งหมดใน select
  selectElement2.innerHTML = "";

  // เพิ่มตัวเลือกที่ไม่ซ้ำกันลงใน select ใหม่
  uniqueValues2.forEach((value) => {
    const optionElement2 = document.createElement("option");
    optionElement2.value = value;
    optionElement2.textContent = value;
    selectElement2.appendChild(optionElement2);
  });
  setroomstatus()
}


function setroomstatus(){

  const getyearstatus = document.getElementById("yearSelect").value;
  const monthstatus = document.getElementById("monthSelect").value;
  const roomstatus = document.getElementById("roomSelect");

  const roomdata = reportJson.filter((reportJson) => reportJson.BillYear == getyearstatus && reportJson.BillMonth == monthstatus);

  while (roomstatus.hasChildNodes()) {
    roomstatus.removeChild(roomstatus.firstChild);
  }
  roomdata.map((room) => {
    // สร้างตัวเลือก
    // GuestFirstname.appendChild(room)
    const row = document.createElement("option");
    row.value = room.RoomID;
    row.innerText = room.RoomID;
    roomstatus.appendChild(row);
  });
  if (roomstatus.hasChildNodes()) {
    roomstatus.firstChild.setAttribute("selected", true);
  }

  // เริ่มต้นด้วยการรับ element ของ select ที่ต้องการกรอง
  const selectElement2 = document.getElementById("roomSelect");
  // สร้างอาร์เรย์เพื่อเก็บค่าตัวเลือกที่ไม่ซ้ำกัน
  const uniqueValues2 = [];

  // วิธีการกรอง
  for (let i = 0; i < selectElement2.options.length; i++) {
    const optionValue2 = selectElement2.options[i].value;

    // ถ้ายังไม่มีค่าในอาร์เรย์ uniqueValues
    if (uniqueValues2.indexOf(optionValue2) === -1) {
      uniqueValues2.push(optionValue2);
    }
  }
  // ลบตัวเลือกทั้งหมดใน select
  selectElement2.innerHTML = "";

  // เพิ่มตัวเลือกที่ไม่ซ้ำกันลงใน select ใหม่
  uniqueValues2.forEach((value) => {
    const optionElement2 = document.createElement("option");
    optionElement2.value = value;
    optionElement2.textContent = value;
    selectElement2.appendChild(optionElement2);
  });
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

  const selectYear2 = document.getElementById("yearSelect");
  const years2 = [...new Set(reportJson.map((report) => report.BillYear))];
  years2.forEach((year2) => {
    const option = document.createElement("option");
    option.value = year2;
    option.text = year2;
    selectYear2.appendChild(option);
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


document.getElementById("savestatus").addEventListener("click", function () {
  const month = document.getElementById("monthSelect").value;
  const year = document.getElementById("yearSelect").value;
  const room = document.getElementById("roomSelect").value;
  const status = document.getElementById("Status").value;

  const checkfilter = reportJson.filter(
    (bill) =>
      bill.RoomID == room && bill.BillYear == year && bill.BillMonth == month
  );
  

  const checkUUID = checkfilter[0].UnitID;
  


  const data = {
    billID: checkUUID,
    status: status
  };

  sendstatus(data);

});


async function sendstatus(data) {
  const response = await fetch("http://20.187.73.118:3000/api/statusBill", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log(JSON.stringify(data));
  const json = await response.json();
  alert("แก้ไขสเตตัสบิลเรียบร้อย");
  location.reload();
}

$(document).ready(function() {
  // เรียกใช้ฟังก์ชันเมื่อคลิกที่หัวข้อเรียงข้อมูล
  $('th.sortable').click(function() {
    const table = $(this).parents('table').eq(0);
    const rows = table.find('tbody tr').toArray().sort(comparator($(this).index()));
    this.asc = !this.asc;
    if (!this.asc) {
      rows.reverse();
    }
    for (let i = 0; i < rows.length; i++) {
      table.find('tbody').append(rows[i]);
    }
  });

  function comparator(index) {
    return function(a, b) {
      const valA = getCellValue(a, index);
      const valB = getCellValue(b, index);
      return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
    };
  }

  function getCellValue(row, index) {
    return $(row).children('td').eq(index).text();
  }
});