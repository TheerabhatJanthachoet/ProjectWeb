var dataJson = {};
var datacontactJson = {};

//เลือกเฉพาะห้องที่ว่าง,ห้องแจ้งย้ายออก//

function CheckoutRoomNumberOptions() {
  const checkOutroomFloor = document.getElementById("checkoutFloor").value;
  setdatacheckout(dataJson, checkOutroomFloor);
}

async function getRoom() {
  const url = new URL("http://20.212.12.36/api/room")
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
  const idcard = document.getElementById("IDcard").value;
  const address = document.getElementById("Address").value;
  const contactdate = document.getElementById("Contactdate").value;
  const checkin = document.getElementById("Checkin").value;
  const cartype = document.getElementById("CarType").value;
  const carid = document.getElementById("CarID").value;
  const contactpicInput = document.getElementById("contactpic");
  const contactpicFile = contactpicInput.files[0]; // เลือกไฟล์ที่ผู้ใช้เลือก (แนบมา)
  //เช็คว่ากรอกครบหรือยัง ไม่มีทะเบียนรถเพราะถ้าไม่มีรถไม่ต้องใส่
  if (
    !roomNumber ||
    !guestName ||
    !guestLastName ||
    !guestCount ||
    !phone ||
    !dobdate ||
    !idcard ||
    !address ||
    !contactdate ||
    !checkin ||
    !cartype ||
    !contactpicFile
  ) {
    // แจ้งเตือนถ้าอยากให้มี popup เพิ่มทีหลัง
    alert("กรุณากรอกข้อมูลให้ครบยกเว้นทะเบียนรถ.");
    return;
  }


  // ส่งไฟล์รูปภาพที่เลือกไปยัง Backend ผ่าน FormData
  const formData = new FormData();
  formData.append("roomNumber", roomNumber);
  formData.append("guestName", guestName);
  formData.append("guestLastName", guestLastName);
  formData.append("guestCount", guestCount);
  formData.append("phone", phone);
  formData.append("dobdate", dobdate);
  formData.append("idcard", idcard);
  formData.append("address", address);
  formData.append("contactdate", contactdate);
  formData.append("checkin", checkin);
  formData.append("cartype", cartype);
  formData.append("carid", carid);
  formData.append("contactpic", contactpicFile); // แนบไฟล์รูปภาพ
  formData.append("filename", contactpicFile.name);

  // ส่งค่าข้อมูลที่ได้ไปยัง Backend ผ่าน API พร้อมกับรูปภาพ
  fetch("http://20.212.12.36:3000/api/contact", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // กระทำอื่นๆ หลังจากบันทึกสัญญาสำเร็จ
      console.log("บันทึกข้อมูลสัญญาเรียบร้อยแล้ว");
    })
    .catch((error) => {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูลสัญญา:", error);
    });
  location.reload()
});
//จบเพิ่มสัญญา//

//แสดงออกมาในตาราง//
async function getcontact() {
  const res = await fetch("http://20.212.12.36:3000/api/getcontact", {
    method: "GET",
  });
  const datacontact = await res.json();
  datacontactJson = JSON.parse(datacontact);
  setContact(JSON.parse(datacontact));
}

function setContact(data) {
  const tableList = document.getElementById("tableList");

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
    console.log(contact.ContactPicture)

    
    row.innerHTML = `
      <td class="text-center">${contact.RoomID}</td>
      <td class="text-center">${contact.GuestFirstname}</td>
      <td class="text-center">${contact.GuestLastname}</td>
      <td class="text-center">${contact.GuestCount}</td>
      <td class="text-center">${contact.GuestTel}</td>
      <td class="text-center">${dobdateformat}</td>
      <td class="text-center">${contact.IDCard}</td>
      <td class="text-center">${contact.GuestAddress}</td>
      <td class="text-center">${contactdateformat}</td>
      <td class="text-center">${CheckIndateformat}</td>
      <td class="text-center">${CheckOutdateformat}</td>
      <td class="text-center">${contact.VehicleType}</td>
      <td class="text-center">${contact.VehicleRegis}</td>
      <td class="text-center"><a href="${"http://20.212.12.36:3000/"+contact.ContactPicture}">${contact.ContactPicture.split("/")[1]}</a></td>    
      
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
  
  fetch("http://20.212.12.36:3000/api/checkoutcontact", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      roomNumber: roomNumber,
      checkout: checkout
    }),
  });
  location.reload()
});
//จบเพิ่มสัญญา//