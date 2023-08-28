var dataJson = {};
var billJson = {};
var datacontactJson = {};
var calwater = 0;
var calelec = 0;
var caltotal = 0;

var editroombill = {};

//เลือกเฉพาะห้องที่ว่าง,ห้องแจ้งย้ายออก//

function SelectRoomfloorOption() {
  const checkFloor = document.getElementById("Floor").value;

  setdatacheck(dataJson, checkFloor);
  setName();
  calPrice();
}
//

//เลือกเฉพาะของปีนั้น

function SelectYearOption() {
  const checkyear = document.getElementById("editBillYear").value;

  setdatabill(billJson, checkyear);
}

// Get ห้อง
async function getRoom() {
  const url = new URL("http://20.187.73.118/api/room");
  url.port = 3000;
  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
  dataJson = JSON.parse(data);
}

//Get บิล
async function getBill() {
  const url = new URL("http://20.187.73.118/api/getbill");
  url.port = 3000;
  const res = await fetch(url, {
    method: "GET",
  });
  const bill = await res.json();
  billJson = JSON.parse(bill);
  setdatabillcheck(billJson);
}

// function setdata(data) {
//   const guestName = document.getElementById("GuestFirstname").room.NameGuest;

// }

function setdatacheck(data, checkFloor) {
  const roomnotNull = data.filter(
    (data) => data.RoomFloor == checkFloor && data.Status == "ไม่ว่าง"
  );

  const getRoomnotNullfilter = document.getElementById("RoomNumber");
  const GuestFirstname = document.getElementById("GuestFirstname");

  while (getRoomnotNullfilter.hasChildNodes()) {
    getRoomnotNullfilter.removeChild(getRoomnotNullfilter.firstChild);
  }
  roomnotNull.map((roomout) => {
    // สร้างตัวเลือก
    // GuestFirstname.appendChild(roomout)
    const row = document.createElement("option");
    row.value = roomout.RoomID;
    row.innerText = roomout.RoomID;
    getRoomnotNullfilter.appendChild(row);
  });
  if (getRoomnotNullfilter.hasChildNodes()) {
    getRoomnotNullfilter.firstChild.setAttribute("selected", true);
  }
}

function setName() {
  const checkroom = document.getElementById("RoomNumber").value;
  const roomnotNull = dataJson.filter(
    (dataJson) => dataJson.RoomID == checkroom
  )[0];

  const GuestFirstname = document.getElementById("GuestFirstname");
  const GuestLastname = document.getElementById("GuestLastname");
  const waterUnit = document.getElementById("WaterUnit");
  const RoomPrice = document.getElementById("RoomPrice");
  const elecold = document.getElementById("ElectricityPastUnit");
  if (!roomnotNull) {
    GuestFirstname.value = "";
    GuestLastname.value = "";
    RoomPrice.value = "";
    waterUnit.value = "";
    elecold.value = "";

    return;
  }
  GuestFirstname.value = roomnotNull.NameGuest;
  GuestLastname.value = roomnotNull.LNameGuest;
  RoomPrice.value = roomnotNull.RoomPrice;
  waterUnit.value = roomnotNull.RoomCount;
  elecold.value = roomnotNull.ElecUnit;

  ElectricityUnit.value = "";

  OtherPrice.value = 0;
  calPrice();
}
//

//แก้ไขบิล

//ปี
function setdatabillcheck(data) {
  const edityear = data;

  const getBillYear = document.getElementById("editBillYear");
  const getstatusYear = document.getElementById("yearSelect");

  while (getBillYear.hasChildNodes()) {
    getBillYear.removeChild(getBillYear.firstChild);
  }
  edityear.map((year) => {
    // สร้างตัวเลือก
    // GuestFirstname.appendChild(roomout)
    const row = document.createElement("option");
    row.value = year.BillYear;
    row.innerText = year.BillYear;
    getBillYear.appendChild(row);
  });

  while (getstatusYear.hasChildNodes()) {
    getstatusYear.removeChild(getstatusYear.firstChild);
  }
  edityear.map((year) => {
    // สร้างตัวเลือก
    // GuestFirstname.appendChild(roomout)
    const row = document.createElement("option");
    row.value = year.BillYear;
    row.innerText = year.BillYear;
    getstatusYear.appendChild(row);
  });

  if (getBillYear.hasChildNodes()) {
    getBillYear.firstChild.setAttribute("selected", true);
  }

  // เริ่มต้นด้วยการรับ element ของ select ที่ต้องการกรอง
  const selectElement = document.getElementById("editBillYear");
  const selectElement2 = document.getElementById("yearSelect");
  // สร้างอาร์เรย์เพื่อเก็บค่าตัวเลือกที่ไม่ซ้ำกัน
  const uniqueValues = [];
  const uniqueValues2 = [];
  // วิธีการกรอง
  for (let i = 0; i < selectElement.options.length; i++) {
    const optionValue = selectElement.options[i].value;

    // ถ้ายังไม่มีค่าในอาร์เรย์ uniqueValues
    if (uniqueValues.indexOf(optionValue) === -1) {
      uniqueValues.push(optionValue);
    }
  }

  for (let i = 0; i < selectElement2.options.length; i++) {
    const optionValue2 = selectElement2.options[i].value;

    // ถ้ายังไม่มีค่าในอาร์เรย์ uniqueValues
    if (uniqueValues2.indexOf(optionValue2) === -1) {
      uniqueValues2.push(optionValue2);
    }
  }

  // ลบตัวเลือกทั้งหมดใน select
  selectElement.innerHTML = "";
  selectElement2.innerHTML = "";

  // เพิ่มตัวเลือกที่ไม่ซ้ำกันลงใน select ใหม่
  uniqueValues.forEach((value) => {
    const optionElement = document.createElement("option");
    optionElement.value = value;
    optionElement.textContent = value;
    selectElement.appendChild(optionElement);
  });

  uniqueValues2.forEach((value) => {
    const optionElement2 = document.createElement("option");
    optionElement2.value = value;
    optionElement2.textContent = value;
    selectElement2.appendChild(optionElement2);
  });

  SelectYearOption();
}


function setdatabill(data, checkyear) {
  // const monthdata = data.filter((data) => data.BillYear == checkyear);

  // const getRoomnotNullfilter = document.getElementById("editBillMonth");
  // const getRoomnotNullfilter2 = document.getElementById("monthSelect");

  // while (getRoomnotNullfilter.hasChildNodes()) {
  //   getRoomnotNullfilter.removeChild(getRoomnotNullfilter.firstChild);
  // }
  // monthdata.map((month) => {
  //   // สร้างตัวเลือก
  //   // GuestFirstname.appendChild(month)
  //   const row = document.createElement("option");
  //   row.value = month.BillMonth;
  //   row.innerText = month.BillMonth;
  //   getRoomnotNullfilter.appendChild(row);
  // });
  // if (getRoomnotNullfilter.hasChildNodes()) {
  //   getRoomnotNullfilter.firstChild.setAttribute("selected", true);
  // }

  // while (getRoomnotNullfilter2.hasChildNodes()) {
  //   getRoomnotNullfilter2.removeChild(getRoomnotNullfilter2.firstChild);
  // }
  // monthdata.map((month) => {
  //   // สร้างตัวเลือก
  //   // GuestFirstname.appendChild(month)
  //   const row = document.createElement("option");
  //   row.value = month.BillMonth;
  //   row.innerText = month.BillMonth;
  //   getRoomnotNullfilter2.appendChild(row);
  // });
  // if (getRoomnotNullfilter2.hasChildNodes()) {
  //   getRoomnotNullfilter2.firstChild.setAttribute("selected", true);
  // }

  // // เริ่มต้นด้วยการรับ element ของ select ที่ต้องการกรอง
  // const selectElement = document.getElementById("editBillMonth");
  // const selectElement2 = document.getElementById("monthSelect");
  // // สร้างอาร์เรย์เพื่อเก็บค่าตัวเลือกที่ไม่ซ้ำกัน
  // const uniqueValues = [];
  // const uniqueValues2 = [];

  // // วิธีการกรอง
  // for (let i = 0; i < selectElement.options.length; i++) {
  //   const optionValue = selectElement.options[i].value;

  //   // ถ้ายังไม่มีค่าในอาร์เรย์ uniqueValues
  //   if (uniqueValues.indexOf(optionValue) === -1) {
  //     uniqueValues.push(optionValue);
  //   }
  // }

  // for (let i = 0; i < selectElement2.options.length; i++) {
  //   const optionValue2 = selectElement2.options[i].value;

  //   // ถ้ายังไม่มีค่าในอาร์เรย์ uniqueValues
  //   if (uniqueValues2.indexOf(optionValue2) === -1) {
  //     uniqueValues2.push(optionValue2);
  //   }
  // }
  // // ลบตัวเลือกทั้งหมดใน select
  // selectElement.innerHTML = "";
  // selectElement2.innerHTML = "";

  // // เพิ่มตัวเลือกที่ไม่ซ้ำกันลงใน select ใหม่
  // uniqueValues.forEach((value) => {
  //   const optionElement = document.createElement("option");
  //   optionElement.value = value;
  //   optionElement.textContent = value;
  //   selectElement.appendChild(optionElement);
  // });

  // uniqueValues2.forEach((value) => {
  //   const optionElement2 = document.createElement("option");
  //   optionElement2.value = value;
  //   optionElement2.textContent = value;
  //   selectElement2.appendChild(optionElement2);
  // });
  setroomstatusbill()
}
//

//
function setroomeditbill() {
  const checkFloor = document.getElementById("editFloor").value;
  const checkyear = document.getElementById("editBillYear").value;
  const checkmonth = document.getElementById("editBillMonth").value;

  setroombill(billJson, checkFloor, checkyear, checkmonth);
  setdataedit();
}

function setroomstatusbill() {
  
  const checkyear = document.getElementById("yearSelect").value;
  const checkmonth = document.getElementById("monthSelect").value;

  setroomstatus(billJson,checkyear, checkmonth);
  
}

function setroomstatus(data,checkyear, checkmonth) {
  editroombill = data.filter(
    (data) =>
      data.BillYear == checkyear &&
      data.BillMonth == checkmonth );
  // console.log(editroombill)
  // console.log(typeof editroombill[0].RoomID)

  const editroomfilter = document.getElementById("roomSelect");

  while (editroomfilter.hasChildNodes()) {
    editroomfilter.removeChild(editroomfilter.firstChild);
  }

  editroombill.map((room) => {
    // สร้างตัวเลือก
    // GuestFirstname.appendChild(month)
    const row = document.createElement("option");
    row.value = room.RoomID;
    row.innerText = room.RoomID;
    editroomfilter.appendChild(row);
  });
  if (editroomfilter.hasChildNodes()) {
    editroomfilter.firstChild.setAttribute("selected", true);
  }
}







function setroombill(data, checkFloor, checkyear, checkmonth) {
  editroombill = data.filter(
    (data) =>
      data.BillYear == checkyear &&
      data.BillMonth == checkmonth &&
      Math.floor(data.RoomID / 100) == checkFloor
  );
  // console.log(editroombill)
  // console.log(typeof editroombill[0].RoomID)

  const editroomfilter = document.getElementById("editRoomNumber");

  while (editroomfilter.hasChildNodes()) {
    editroomfilter.removeChild(editroomfilter.firstChild);
  }

  editroombill.map((room) => {
    // สร้างตัวเลือก
    // GuestFirstname.appendChild(month)
    const row = document.createElement("option");
    row.value = room.RoomID;
    row.innerText = room.RoomID;
    editroomfilter.appendChild(row);
  });
  if (editroomfilter.hasChildNodes()) {
    editroomfilter.firstChild.setAttribute("selected", true);
  }
}

function setdataedit() {
  const editroomfilter = document.getElementById("editRoomNumber").value;

  const dataget = dataJson.filter(
    (dataJson) => dataJson.RoomID == editroomfilter
  )[0];
  const dataget2 = editroombill.filter(
    (editroombill) => editroombill.RoomID == editroomfilter
  )[0];
  console.log(dataget, dataget2);

  const GuestFirstname = document.getElementById("editGuestFirstname");
  const GuestLastname = document.getElementById("editGuestLastname");

  const waterper = document.getElementById("editWaterPriceperUnit");
  const waterUnit = document.getElementById("editWaterUnit");
  const watertotal = document.getElementById("edittotalwater");

  const RoomPrice = document.getElementById("editRoomPrice");
  const roomtotal = document.getElementById("edittotalroom");

  const elecold = document.getElementById("editElectricityPastUnit");
  const elecper = document.getElementById("editElectricityPriceperUnit");
  const elecnew = document.getElementById("editElectricityUnit");
  const electotal = document.getElementById("edittotalElec");

  const option = document.getElementById("editOtherPrice");
  const totaloption = document.getElementById("edittotalmore");

  const total = document.getElementById("edittotalfinal");

  if (!dataget2) {
    GuestFirstname.value = "";
    GuestLastname.value = "";
    RoomPrice.value = "";
    waterUnit.value = "";
    elecold.value = "";
    elecnew.value = "";
    elecper.value = "";
    waterper.value = "";
    electotal.value = "";
    watertotal.value = "";
    roomtotal.value = "";
    calPriceedit()
    return;
  }

  GuestFirstname.value = dataget.NameGuest;
  GuestLastname.value = dataget.LNameGuest;

  waterper.value = dataget2.WaterPrice;
  waterUnit.value = dataget2.WaterUnit;
  // watertotal.innerText = dataget2.Watertotalprice

  RoomPrice.value = dataget.RoomPrice;
  // roomtotal.innerText = dataget.RoomPrice

  elecold.value = dataget2.OldElecUnit;
  elecper.value = dataget2.ElectricPriceperUnit;
  elecnew.value = dataget2.NowElecUnit;
  // electotal.innerText = dataget2.ElectricitytotalPrice

  option.value = dataget2.Other;
  // totaloption.innerText = dataget2.Other

  // total.innerText = dataget2.totalPrice
  calPriceedit()
}

getRoom();
getBill();

//คำนวนค่าน้ำค่าไฟ

// ค่าน้ำ
const WaterPriceperUnit = document.getElementById("WaterPriceperUnit");
const WaterUnit = document.getElementById("WaterUnit");

//ค่าไฟ
const ElectricityPastUnit = document.getElementById("ElectricityPastUnit");
const ElectricityPriceperUnit = document.getElementById(
  "ElectricityPriceperUnit"
);
const ElectricityUnit = document.getElementById("ElectricityUnit");

//ค่าห้อง
const RoomPrice = document.getElementById("RoomPrice");

//ค่าอื่นๆ
const OtherPrice = document.getElementById("OtherPrice");

//รวมค่าไฟ
const totalwater = document.getElementById("totalwater");
//รวมค่าน้ำ
const totalElec = document.getElementById("totalElec");
//รวมค่าห้อง
const totalroom = document.getElementById("totalroom");
//รวมค่าอื่นๆ
const totalmore = document.getElementById("totalmore");
//รวมทั้งหมด
const totalfinal = document.getElementById("totalfinal");

// ค่าน้ำ
const WaterPriceperUnit2 = document.getElementById("editWaterPriceperUnit");
const WaterUnit2 = document.getElementById("editWaterUnit");

//ค่าไฟ
const ElectricityPastUnit2 = document.getElementById("editElectricityPastUnit");
const ElectricityPriceperUnit2 = document.getElementById(
  "editElectricityPriceperUnit"
);
const ElectricityUnit2 = document.getElementById("editElectricityUnit");

//ค่าห้อง
const RoomPrice2 = document.getElementById("editRoomPrice");

//ค่าอื่นๆ
const OtherPrice2 = document.getElementById("editOtherPrice");

//รวมค่าไฟ
const totalwater2 = document.getElementById("edittotalwater");
//รวมค่าน้ำ
const totalElec2 = document.getElementById("edittotalElec");
//รวมค่าห้อง
const totalroom2 = document.getElementById("edittotalroom");
//รวมค่าอื่นๆ
const totalmore2 = document.getElementById("edittotalmore");
//รวมทั้งหมด
const totalfinal2 = document.getElementById("edittotalfinal");

function calPrice() {
  //คำนวนน้ำ

  const calwater =
    parseFloat(WaterUnit.value) * parseFloat(WaterPriceperUnit.value);
  const formatwater = new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(calwater);
  if (!calwater) {
    totalwater.innerText = 0;
  } else {
    totalwater.innerText = formatwater;
  }

  //คำนวนไฟ
  const calelec =
    (parseFloat(ElectricityUnit.value) -
      parseFloat(ElectricityPastUnit.value)) *
    parseFloat(ElectricityPriceperUnit.value);
  const formatcalelc = new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(calelec);

  if (!calelec) {
    totalElec.innerText = 0;
  } else {
    totalElec.innerText = formatcalelc;
  }

  //คำนวนห้อง
  const formatroom = new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(RoomPrice.value);
  totalroom.innerText = formatroom;

  //คำนวนอื่นๆ
  const formatmore = new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(OtherPrice.value);
  totalmore.innerText = formatmore;

  //คำนวนรวม
  const caltotal =
    parseFloat(totalwater.innerText.replace(",", "")) +
    parseFloat(totalElec.innerText.replace(",", "")) +
    parseFloat(totalroom.innerText.replace(",", "")) +
    parseFloat(totalmore.innerText.replace(",", ""));

  const formatcal = new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    roundingIncrement: 100,
  }).format(caltotal);

  totalfinal.innerText = formatcal;
}
//

function calPriceedit() {
  //คำนวนน้ำ

  const calwater =
    parseFloat(WaterUnit2.value) * parseFloat(WaterPriceperUnit2.value);
  const formatwater = new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(calwater);
  if (!calwater) {
    totalwater2.innerText = 0;
  } else {
    totalwater2.innerText = formatwater;
  }

  //คำนวนไฟ
  const calelec =
    (parseFloat(ElectricityUnit2.value) -
      parseFloat(ElectricityPastUnit2.value)) *
    parseFloat(ElectricityPriceperUnit2.value);
  const formatcalelc = new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(calelec);

  if (!calelec) {
    totalElec2.innerText = 0;
  } else {
    totalElec2.innerText = formatcalelc;
  }

  //คำนวนห้อง
  const formatroom = new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(RoomPrice2.value);
  totalroom2.innerText = formatroom;

  //คำนวนอื่นๆ
  const formatmore = new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(OtherPrice2.value);
  totalmore2.innerText = formatmore;

  //คำนวนรวม
  const caltotal =
    parseFloat(totalwater2.innerText.replace(",", "")) +
    parseFloat(totalElec2.innerText.replace(",", "")) +
    parseFloat(totalroom2.innerText.replace(",", "")) +
    parseFloat(totalmore2.innerText.replace(",", ""));

  const formatcal = new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    roundingIncrement: 100,
  }).format(caltotal);

  totalfinal2.innerText = formatcal;
}

//นำค่าน้ำค่าไฟ เข้าสู่ระบบ
document.getElementById("saveBill").addEventListener("click", function () {
  const month = document.getElementById("BillMonth").value;
  const year = document.getElementById("BillYear").value;
  const room = document.getElementById("RoomNumber").value;

  const roomnotNull = dataJson.filter((dataJson) => dataJson.RoomID == room)[0];

  const contactid = roomnotNull.ContactID;

  const data = {
    month: month,
    year: year,
    oldelec: ElectricityPastUnit.value,
    nowelec: ElectricityUnit.value,
    elecpiceper: ElectricityPriceperUnit.value,
    electotal: parseFloat(totalElec.innerText.replace(",", "")),
    waterunit: WaterUnit.value,
    waterprice: WaterPriceperUnit.value,
    watertotal: parseFloat(totalwater.innerText.replace(",", "")),
    other: parseFloat(totalmore.innerText.replace(",", "")),
    total: parseFloat(totalfinal.innerText.replace(",", "")),
    ContactID: contactid,
    roomid: room,
  };

  const checkfilter = billJson.filter(
    (bill) =>
      bill.RoomID == room && bill.BillYear == year && bill.BillMonth == month
  );

  if (checkfilter.length != 0) return alert("ห้องนี้ได้ออกบิลไปแล้ว");


  senddata(data);
  room.value = "";
  ElectricityUnit.value = "";

});

async function senddata(data) {
  const response = await fetch("http://20.187.73.118:3000/api/addBill", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log(JSON.stringify(data));
  const json = await response.json();
  alert("บันทึกบิลเรียบร้อย");
  getBill();
}




document.getElementById("saveeditBill").addEventListener("click", function () {
  const month = document.getElementById("editBillMonth").value;
  const year = document.getElementById("editBillYear").value;
  const room = document.getElementById("editRoomNumber").value;

  const roomnotNull = dataJson.filter((dataJson) => dataJson.RoomID == room)[0];

  const contactid = roomnotNull.ContactID;

  const checkfilter = billJson.filter(
    (bill) =>
      bill.RoomID == room && bill.BillYear == year && bill.BillMonth == month
  );

  const checkUUID = checkfilter[0].UnitID;



  const data = {
    month: month,
    year: year,
    oldelec: ElectricityPastUnit2.value,
    nowelec: ElectricityUnit2.value,
    elecpiceper: ElectricityPriceperUnit2.value,
    electotal: parseFloat(totalElec2.innerText.replace(",", "")),
    waterunit: WaterUnit2.value,
    waterprice: WaterPriceperUnit2.value,
    watertotal: parseFloat(totalwater2.innerText.replace(",", "")),
    other: parseFloat(totalmore2.innerText.replace(",", "")),
    total: parseFloat(totalfinal2.innerText.replace(",", "")),
    ContactID: contactid,
    roomid: room,
    billID: checkUUID
  };

  sendedit(data);

});

async function sendedit(data) {
  const response = await fetch("http://20.187.73.118:3000/api/editBill", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log(JSON.stringify(data));
  const json = await response.json();
  alert("แก้ไขบิลเรียบร้อย");
  getBill();
}

document.getElementById("savestatus").addEventListener("click", function () {
  const month = document.getElementById("monthSelect").value;
  const year = document.getElementById("yearSelect").value;
  const room = document.getElementById("roomSelect").value;
  const status = document.getElementById("Status").value;

  const checkfilter = billJson.filter(
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
  getBill();
}



// // function test(){
// //   window.jsPDF.html(document.getElementById("Home"), {
// //    callback: function (doc) {
// //      doc.save();
// //    },
// //    x: 10,
// //    y: 10
// // });
// // }

// // test()

// // import { font } from "./Kanit-Regular-normal.mjs";
// // const font = new FontFace("Kanit", "url(https://fonts.googleapis.com/css2?family=Kanit&display=swap)");
// function test() {
//   // Create a new jsPDF instance
//   window.jsPDF = window.jspdf.jsPDF({orientation:"landscape"});

//   // html2canvas(document.getElementById("Home")).then(function (canvas) {
//   //   const pdf = new window.jspdf.jsPDF("landscape", "mm", "a4");
//   //   const pdfWidth = 1920;
//   //   const pdfHeight = 297;
    
//   //   // Add the captured content to the PDF
//   //   pdf.addImage(canvas, "PNG", 0, 0, pdfWidth, pdfHeight);
    
//   //   // Save the PDF
//   //   pdf.save("landscape_pdf.pdf");
//   //   });

//   // add the font to jsPDF
//   // window.jsPDF.addFileToVFS("Kanit-Regular.ttf", font);
  
//   // window.jsPDF.addFont("Kanit-Regular.ttf", "Kanit", "normal");
//   // window.jsPDF.setFont("Kanit");

//   // Add content to the PDF
//   window.jsPDF.html(document.getElementById("Home"),{
//     callback: function (doc) {
      
//       doc.save();
//     },
//     width: 297 ,
//     windowWidth: 1920 ,
    
    
//   });

//   // Save the PDF
//   // window.jsPDF.save("example.pdf");
// };

// test();

