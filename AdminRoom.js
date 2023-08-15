var dataJson = {};

// เพิ่มห้อง
document.getElementById("saveButton").addEventListener("click", async function () {
  const roomNumber = document.getElementById("roomNumber").value;
  const roomFloor = document.getElementById("roomFloor").value;
  const roomType = document.getElementById("roomType").value;
  const price = document.getElementById("price").value;
  const guestName = document.getElementById("guestName").value;
  const guestLastName = document.getElementById("guestLastName").value;
  const guestCount = document.getElementById("guestCount").value;
  const electricityUnit = document.getElementById("electricityUnit").value;
  const status = document.getElementById("status").value;

  const dataadd = {
    roomNumber: roomNumber,
    roomFloor: roomFloor,
    roomType: roomType,
    price: price,
    guestName: guestName,
    guestLastName: guestLastName,
    guestCount: guestCount,
    electricityUnit: electricityUnit,
    status: status,
  }

  sendroom(dataadd)
});

async function sendroom(dataadd){
  const response2 =  await fetch("http://20.212.12.36:3000/api/room", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      roomNumber: dataadd.roomNumber,
      roomFloor:  dataadd.roomFloor,
      roomType:  dataadd.roomType,
      price:  dataadd.price,
      guestName:  dataadd.guestName,
      guestLastName:  dataadd.guestLastName,
      guestCount:  dataadd.guestCount,
      electricityUnit: dataadd.electricityUnit,
      status:  dataadd.status,
      }),
    });
  const json = await response2.json()  
  location.reload()
}


//

// แก้ไขห้อง
document
  .getElementById("editButton")
  .addEventListener("click",  function () {
    const roomNumber = document.getElementById("editroomNumber").value;
    const roomType = document.getElementById("editroomType").value;
    const price = document.getElementById("editprice").value;
    const guestName = document.getElementById("editguestName").value;
    const guestLastName = document.getElementById("editguestLastName").value;
    const guestCount = document.getElementById("editguestCount").value;
    const electricityUnit = document.getElementById("editelectricityUnit").value;
    const status = document.getElementById("editstatus").value;

    
    const data = {
        roomNumber: roomNumber,
        roomType: roomType,
        price: price,
        guestName: guestName,
        guestLastName: guestLastName,
        guestCount: guestCount,
        electricityUnit: electricityUnit,
        status: status,
      }
    
    senddata(data)
    
    
  });

async function getRoom() {
  const res = await fetch("http://20.212.12.36:3000/api/room", {
    method: "GET",
  });
  const data = await res.json();
  dataJson = JSON.parse(data);
  setdata(JSON.parse(data));
  setdataRoom(dataJson, 1);
}
function setdata(data) {
  const tableList = document.getElementById("tableList");

  data.map((room) => {
    // สร้างแถวของตาราง

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${room.RoomID}</td>
      <td>${room.RoomFloor}</td>
      <td>${room.RoomType}</td>
      <td>${room.RoomPrice}</td>
      <td>${room.NameGuest}</td>
      <td>${room.LNameGuest}</td>
      <td>${room.RoomCount}</td>
      <td class="status">${room.Status}</td>
      `;
    // เพิ่มแถวลงในตาราง
    tableList.appendChild(row);
  });
}

// GET เลขห้องจาก ชั้น
function setdataRoom(data, roomFloorId) {
  const roomFloor = data.filter((data) => data.RoomFloor == roomFloorId);

  const getRoomIDfilter = document.getElementById("editroomNumber");
  while (getRoomIDfilter.hasChildNodes()) {
    getRoomIDfilter.removeChild(getRoomIDfilter.firstChild);
  }
  roomFloor.map((room) => {
    // สร้างตัวเลือก

    const row = document.createElement("option");
    row.value = room.RoomID;
    row.innerText = room.RoomID;
    getRoomIDfilter.appendChild(row);
  });
  getRoomIDfilter.firstChild.setAttribute("selected",true)
}

function updateRoomNumberOptions() {
  const editroomFloor = document.getElementById("editroomFloor").value;
  setdataRoom(dataJson, editroomFloor);
}
//

getRoom();


async function senddata(data){
  const response =  await fetch("http://20.212.12.36:3000/api/editroom", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        roomNumber: data.roomNumber,
        roomType: data.roomType,
        price: data.price,
        guestName: data.guestName,
        guestLastName: data.guestLastName,
        guestCount: data.guestCount,
        electricityUnit: data.electricityUnit,
        status: data.status,
      }),
    });
  const json = await response.json()  
  location.reload()
}