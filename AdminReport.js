var reportJson = {};
var reportFilter = [];

// reportJson = [];

// for (var i = 0; i < 5; i++) {
//   reportJson.push({
//     UnitID: i,
//     RoomID: 101 + i,
//     BillYear: 2023,
//     BillMonth: "สิงหาคม",
//     NameGuest: "Thanapat",
//     LNameGuest: "Nacharoenkul",
//     Watertotalprice: 500,
//     ElectricitytotalPrice: 500,
//     RoomPrice: 1000,
//     Other: 100,
//     TotalPrice: 2100,
//     Billstatus: "pay",
//   });
// }

// for (var i = 0; i < 100; i++) {
//   reportJson.push({
//     UnitID: i,
//     RoomID: 201 + i,
//     BillYear: 2023,
//     BillMonth: "มกราคม",
//     NameGuest: "Test",
//     LNameGuest: "TestLastName",
//     Watertotalprice: 250,
//     ElectricitytotalPrice: 800,
//     RoomPrice: 1200,
//     Other: 150,
//     TotalPrice: 2400,
//     Billstatus: "not pay",
//   });
// }

function openBillForm() {
  // const urlParams = new URLSearchParams();
  // const year = document.getElementById("selectYear").value;
  // const month = document.getElementById("selectMonth").value;
  // urlParams.set("year", year);
  // urlParams.set("month", month);
  // window.open("bill.html?" + urlParams.toString(), "_blank");
  printBillReceipt(reportFilter);
}

function SelectYearReport() {
  // const reportYear = document.getElementById("selectYear").value;
  // const selectMonth = document.getElementById("selectMonth");
  // while (selectMonth.options.length > 1) {
  //   selectMonth.remove(1);
  // }
  // var reportFilterYear = reportJson;
  // if (reportYear != "") {
  //   reportFilterYear = reportJson.filter(
  //     (report) => report.BillYear === reportYear
  //   );
  // }

  // reportFilterYear.forEach((report) => {
  //   const option = document.createElement("option");
  //   option.value = report.BillMonth;
  //   option.text = report.BillMonth;
  //   selectMonth.appendChild(option);
  // });

  // // เริ่มต้นด้วยการรับ element ของ select ที่ต้องการกรอง
  // const selectElement = document.getElementById("selectMonth");

  // // สร้างอาร์เรย์เพื่อเก็บค่าตัวเลือกที่ไม่ซ้ำกัน
  // const uniqueValues = [];
  // // วิธีการกรอง
  // for (let i = 0; i < selectElement.options.length; i++) {
  //   const optionValue = selectElement.options[i].value;

  //   // ถ้ายังไม่มีค่าในอาร์เรย์ uniqueValues
  //   if (uniqueValues.indexOf(optionValue) === -1) {
  //     uniqueValues.push(optionValue);
  //   }
  // }

  // // ลบตัวเลือกทั้งหมดใน select
  // selectElement.innerHTML = "";
  // // เพิ่มตัวเลือกที่ไม่ซ้ำกันลงใน select ใหม่
  // uniqueValues.forEach((value) => {
  //   const optionElement = document.createElement("option");
  //   optionElement.value = value;
  //   if (value != "") {
  //     optionElement.textContent = value;
  //   } else {
  //     optionElement.textContent = "ทั้งหมด";
  //   }

  //   selectElement.appendChild(optionElement);
  // });
  sortYearMonth();
}

function setdatamonth() {
  // const getyearstatus = document.getElementById("yearSelect").value;

  // const monthdata = reportJson.filter(
  //   (reportJson) => reportJson.BillYear == getyearstatus
  // );

  // const monthstatus = document.getElementById("monthSelect");

  // while (monthstatus.hasChildNodes()) {
  //   monthstatus.removeChild(monthstatus.firstChild);
  // }
  // monthdata.map((month) => {
  //   // สร้างตัวเลือก
  //   // GuestFirstname.appendChild(month)
  //   const row = document.createElement("option");
  //   row.value = month.BillMonth;
  //   row.innerText = month.BillMonth;
  //   monthstatus.appendChild(row);
  // });
  // if (monthstatus.hasChildNodes()) {
  //   monthstatus.firstChild.setAttribute("selected", true);
  // }

  // // เริ่มต้นด้วยการรับ element ของ select ที่ต้องการกรอง
  // const selectElement2 = document.getElementById("monthSelect");
  // // สร้างอาร์เรย์เพื่อเก็บค่าตัวเลือกที่ไม่ซ้ำกัน
  // const uniqueValues2 = [];

  // // วิธีการกรอง
  // for (let i = 0; i < selectElement2.options.length; i++) {
  //   const optionValue2 = selectElement2.options[i].value;

  //   // ถ้ายังไม่มีค่าในอาร์เรย์ uniqueValues
  //   if (uniqueValues2.indexOf(optionValue2) === -1) {
  //     uniqueValues2.push(optionValue2);
  //   }
  // }
  // // ลบตัวเลือกทั้งหมดใน select
  // selectElement2.innerHTML = "";

  // // เพิ่มตัวเลือกที่ไม่ซ้ำกันลงใน select ใหม่
  // uniqueValues2.forEach((value) => {
  //   const optionElement2 = document.createElement("option");
  //   optionElement2.value = value;
  //   optionElement2.textContent = value;
  //   selectElement2.appendChild(optionElement2);
  // });
  setroomstatus();
}

function setroomstatus() {
  const getyearstatus = document.getElementById("yearSelect").value;
  const monthstatus = document.getElementById("monthSelect").value;
  const roomstatus = document.getElementById("roomSelect");

  const roomdata = reportJson.filter(
    (reportJson) =>
      reportJson.BillYear == getyearstatus &&
      reportJson.BillMonth == monthstatus
  );

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
  reportFilter = reportJson;
  // console.log(reportJson);

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
  } else if (getYear != "") {
    reportSortYearMonth = reportJson.filter(
      (reportJson) => reportJson.BillYear == getYear
    );
  } else if (getMonth != "") {
    reportSortYearMonth = reportJson.filter(
      (reportJson) => reportJson.BillMonth == getMonth
    );
  }

  reportFilter = reportSortYearMonth;

  reportSortYearMonth.map((report) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="text-center">${report.RoomID}</td>
        <td class="text-center">${report.BillYear}</td>
        <td class="text-center">${report.BillMonth}</td>
        <td class="text-center">${report.GuestFirstname}</td>
        <td class="text-center">${report.GuestLastname}</td>
        <td class="text-center">${report.Watertotalprice}</td>
        <td class="text-center">${report.ElectricitytotalPrice}</td>
        <td class="text-center">${report.RoomPrice}</td>
        <td class="text-center">${report.Other}</td>
        <td class="text-center">${report.TotalPrice}</td>
        <td id="status" class="text-center">${report.Billstatus}</td>
        <td class="text-center"><button type="button" class="btn btn-primary me-3">พิมพ์ใบเสร็จ</button></td>
        <td class="text-center">
        <input id="${report.UnitID}" type="checkbox" data-toggle="toggle" data-onlabel="ชำระแล้ว" data-offlabel="ยังไม่ชำระ" data-onstyle="success" data-offstyle="danger" data-width="100">
        </td>
        `;

    row.querySelector("button").addEventListener("click", (e) => {
      // const urlParams = new URLSearchParams();
      // urlParams.set("id", e.target.id);

      // window.open("bill.html?" + urlParams.toString(), "_blank");

      printBillReceipt([report]);
    });

    const toggle = row.querySelector("input");
    const status = row.querySelector("#status");

    if (report.Billstatus == "ชำระแล้ว") {
      toggle.checked = true;
    }

    toggle.bootstrapToggle();

    toggle.addEventListener("change", () => {
      const data = {
        billID: e.target.id,
        status: "",
      };

      if (e.target.checked == true) {
        status.innerText = "ชำระแล้ว";
        data.status = "ชำระแล้ว";
      } else {
        status.innerText = "ยังไม่ชำระ";
        data.status = "ยังไม่ชำระ";
      }

      sendstatus(data);
    });

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
        <td class="text-center">${report.GuestFirstname}</td>
        <td class="text-center">${report.GuestLastname}</td>
        <td class="text-center">${report.Watertotalprice}</td>
        <td class="text-center">${report.ElectricitytotalPrice}</td>
        <td class="text-center">${report.RoomPrice}</td>
        <td class="text-center">${report.Other}</td>
        <td class="text-center">${report.TotalPrice}</td>
        <td id="status" class="text-center">${report.Billstatus}</td>
        <td class="text-center"><button type="button" class="btn btn-primary me-3">พิมพ์ใบเสร็จ</button></td>
        <td class="text-center">
        <input id="${report.UnitID}" type="checkbox" data-toggle="toggle" data-onlabel="ชำระแล้ว" data-offlabel="ยังไม่ชำระ" data-onstyle="success" data-offstyle="danger" data-width="100">
        </td>
        `;

    row.querySelector("button").addEventListener("click", (e) => {
      // const urlParams = new URLSearchParams();
      // urlParams.set("id", e.target.id);

      // window.open("bill.html?" + urlParams.toString(), "_blank");

      printBillReceipt([report]);
    });

    const toggle = row.querySelector("input");
    const status = row.querySelector("#status");

    if (report.Billstatus == "ชำระแล้ว") {
      toggle.checked = true;
    }

    toggle.bootstrapToggle();

    toggle.addEventListener("change", (e) => {
      const data = {
        billID: e.target.id,
        status: "",
      };

      if (e.target.checked == true) {
        status.innerText = "ชำระแล้ว";
        data.status = "ชำระแล้ว";
      } else {
        status.innerText = "ยังไม่ชำระ";
        data.status = "ยังไม่ชำระ";
      }

      sendstatus(data);
    });

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
    status: status,
  };

  sendstatus(data);
});

async function sendstatus(data) {
  const response = await fetch("http://20.187.73.118:3000/api/statusBill", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
  // console.log(JSON.stringify(data));
  const json = await response.json();
  // alert("แก้ไขสเตตัสบิลเรียบร้อย");
  // location.reload();
}

$(document).ready(function () {
  // เรียกใช้ฟังก์ชันเมื่อคลิกที่หัวข้อเรียงข้อมูล
  $("th.sortable").click(function () {
    const table = $(this).parents("table").eq(0);
    const rows = table
      .find("tbody tr")
      .toArray()
      .sort(comparator($(this).index()));
    this.asc = !this.asc;
    if (!this.asc) {
      rows.reverse();
    }
    for (let i = 0; i < rows.length; i++) {
      table.find("tbody").append(rows[i]);
    }
  });

  function comparator(index) {
    return function (a, b) {
      const valA = getCellValue(a, index);
      const valB = getCellValue(b, index);
      return $.isNumeric(valA) && $.isNumeric(valB)
        ? valA - valB
        : valA.localeCompare(valB);
    };
  }

  function getCellValue(row, index) {
    return $(row).children("td").eq(index).text();
  }
});

function printBillReceipt(bills) {
  // const res = await fetch(
  //   "http://20.187.73.118:3000/api/getreportID?" + urlParams.get("id")
  // );

  // const json = await res.json();

  // console.log(bills);

  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formattedDate = currentDate.toLocaleString("th-TH", options);

  const main = document.getElementById("billReceipt");

  bills.map((bill) => {
    const elecUnit = bill.NowElecUnit - bill.OldElecUnit;

    const div = document.createElement("div");
    div.innerHTML = `<div class="row p-1 pb-2">
    <div class="col-6 text-left" style="font-weight: bold">
      วศินอพาร์ทเม้นท์
    </div>
    <div class="col-6 text-right" style="font-weight: bold">ใบแจ้งหนี้</div>
    <div class="col-6">46/14 หมู่ 9 ต.คานหาม อ.อุทัย จ.อยุธยา 13210</div>
    <div class="col-6 text-right">เลขที่บิล ${bill.UnitID}</div>
    <div class="col-6"></div>
    <div class="col-6 text-right">ห้อง ${bill.RoomID}</div>
    <div class="col-6">ชื่อผู้พัก ${bill.GuestFirstname} ${bill.GuestLastname}</div>
    <div class="col-6 text-right">
      <label id="billdate">วันที่ ${formattedDate}</label>
    </div>
  </div>

  <div class="row border">
    <div class="col-3 text-center border p-2">รายละเอียด</div>
    <div class="col-3 text-center border p-2">จำนวนหน่วย/Units</div>
    <div class="col-3 text-center border p-2">ราคาต่อหน่วย</div>
    <div class="col-3 text-right border p-2">จำนวนเงิน</div>

    <div class="col-3 text-center border d-flex flex-column p-2">
      <div class="text-left">ค่าน้ำประปา</div>
      <div class="text-left">ค่าไฟ (${bill.OldElecUnit}-${bill.NowElecUnit})</div>
    </div>
    <div class="col-3 text-center border d-flex flex-column p-2">
      <div class="text-right">${bill.WaterUnit}</div>
      <div class="text-right">${elecUnit}</div>
    </div>
    <div class="col-3 text-center border d-flex flex-column p-2">
      <div class="text-right">${bill.WaterPrice}</div>
      <div class="text-right">${bill.ElectricPriceperUnit}</div>
    </div>
    <div class="col-3 text-right border d-flex flex-column p-2">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-8 text-right">${bill.Watertotalprice}</div>
      </div>
      <div class="row">
        <div class="col-4"></div>
        <div class="col-8 text-right">${bill.ElectricitytotalPrice}</div>
      </div>
    </div>

    <div class="col-6 border"></div>
    <div class="col-3 border d-flex flex-column p-2">
      <div>ค่าเช่าห้อง</div>
      <div>ค่าใช้จ่ายอื่นๆ</div>
      <div>รวมเงินทั้งสิ้น</div>
    </div>
    <div class="col-3 text-right border d-flex flex-column p-2">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-8 text-right">${bill.RoomPrice}</div>
      </div>
      <div class="row">
        <div class="col-4"></div>
        <div class="col-8 text-right">${bill.Other}</div>
      </div>
      <div class="row">
        <div class="col-4"></div>
        <div
          class="col-8 text-right"
          style="font-weight: bold; text-decoration: underline"
        >
        ${bill.TotalPrice}
        </div>
      </div>
    </div>
  </div>

  <div class="row pt-4">
    <div class="col-6 text-left">
      * หมายเหตุ กำหนดชำระเงินภายในวันที่ 3 ของทุกเดือน
      หากชำระเกินระยะเวลาทางหอพักขอปรับเงินตามจำนวนวันที่เกิน วันละ 50 บาท
    </div>
    <div class="col-6 text-center">
      ผู้รับเงิน ..........................................
    </div>
  </div>`;

    div.classList.add("vh-100");
    div.classList.add("p-4");

    main.appendChild(div);
  });

  window.print();

  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
}
