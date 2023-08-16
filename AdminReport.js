var reportJson = {};


// function SelectYearReport() {
//     const reportYear = document.getElementById("selectYear").value;
  
//     setdatabill(reportJson, reportYear);
// }

//Get report

async function getReport() {
    const url = new URL("http://20.187.73.118:3000/api/getreport");
    url.port = 3000;    
    const res = await fetch(url, {
      method: "GET",
    });
    const bill = await res.json();
    reportJson = JSON.parse(bill);
    setdata(reportJson);
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


// function setdataReportCheck(data) {
//     const reportyear = data;
  
//     const getReportYear = document.getElementById("selectYear");
  
//     while (getReportYear.hasChildNodes()) {
//         getReportYear.removeChild(getReportYear.firstChild);
//     }
//     reportyear.map((year) => {
//       // สร้างตัวเลือก
//       // GuestFirstname.appendChild(roomout)
//       const row = document.createElement("option");
//       row.value = year.BillYear;
//       row.innerText = year.BillYear;
//       getReportYear.appendChild(row);
//     });
//     if (getReportYear.hasChildNodes()) {
//         getReportYear.firstChild.setAttribute("selected", true);
//     }
  
//     // เริ่มต้นด้วยการรับ element ของ select ที่ต้องการกรอง
//     const selectElement = document.getElementById("selectYear");
  
//     // สร้างอาร์เรย์เพื่อเก็บค่าตัวเลือกที่ไม่ซ้ำกัน
//     const uniqueValues = [];
  
//     // วิธีการกรอง
//     for (let i = 0; i < selectElement.options.length; i++) {
//       const optionValue = selectElement.options[i].value;
  
//       // ถ้ายังไม่มีค่าในอาร์เรย์ uniqueValues
//       if (uniqueValues.indexOf(optionValue) === -1) {
//         uniqueValues.push(optionValue);
//       }
//     }
  
//     // ลบตัวเลือกทั้งหมดใน select
//     selectElement.innerHTML = "";
  
//     // เพิ่มตัวเลือกที่ไม่ซ้ำกันลงใน select ใหม่
//     uniqueValues.forEach((value) => {
//       const optionElement = document.createElement("option");
//       optionElement.value = value;
//       optionElement.textContent = value;
//       selectElement.appendChild(optionElement);
//     });
//     SelectYearReport();
// }
