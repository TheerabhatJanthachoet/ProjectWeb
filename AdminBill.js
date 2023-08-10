var dataJson = {};
var datacontactJson = {};


//เลือกเฉพาะห้องที่ว่าง,ห้องแจ้งย้ายออก//

function SelectRoomfloorOption() {
  const checkOutroomFloor = document.getElementById("Floor").value;
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
  
}
function setdatacheckout(data, checkOutroomFloor) {
  const roomnotNull = data.filter((data) => data.RoomFloor == checkOutroomFloor && data.Status == "ไม่ว่าง");

  const getRoomnotNullfilter = document.getElementById("RoomNumber");
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
