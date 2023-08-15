var cors = require("cors");

const express = require("express");
const app = express();
const port = 3000;

const path = require("path");

const multer = require("multer"); // นำเข้าโมดูล multer เพื่อจัดการไฟล์ที่ถูกแนบมา
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/uploads/")); // กำหนดตำแหน่งที่จะเก็บไฟล์รูปภาพที่แนบมา
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // กำหนดชื่อไฟล์ใหม่ที่จะถูกบันทึกเก็บ
  },
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/contact", upload.single("contactpic"), async (req, res) => {
  const contact = req.body;
  // เรียกใช้ฟังก์ชัน addContact โดยแนบชื่อไฟล์รูปภาพที่อยู่ใน req.file.filename ที่เป็นส่วนของ multer
  await addContact(
    contact.roomNumber,
    contact.guestName,
    contact.guestLastName,
    contact.guestCount,
    contact.phone,
    contact.dobdate,
    contact.idcard,
    contact.address,
    contact.contactdate,
    contact.checkin,
    contact.cartype,
    contact.carid,
    contact.filename
  );
  res.json({ message: "success" });
});

app.post("/api/checkoutcontact", async (req, res) => {
  const checkOut = req.body;
  console.log(checkOut);
  await UpdateContact(checkOut.roomNumber, checkOut.checkout);
  res.json({ message: "success" });
});

app.get("/api/getcontact", async (req, res) => {
  const contacts = await getContact();

  res.json(JSON.stringify(contacts));
});

app.post("/api/room", async (req, res) => {
  const data = req.body;
  await addRoom(
    data.roomNumber,
    data.roomFloor,
    data.roomType,
    data.price,
    data.guestName,
    data.guestLastName,
    data.guestCount,
    data.electricityUnit,
    data.status
  );
  res.json({ message: "success" });
});

app.post("/api/editroom", async (req, res) => {
  const data = req.body;

  await updateRoom(
    data.roomNumber,
    data.roomType,
    data.price,
    data.guestName,
    data.guestLastName,
    data.guestCount,
    data.electricityUnit,
    data.status
  );
  res.json({ message: "success" });
});

app.get("/api/room", async (req, res) => {
  const rooms = await getRoom();

  res.json(JSON.stringify(rooms));
});

app.post("/api/addBill", async (req, res) => {
  const bill = req.body;

  await addBill(bill);

  res.json(JSON.stringify(bill));
});

app.post("/api/editBill", async (req, res) => {
  const bill = req.body;

  await editBill(bill);

  res.json(JSON.stringify(bill));
});

app.get("/api/getbill", async (req, res) => {
  const bills = await getBill();

  res.json(JSON.stringify(bills));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 1. สร้างการเชื่อมต่อกับฐานข้อมูล SQL ใน Azure
const config = {
  server: "wasinserver.database.windows.net",
  database: "wasinwebthai",
  authentication: {
    type: "default",
    options: {
      userName: "wasinadmin",
      password: "@wasin1234",
    },
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

var sql;

// 2. โหลดและใช้งานโมดูล mssql โดยใช้โครงสร้าง AMD
if (typeof require !== "undefined") {
  sql = require("mssql");
}

// 3. เขียนฟังก์ชันสำหรับบันทึกข้อมูลห้องพักใหม่
async function addRoom(
  roomNumber,
  roomFloor,
  roomType,
  price,
  guestName,
  guestLastName,
  guestCount,
  electricityUnit,
  status
) {
  try {
    await sql.connect(config);

    const query = `
        INSERT INTO Rooms (RoomID, RoomFloor, RoomType, RoomPrice, NameGuest, LNameGuest, RoomCount, ElecUnit, Status)
        VALUES ('${parseInt(roomNumber)}', 
        '${parseInt(roomFloor)}', 
        '${roomType}', 
        '${parseFloat(price)}', 
        '${guestName}', 
        '${guestLastName}', 
        '${parseInt(guestCount)}',
        '${parseFloat(electricityUnit)}',
        '${status}')
        `;

    await sql.query(query);

    console.log("บันทึกข้อมูลห้องพักเรียบร้อยแล้ว");

    // ปิดการเชื่อมต่อ
    sql.close();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูลห้องพัก:", error);
  }
}

async function updateRoom(
  roomNumber,
  roomType,
  price,
  guestName,
  guestLastName,
  guestCount,
  electricityUnit,
  status
) {
  try {
    await sql.connect(config);

    const query = `
        UPDATE Rooms SET 
        RoomType = '${roomType}', 
        RoomPrice = '${parseFloat(price)}',
        NameGuest = '${guestName}',
        LNameGuest = '${guestLastName}',
        RoomCount = '${parseInt(guestCount)}',
        ElecUnit = '${parseFloat(electricityUnit)}',
        Status = '${status}'
        WHERE RoomID = '${parseInt(roomNumber)}'`;

    await sql.query(query);

    console.log("บันทึกข้อมูลห้องพักเรียบร้อยแล้ว");

    // ปิดการเชื่อมต่อ
    sql.close();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูลห้องพัก:", error);
  }
}

async function getRoom() {
  try {
    await sql.connect(config);

    const query = "SELECT * FROM Rooms";

    const result = await sql.query(query);
    const rooms = result.recordset;

    return rooms;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลห้องพัก:", error);
  } finally {
    if (sql) {
      sql.close();
    }
  }
}

async function getBill() {
  try {
    await sql.connect(config);

    const query = "SELECT * FROM Bill";

    const result = await sql.query(query);
    const bills = result.recordset;

    return bills;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลบิล:", error);
  } finally {
    if (sql) {
      sql.close();
    }
  }
}

async function editBill(bill) {
  try {
    await sql.connect(config);

    const query = `
    UPDATE Bill
    SET 
        BillMonth = '${bill.month}', 
        BillYear = '${bill.year}', 
        OldElecUnit = '${parseFloat(bill.oldelec)}', 
        NowElecUnit = '${parseFloat(bill.nowelec)}', 
        ElectricPriceperUnit = '${parseFloat(bill.elecpiceper)}', 
        ElectricitytotalPrice = '${parseFloat(bill.electotal)}',
        WaterUnit = '${parseFloat(bill.waterunit)}',
        WaterPrice = '${parseFloat(bill.waterprice)}', 
        Watertotalprice = '${parseFloat(bill.watertotal)}', 
        Other = '${parseFloat(bill.other)}',
        TotalPrice = '${parseFloat(bill.total)}'
        WHERE UnitID = '${bill.checkUUID}'    
        `;
    await sql.query(query);

    const query2 = `
        UPDATE Rooms SET 
        ElecUnit = '${parseFloat(bill.nowelec)}'
        WHERE RoomID = '${parseInt(bill.roomid)}'`;

    await sql.query(query2);
    console.log("บันทึกข้อมูลบิลเรียบร้อยแล้ว");

    // ปิดการเชื่อมต่อ
    sql.close();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการบันทึกบิล:", error);
  }
}
//เพิ่มสัญญา + แก้ไขข้อมูลห้อง//

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

async function addContact(
  roomNumber,
  guestName,
  guestLastName,
  guestCount,
  phone,
  dobdate,
  idcard,
  address,
  contactdate,
  checkin,
  cartype,
  carid,
  filename
) {
  try {
    await sql.connect(config);

    const contactID = uuidv4();
    const fullfilename = "uploads/" + filename;

    const query1 = `
    INSERT INTO Contact (ContactID, RoomID, GuestFirstname, GuestLastname, GuestCount, GuestTel, Guestdob, IDCard, GuestAddress, ContactDate, CheckIn, VehicleType, VehicleRegis, ContactPicture)
    VALUES ('${contactID}', '${roomNumber}', '${guestName}', '${guestLastName}', ${guestCount}, '${phone}', '${dobdate}', '${idcard}', '${address}', '${contactdate}', '${checkin}', '${cartype}', '${carid}', '${fullfilename}')
    `;

    await sql.query(query1);

    const query2 = `
        UPDATE Rooms SET 
        NameGuest = '${guestName}',
        LNameGuest = '${guestLastName}',
        RoomCount = '${parseInt(guestCount)}',
        Status = 'ไม่ว่าง',
        ContactID = '${contactID}'
        WHERE RoomID = '${parseInt(roomNumber)}'`;

    await sql.query(query2);

    console.log("บันทึกข้อมูลสัญญาเรียบร้อยแล้ว");

    // ปิดการเชื่อมต่อ
    sql.close();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูลสัญญา:", error);
  }
}
//จบเพิ่มสัญญา + แก้ไขข้อมูลห้อง//

//ดึงข้อมูลสัญญา
async function getContact() {
  try {
    await sql.connect(config);

    const query = "SELECT * FROM Contact";

    const result = await sql.query(query);
    const contacts = result.recordset;

    return contacts;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสัญญา:", error);
  } finally {
    if (sql) {
      sql.close();
    }
  }
}
//จบดึงข้อมูลสัญญา//

async function UpdateContact(roomNumber, checkout) {
  try {
    await sql.connect(config);

    const query1 = `
    UPDATE Contact
    SET CheckOut = '${checkout}'
    WHERE ContactID IN (
        SELECT ContactID
        FROM Rooms
        WHERE RoomID = '${parseInt(roomNumber)}')`;

    await sql.query(query1);

    const query2 = `
    UPDATE Rooms SET 
    NameGuest = '',
    LNameGuest = '',
    RoomCount = '',
    Status = 'ว่าง',
    ContactID = NULL
    WHERE RoomID = '${parseInt(roomNumber)}'`;

    await sql.query(query2);

    console.log("บันทึกข้อมูลสัญญาเรียบร้อยแล้ว");

    // ปิดการเชื่อมต่อ
    sql.close();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูลสัญญา:", error);
  }
}

async function addBill(bill) {
  try {
    await sql.connect(config);
    const BillID = uuidv4();
    const query = `
        INSERT INTO Bill (UnitID, BillMonth, BillYear, OldElecUnit, NowElecUnit, ElectricPriceperUnit, ElectricitytotalPrice, WaterUnit,WaterPrice,Watertotalprice,Other,TotalPrice, Billstatus,ContactID,RoomID)
        VALUES ('${BillID}', 
        '${bill.month}', 
        '${bill.year}', 
        '${parseFloat(bill.oldelec)}', 
        '${parseFloat(bill.nowelec)}', 
        '${parseFloat(bill.elecpiceper)}', 
        '${parseFloat(bill.electotal)}',
        '${parseInt(bill.waterunit)}',
        '${parseFloat(bill.waterprice)}', 
        '${parseFloat(bill.watertotal)}', 
        '${parseFloat(bill.other)}',
        '${parseFloat(bill.total)}',
        'ยังไม่ชำระ',
        '${bill.ContactID}',
        '${parseInt(bill.roomid)}'   
        )
        `;
    await sql.query(query);

    const query2 = `
        UPDATE Rooms SET 
        ElecUnit = '${parseFloat(bill.nowelec)}'
        WHERE RoomID = '${parseInt(bill.roomid)}'`;

    await sql.query(query2);
    console.log("บันทึกข้อมูลบิลเรียบร้อยแล้ว");

    // ปิดการเชื่อมต่อ
    sql.close();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการบันทึกบิล:", error);
  }
}
module.exports = app;
