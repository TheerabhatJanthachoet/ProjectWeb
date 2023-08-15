var dataJson = {};
var billJson = {};
var datacontactJson = {};
var calwater = 0
var calelec = 0
var caltotal =0

//เลือกเฉพาะห้องที่ว่าง,ห้องแจ้งย้ายออก//

function SelectRoomfloorOption() {
  const checkFloor = document.getElementById("Floor").value;
  
  setdatacheck(dataJson, checkFloor);
  setName()
  calPrice()
}


// Get ห้อง
async function getRoom() {
  const url = new URL("http://20.212.12.36/api/room")
  url.port = 3000 
  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
  dataJson = JSON.parse(data);

}

//Get บิล
async function getBill() {
  const url = new URL("http://20.212.12.36/api/getbill")
  url.port = 3000 
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
  const roomnotNull = data.filter((data) => data.RoomFloor == checkFloor && data.Status == "ไม่ว่าง");
  
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
  if (getRoomnotNullfilter.hasChildNodes()){
    getRoomnotNullfilter.firstChild.setAttribute("selected", true);
  }
}

function setName() {
  const checkroom = document.getElementById("RoomNumber").value;
  const roomnotNull = dataJson.filter((dataJson) => dataJson.RoomID == checkroom)[0];
  
  const GuestFirstname = document.getElementById("GuestFirstname");
  const GuestLastname = document.getElementById("GuestLastname");
  const waterUnit = document.getElementById("WaterUnit");
  const RoomPrice = document.getElementById("RoomPrice");
  const elecold = document.getElementById("ElectricityPastUnit");
  if (!roomnotNull){
      GuestFirstname.value = ''
      GuestLastname.value = ''
      RoomPrice.value = ''
      waterUnit.value = ""
      elecold.value = ''

      return
  }
  GuestFirstname.value = roomnotNull.NameGuest
  GuestLastname.value = roomnotNull.LNameGuest
  RoomPrice.value = roomnotNull.RoomPrice
  waterUnit.value = roomnotNull.RoomCount
  elecold.value = roomnotNull.ElecUnit
  
  ElectricityUnit.value = ""
  
  OtherPrice.value = 0
  calPrice()
}

function setdatabillcheck(data) {
  const edityear = data;
  
  const getBillYear = document.getElementById("editBillYear");
 


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
  if (getBillYear.hasChildNodes()){
    getBillYear.firstChild.setAttribute("selected", true);
  }
    
  // เริ่มต้นด้วยการรับ element ของ select ที่ต้องการกรอง
  const selectElement = document.getElementById("editBillYear");

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
  uniqueValues.forEach(value => {
      const optionElement = document.createElement("option");
      optionElement.value = value;
      optionElement.textContent = value;
      selectElement.appendChild(optionElement);
  });
}

function SetMonthYear(data, year) {

  
  const editmonth = document.getElementById("editBillMonth").value;
  const month = billJson.filter((billJson) => billJson.year == year)[0];
  
  while (editmonth.hasChildNodes()) {
    editmonth.removeChild(editmonth.firstChild);
  }
  month.map((month) => {
    // สร้างตัวเลือก
    // GuestFirstname.appendChild(roomout)
    const row = document.createElement("option");
    row.value = month.BillMonth;
    row.innerText = month.BillMonth;
    editmonth.appendChild(row);
  });
  if (editmonth.hasChildNodes()){
    editmonth.firstChild.setAttribute("selected", true);
  }
    
  // เริ่มต้นด้วยการรับ element ของ select ที่ต้องการกรอง
  const selectElement = document.getElementById("editBillMonth");

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
  uniqueValues.forEach(value => {
      const optionElement = document.createElement("option");
      optionElement.value = value;
      optionElement.textContent = value;
      selectElement.appendChild(optionElement);
  });
}

getRoom();
getBill();

//คำนวนค่าน้ำค่าไฟ

// ค่าน้ำ
const WaterPriceperUnit = document.getElementById("WaterPriceperUnit");
const WaterUnit = document.getElementById("WaterUnit");

//ค่าไฟ
const ElectricityPastUnit = document.getElementById("ElectricityPastUnit");
const ElectricityPriceperUnit = document.getElementById("ElectricityPriceperUnit");
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

function calPrice(){

  //คำนวนน้ำ
  
  const calwater = parseFloat(WaterUnit.value)*parseFloat(WaterPriceperUnit.value)
  const formatwater = new Intl.NumberFormat("th-TH",{ maximumFractionDigits: 2 , minimumFractionDigits:2}).format(calwater);
  if(!calwater){
    totalwater.innerText = 0
  }
  else{
    totalwater.innerText = formatwater
  }
  
  //คำนวนไฟ
  const calelec = (parseFloat(ElectricityUnit.value)-parseFloat(ElectricityPastUnit.value))*parseFloat(ElectricityPriceperUnit.value)
  const formatcalelc = new Intl.NumberFormat("th-TH",{ maximumFractionDigits: 2 , minimumFractionDigits:2}).format(calelec);
  
  if(!calelec){
    totalElec.innerText = 0
  }
  else{
    totalElec.innerText = formatcalelc
  }


  //คำนวนห้อง
  const formatroom = new Intl.NumberFormat("th-TH",{ maximumFractionDigits: 2 , minimumFractionDigits:2}).format(RoomPrice.value);
  totalroom.innerText = formatroom
  

  //คำนวนอื่นๆ
  const formatmore = new Intl.NumberFormat("th-TH",{ maximumFractionDigits: 2 , minimumFractionDigits:2}).format(OtherPrice.value);
  totalmore.innerText = formatmore
  


  //คำนวนรวม
  const caltotal = parseFloat(totalwater.innerText.replace(",",""))+parseFloat(totalElec.innerText.replace(",",""))+parseFloat(totalroom.innerText.replace(",",""))+parseFloat(totalmore.innerText.replace(",",""))
  
  const formatcal = new Intl.NumberFormat("th-TH",{ maximumFractionDigits: 2 , minimumFractionDigits:2 ,roundingIncrement:100}).format(caltotal);

  totalfinal.innerText = formatcal
 
  

}
//

//นำค่าน้ำค่าไฟ เข้าสู่ระบบ
document.getElementById("saveBill")
  .addEventListener("click",  function () {
    const month = document.getElementById("BillMonth").value;
    const year = document.getElementById("BillYear").value;
    const room = document.getElementById("RoomNumber").value;
    
    
    const roomnotNull = dataJson.filter((dataJson) => dataJson.RoomID == room)[0];
   
    const contactid = roomnotNull.ContactID
    
    const data = {
        month: month,
        year: year,
        oldelec: ElectricityPastUnit.value,
        nowelec: ElectricityUnit.value,
        elecpiceper: ElectricityPriceperUnit.value,
        electotal : parseFloat(totalElec.innerText.replace(",","")),
        waterunit : WaterUnit.value,
        waterprice : WaterPriceperUnit.value,
        watertotal : parseFloat(totalwater.innerText.replace(",","")),
        other : parseFloat(totalmore.innerText.replace(",","")),
        total : parseFloat(totalfinal.innerText.replace(",","")),
        ContactID : contactid,
        roomid : room
      }
    senddata(data)
    
    
    
  });

async function senddata(data){

  const response = await fetch("http://20.212.12.36:3000/api/addBill", {
    headers : { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data)
   
  })
  console.log(JSON.stringify(data))
  const json = await response.json()  
  alert("บันทึกบิลเรียบร้อย")
}


function SelectBillYear() {
  const getBillYear = document.getElementById("editBillYear").value;
  SetMonthYear(billJson, getBillYear);
}