
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ========================
// MySQL Connection
// ========================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",          // your MySQL username
  password: "192837465Sinlam@",          // your MySQL password
  database: "cloudfarm",
  port: 3307
});

db.connect(err => {
  if (err) console.error("DB Connection Failed:", err);
  else console.log("✅ Connected to MySQL Database!");
});

// ========================
// FARMER CRUD
// ========================
app.get("/farmer", (req, res) => {
  db.query("SELECT * FROM farmer", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/farmer", (req, res) => {
  const { farmer_name, farmer_phn, farmer_add, farm_type } = req.body;
  db.query(
    "INSERT INTO farmer (farmer_name, farmer_phn, farmer_add, farm_type) VALUES (?, ?, ?, ?)",
    [farmer_name, farmer_phn, farmer_add, farm_type],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Farmer added!", id: result.insertId });
    }
  );
});

app.put("/farmer/:id", (req, res) => {
  const { id } = req.params;
  const { farmer_name, farmer_phn, farmer_add, farm_type } = req.body;
  db.query(
    "UPDATE farmer SET farmer_name=?, farmer_phn=?, farmer_add=?, farm_type=? WHERE farmer_id=?",
    [farmer_name, farmer_phn, farmer_add, farm_type, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Farmer updated!" });
    }
  );
});

app.delete("/farmer/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM farmer WHERE farmer_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Farmer deleted!" });
  });
});

// ========================
// DOCTOR CRUD
// ========================
// 

// ========================
// DOCTOR CRUD
// ========================
app.get("/doctor", (req, res) => {
  db.query("SELECT * FROM doctor", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Modified POST → insert or update if doctor already exists
app.post("/doctor", (req, res) => {
  const { doctor_name, doctor_spec, doctor_phn, doctor_add } = req.body;

  // Check if doctor already exists by phone number
  db.query(
    "SELECT * FROM doctor WHERE doctor_phn = ?",
    [doctor_phn],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length > 0) {
        // Doctor exists → update
        db.query(
          "UPDATE doctor SET doctor_name=?, doctor_spec=?, doctor_add=? WHERE doctor_phn=?",
          [doctor_name, doctor_spec, doctor_add, doctor_phn],
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: "Failed to update doctor" });
            }
            return res.json({ message: "Doctor already exists, updated instead" });
          }
        );
      } else {
        // Doctor doesn’t exist → insert new
        db.query(
          "INSERT INTO doctor (doctor_name, doctor_spec, doctor_phn, doctor_add) VALUES (?, ?, ?, ?)",
          [doctor_name, doctor_spec, doctor_phn, doctor_add],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: "Failed to add doctor" });
            }
            return res.json({ message: "Doctor added!", id: result.insertId });
          }
        );
      }
    }
  );
});

app.put("/doctor/:id", (req, res) => {
  const { id } = req.params;
  const { doctor_name, doctor_spec, doctor_phn, doctor_add } = req.body;
  db.query(
    "UPDATE doctor SET doctor_name=?, doctor_spec=?, doctor_phn=?, doctor_add=? WHERE doctor_id=?",
    [doctor_name, doctor_spec, doctor_phn, doctor_add, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Doctor updated!" });
    }
  );
});

app.delete("/doctor/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM doctor WHERE doctor_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Doctor deleted!" });
  });
});

// ========================
// SHOP CRUD
// ========================
app.get("/shop", (req, res) => {
  db.query("SELECT * FROM shop", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/shop", (req, res) => {
  const { shop_name, shop_add, shop_phn } = req.body;
  db.query(
    "INSERT INTO shop (shop_name, shop_add, shop_phn) VALUES (?, ?, ?)",
    [shop_name, shop_add, shop_phn],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Shop added!", id: result.insertId });
    }
  );
});

app.put("/shop/:id", (req, res) => {
  const { id } = req.params;
  const { shop_name, shop_add, shop_phn } = req.body;
  db.query(
    "UPDATE shop SET shop_name=?, shop_add=?, shop_phn=? WHERE shop_id=?",
    [shop_name, shop_add, shop_phn, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Shop updated!" });
    }
  );
});

app.delete("/shop/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM shop WHERE shop_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Shop deleted!" });
  });
});

// ========================
// MEDICINE CRUD
// ========================
app.get("/medicine", (req, res) => {
  db.query("SELECT * FROM medicine", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/medicine", (req, res) => {
  const { medicine_name, medicine_type, medicine_detail } = req.body;
  db.query(
    "INSERT INTO medicine (medicine_name, medicine_type, medicine_detail) VALUES (?, ?, ?)",
    [medicine_name, medicine_type, medicine_detail],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Medicine added!", id: result.insertId });
    }
  );
});

app.put("/medicine/:id", (req, res) => {
  const { id } = req.params;
  const { medicine_name, medicine_type, medicine_detail } = req.body;
  db.query(
    "UPDATE medicine SET medicine_name=?, medicine_type=?, medicine_detail=? WHERE medicine_id=?",
    [medicine_name, medicine_type, medicine_detail, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Medicine updated!" });
    }
  );
});

app.delete("/medicine/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM medicine WHERE medicine_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Medicine deleted!" });
  });
});

// ========================
// PAYMENT CRUD
// ========================
app.get("/payment", (req, res) => {
  db.query("SELECT * FROM payment", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/payment", (req, res) => {
  const { pay_date, pay_method, amount } = req.body;
  db.query(
    "INSERT INTO payment (pay_date, pay_method, amount) VALUES (?, ?, ?)",
    [pay_date, pay_method, amount],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Payment added!", id: result.insertId });
    }
  );
});

app.put("/payment/:id", (req, res) => {
  const { id } = req.params;
  const { pay_date, pay_method, amount } = req.body;
  db.query(
    "UPDATE payment SET pay_date=?, pay_method=?, amount=? WHERE pay_id=?",
    [pay_date, pay_method, amount, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Payment updated!" });
    }
  );
});

app.delete("/payment/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM payment WHERE pay_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Payment deleted!" });
  });
});

// ========================
// APPOINTMENT CRUD
// ========================
app.get("/appointment", (req, res) => {
  db.query("SELECT * FROM appointment_details", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/appointment", (req, res) => {
  const { appt_date, appt_status } = req.body;
  db.query(
    "INSERT INTO appointment_details (appt_date, appt_status) VALUES (?, ?)",
    [appt_date, appt_status],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Appointment added!", id: result.insertId });
    }
  );
});

app.put("/appointment/:id", (req, res) => {
  const { id } = req.params;
  const { appt_date, appt_status } = req.body;
  db.query(
    "UPDATE appointment_details SET appt_date=?, appt_status=? WHERE appt_id=?",
    [appt_date, appt_status, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Appointment updated!" });
    }
  );
});

app.delete("/appointment/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM appointment_details WHERE appt_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Appointment deleted!" });
  });
});

// ========================
// PRESCRIPTION CRUD
// ========================
app.get("/prescription", (req, res) => {
  db.query("SELECT * FROM prescription", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/prescription", (req, res) => {
  const { pres_date, medicine_id, pres_vaccine, appt_id } = req.body;
  db.query(
    "INSERT INTO prescription (pres_date, medicine_id, pres_vaccine, appt_id) VALUES (?, ?, ?, ?)",
    [pres_date, medicine_id, pres_vaccine, appt_id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Prescription added!", id: result.insertId });
    }
  );
});

app.put("/prescription/:id", (req, res) => {
  const { id } = req.params;
  const { pres_date, medicine_id, pres_vaccine, appt_id } = req.body;
  db.query(
    "UPDATE prescription SET pres_date=?, medicine_id=?, pres_vaccine=?, appt_id=? WHERE pres_id=?",
    [pres_date, medicine_id, pres_vaccine, appt_id, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Prescription updated!" });
    }
  );
});

app.delete("/prescription/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM prescription WHERE pres_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Prescription deleted!" });
  });
});

// ========================
// ORDERS CRUD
// ========================
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/orders", (req, res) => {
  const { shop_id, farmer_id, medicine_id, pres_id, quantity, order_date } = req.body;
  db.query(
    "INSERT INTO orders (shop_id, farmer_id, medicine_id, pres_id, quantity, order_date) VALUES (?, ?, ?, ?, ?, ?)",
    [shop_id, farmer_id, medicine_id, pres_id, quantity, order_date],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Order added!", id: result.insertId });
    }
  );
});

app.put("/orders/:id", (req, res) => {
  const { id } = req.params;
  const { shop_id, farmer_id, medicine_id, pres_id, quantity, order_date } = req.body;
  db.query(
    "UPDATE orders SET shop_id=?, farmer_id=?, medicine_id=?, pres_id=?, quantity=?, order_date=? WHERE order_id=?",
    [shop_id, farmer_id, medicine_id, pres_id, quantity, order_date, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Order updated!" });
    }
  );
});

app.delete("/orders/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM orders WHERE order_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Order deleted!" });
  });
});

// ========================
// PAYMENT_SHOP CRUD
// ========================
app.get("/payment_shop", (req, res) => {
  db.query("SELECT * FROM payment_shop", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/payment_shop", (req, res) => {
  const { shop_id, order_id, pay_id } = req.body;
  db.query(
    "INSERT INTO payment_shop (shop_id, order_id, pay_id) VALUES (?, ?, ?)",
    [shop_id, order_id, pay_id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Payment-Shop added!", id: result.insertId });
    }
  );
});

app.put("/payment_shop/:id", (req, res) => {
  const { id } = req.params;
  const { shop_id, order_id, pay_id } = req.body;
  db.query(
    "UPDATE payment_shop SET shop_id=?, order_id=?, pay_id=? WHERE STransaction_id=?",
    [shop_id, order_id, pay_id, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Payment-Shop updated!" });
    }
  );
});

app.delete("/payment_shop/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM payment_shop WHERE STransaction_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Payment-Shop deleted!" });
  });
});

// ========================
// PAYMENT_DOCTOR CRUD
// ========================
app.get("/payment_doctor", (req, res) => {
  db.query("SELECT * FROM payment_doctor", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/payment_doctor", (req, res) => {
  const { pay_id, appointment_id } = req.body;
  db.query(
    "INSERT INTO payment_doctor (pay_id, appointment_id) VALUES (?, ?)",
    [pay_id, appointment_id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Payment-Doctor added!", id: result.insertId });
    }
  );
});

app.put("/payment_doctor/:id", (req, res) => {
  const { id } = req.params;
  const { pay_id, appointment_id } = req.body;
  db.query(
    "UPDATE payment_doctor SET pay_id=?, appointment_id=? WHERE DTransaction_id=?",
    [pay_id, appointment_id, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Payment-Doctor updated!" });
    }
  );
});

app.delete("/payment_doctor/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM payment_doctor WHERE DTransaction_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Payment-Doctor deleted!" });
  });
});

// ========================
// APPOINTED CRUD
// ========================
app.get("/appointed", (req, res) => {
  db.query("SELECT * FROM appointed", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/appointed", (req, res) => {
  const { farmer_id, doctor_id, appt_id } = req.body;
  db.query(
    "INSERT INTO appointed (farmer_id, doctor_id, appt_id) VALUES (?, ?, ?)",
    [farmer_id, doctor_id, appt_id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Appointed added!", id: result.insertId });
    }
  );
});

app.put("/appointed/:id", (req, res) => {
  const { id } = req.params;
  const { farmer_id, doctor_id, appt_id } = req.body;
  db.query(
    "UPDATE appointed SET farmer_id=?, doctor_id=?, appt_id=? WHERE appointment_id=?",
    [farmer_id, doctor_id, appt_id, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Appointed updated!" });
    }
  );
});

app.delete("/appointed/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM appointed WHERE appointment_id=?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Appointed deleted!" });
  });
});

// ========================
// Start Server
// ========================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
