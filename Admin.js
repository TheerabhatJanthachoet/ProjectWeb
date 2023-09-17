var dataJson = {};
var datacontactJson = {};

//เลือกเฉพาะห้องที่ว่าง,ห้องแจ้งย้ายออก//

function CheckoutRoomNumberOptions() {
  const checkOutroomFloor = document.getElementById("checkoutFloor").value;
  setdatacheckout(dataJson, checkOutroomFloor);
}

async function getRoom() {
  const url = new URL("http://20.187.73.118/api/room")
  url.port = 3000 
  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
  dataJson = JSON.parse(data);
  setRoom(dataJson);
}

function setRoom(data) {
  const roomNull = data.filter((data) => data.Status == "ว่าง");

  const getRoomNullfilter = document.getElementById("roomNew");
  while (getRoomNullfilter.hasChildNodes()) {
    getRoomNullfilter.removeChild(getRoomNullfilter.firstChild);
  }
  roomNull.map((room) => {
    // สร้างตัวเลือก

    const row = document.createElement("option");
    row.value = room.RoomID;
    row.innerText = room.RoomID;
    getRoomNullfilter.appendChild(row);
  });
  getRoomNullfilter.firstChild.setAttribute("selected", true);

  
}
//จบเลือกเฉพาะห้องที่ว่าง,ห้องแจ้งย้ายออก//


function setdatacheckout(data, checkOutroomFloor) {
  const roomnotNull = data.filter((data) => data.RoomFloor == checkOutroomFloor && data.Status == "ไม่ว่าง");

  const getRoomnotNullfilter = document.getElementById("Roomcheckout");
  while (getRoomnotNullfilter.hasChildNodes()) {
    getRoomnotNullfilter.removeChild(getRoomnotNullfilter.firstChild);
  }
  roomnotNull.map((roomout) => {
    // สร้างตัวเลือก

    const row = document.createElement("option");
    row.value = roomout.RoomID;
    row.innerText = roomout.RoomID;
    getRoomnotNullfilter.appendChild(row);
  });
  getRoomnotNullfilter.firstChild.setAttribute("selected", true);

}

getRoom();

//เพิ่มสัญญา//
document.getElementById("savecontact").addEventListener("click", function () {
  // ดึงค่าข้อมูลที่กรอกในฟอร์มใน Modal มาเก็บในตัวแปร
  const roomNumber = document.getElementById("roomNew").value;
  const guestName = document.getElementById("GuestFirstname").value;
  const guestLastName = document.getElementById("Lastname").value;
  const guestCount = document.getElementById("Amount").value;
  const phone = document.getElementById("Phone").value;
  const dobdate = document.getElementById("DobDate").value;
  const dobsplit = dobdate.split("/");
  var dobformat = ""

  for(let i = dobsplit.length-1; i >=0 ; i-- ){
    dobformat+= dobsplit[i] + "-"

  }
  dobformat = dobformat.slice(0,dobformat.length-1)


  
  const idcard = document.getElementById("IDcard").value;
  const address = document.getElementById("Address").value;
  const contactdate = document.getElementById("Contactdate").value;
  const contactsplit = contactdate.split("/");
  var contactformat = "";

  for(let i = contactsplit.length-1; i >=0 ; i-- ){
    contactformat+= contactsplit[i] + "-"

  }
  contactformat = contactformat.slice(0,contactformat.length-1)
  
  const checkin = document.getElementById("Checkin").value;
  const checkinsplite = checkin.split("/")
  
  var checkinformat = ""

  for(let i = checkinsplite.length-1; i >=0 ; i-- ){
    checkinformat+= checkinsplite[i] + "-"

  }
  checkinformat = checkinformat.slice(0,checkinformat.length-1)

  const cartype = document.getElementById("CarType").value;
  const carid = document.getElementById("CarID").value;
  const contactpicInput = document.getElementById("contactpic");
  const contactpicFile = contactpicInput.files[0]; // เลือกไฟล์ที่ผู้ใช้เลือก (แนบมา)
  //เช็คว่ากรอกครบหรือยัง ไม่มีทะเบียนรถเพราะถ้าไม่มีรถไม่ต้องใส่


  console.log(dobformat);
  

  if (
    !roomNumber ||
    !guestName ||
    !guestLastName ||
    !guestCount ||
    !phone ||
    !dobformat ||
    !idcard ||
    !address ||
    !contactformat ||
    !checkinformat ||
    !cartype ||
    !contactpicFile
  ) {
    // แจ้งเตือนถ้าอยากให้มี popup เพิ่มทีหลัง
    alert("กรุณากรอกข้อมูลให้ครบยกเว้นทะเบียนรถ.");
    return;
  }
  // Check the file size (in bytes)
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  if (contactpicFile.size > maxFileSize) {
    alert("ไฟล์ต้องมีขนาดไม่เกิน 5MB");
    return;
  }


  // ส่งไฟล์รูปภาพที่เลือกไปยัง Backend ผ่าน FormData
  const formData = new FormData();
  formData.append("roomNumber", roomNumber);
  formData.append("guestName", guestName);
  formData.append("guestLastName", guestLastName);
  formData.append("guestCount", guestCount);
  formData.append("phone", phone);
  formData.append("dobdate", dobformat);
  formData.append("idcard", idcard);
  formData.append("address", address);
  formData.append("contactdate", contactformat);
  formData.append("checkin", checkinformat);
  formData.append("cartype", cartype);
  formData.append("carid", carid);
  formData.append("contactpic", contactpicFile); // แนบไฟล์รูปภาพ
  formData.append("filename", contactpicFile.name);

  sendcontact(formData)
});

async function sendcontact(formData){

  // ส่งค่าข้อมูลที่ได้ไปยัง Backend ผ่าน API พร้อมกับรูปภาพ
  const responsecontact =  await fetch("http://20.187.73.118:3000/api/contact", {
    method: "POST",
    body: formData,
  })
  const json = await responsecontact.json()  
  alert("เพิ่มสัญญาเช่าห้องพักเรียบร้อย");
  location.reload()
}
  
//จบเพิ่มสัญญา//

//แสดงออกมาในตาราง//
async function getcontact() {
  const res = await fetch("http://20.187.73.118:3000/api/getcontact", {
    method: "GET",
  });
  const datacontact = await res.json();
  datacontactJson = JSON.parse(datacontact);
  setContact(JSON.parse(datacontact));
}

function setContact(data) {
  const tableList = document.getElementById("tableListBody");

  data.map((contact) => {
    // สร้างแถวของตาราง
    
    const row = document.createElement("tr");
    const dobdate = new Date(contact.Guestdob);
    const dobdateformat = dobdate.toLocaleString("en-GB", {
      dateStyle: "short",
    });

    const contactdate = new Date(contact.ContactDate);
    const contactdateformat = contactdate.toLocaleString("en-GB", {
      dateStyle: "short",
    });

    const CheckIndate = new Date(contact.CheckIn);
    const CheckIndateformat = CheckIndate.toLocaleString("en-GB", {
      dateStyle: "short",
    });

    let CheckOutdateformat = ""

    if (contact.CheckOut) {
      const CheckOutdate = new Date(contact.CheckOut);
      CheckOutdateformat = CheckOutdate.toLocaleString("en-GB", {
        dateStyle: "short",
      });  
    }
    

    const nowdate = new Date()
    const mildate = contactdate.getTime()
    const milnow = nowdate.getTime()
    const difTime = (mildate + 15778800000) - milnow 
    let diftotal = Math.floor((((difTime / 1000) / 60**2) / 24) / 30)

   
    if(diftotal <= 0){
      diftotal = "อยู่ครบสัญญาเช่า"
    }
    else{
       diftotal = diftotal.toString() + " เดือน"
    }
    
    
    row.innerHTML = `
      <td class="text-center">${contact.RoomID}</td>
      <td class="text-center">${contact.GuestFirstname}</td>
      <td class="text-center">${contact.GuestLastname}</td>
      <td class="text-center">${contact.GuestCount}</td>
      <td class="text-center">${contact.GuestTel}</td>
      <td class="text-center">${dobdateformat}</td>
      <td class="text-center">${contact.IDCard}</td>
      <td class="text-left">${contact.GuestAddress}</td>
      <td class="text-center">${contactdateformat}</td>
      <td class="text-center">${diftotal}</td>
      <td class="text-center">${CheckIndateformat}</td>
      <td class="text-center">${CheckOutdateformat}</td>
      <td class="text-center">${contact.VehicleType}</td>
      <td class="text-center">${contact.VehicleRegis}</td>
      <td class="text-left"><a href="${"http://20.187.73.118:3000/"+contact.ContactPicture}">${contact.ContactPicture.split("/")[1]}</a></td>    
      
      `;
    // เพิ่มแถวลงในตาราง
    tableList.appendChild(row);
  });
}
//จบแสดงออกมาในตาราง//

getcontact();


//เช็คเอาท์สัญญา//
document.getElementById("Checkoutsave").addEventListener("click", function () {
  // ดึงค่าข้อมูลที่กรอกในฟอร์มใน Modal มาเก็บในตัวแปร
  const roomNumber = document.getElementById("Roomcheckout").value;
  const checkout = document.getElementById("Checkout").value;

  const checkoutdata = {
    roomNumber: roomNumber,
    checkout: checkout
  }
  sendcheckout(checkoutdata)
});

async function sendcheckout(checkoutdata){
  const responsecheckout =  await fetch("http://20.187.73.118:3000/api/checkoutcontact", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      roomNumber: checkoutdata.roomNumber,
      checkout: checkoutdata.checkout
    }),
  });
  const json = await responsecheckout.json()
  alert("แจ้งย้ายออกเรียบร้อย");
  location.reload()
}
//จบเพิ่มสัญญา//



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
      table.append(rows[i]);
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