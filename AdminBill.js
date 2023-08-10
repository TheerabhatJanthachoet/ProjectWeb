var dataJson = {};
var datacontactJson = {};


//เลือกเฉพาะห้องที่ว่าง,ห้องแจ้งย้ายออก//

function SelectRoomfloorOption() {
  const checkOutroomFloor = document.getElementById("Floor").value;

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
  const roomNull = data.filter((data) => data.Status == "ไม่ว่าง");

  const getRoomNullfilter = document.getElementById("RoomNumber");
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


