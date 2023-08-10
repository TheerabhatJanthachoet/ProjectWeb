var dataJson = {};
var datacontactJson = {};


//เลือกเฉพาะห้องที่ว่าง,ห้องแจ้งย้ายออก//

function SelectRoomfloorOption() {
  const checkFloor = document.getElementById("Floor").value;
  
  setdatacheck(dataJson, checkFloor);
  setName()
}

async function getRoom() {
  const url = new URL("http://20.212.12.36/api/room")
  url.port = 3000 
  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
  dataJson = JSON.parse(data);

}

// function setdata(data) {
//   const guestName = document.getElementById("GuestFirstname").room.NameGuest;
  
// }

function setdatacheck(data, checkFloor) {
  const roomnotNull = data.filter((data) => data.RoomFloor == checkFloor && data.Status == "ไม่ว่าง");
  console.log(roomnotNull)
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
  console.log(roomnotNull)
 
  const GuestFirstname = document.getElementById("GuestFirstname");
  const GuestLastname = document.getElementById("GuestLastname");
  const RoomPrice = document.getElementById("RoomPrice");

  if (!roomnotNull){
      GuestFirstname.value = ''
      GuestLastname.value = ''
      RoomPrice.value = ''
      return
  }
  GuestFirstname.value = roomnotNull.NameGuest
  GuestLastname.value = roomnotNull.LNameGuest
  RoomPrice.value = roomnotNull.RoomPrice

}

getRoom();
