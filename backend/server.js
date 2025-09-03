// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql2/promise');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');
// const http = require('http');
// const socketIo = require('socket.io');
// require('dotenv').config();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// const PORT = process.env.PORT || 5000;
// const JWT_SECRET = process.env.JWT_SECRET || 'grameen_krishi_secret_key';

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // File upload configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   }
// });

// // Database connection
// const dbConfig = {
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'grameen_krishi'
// };

// let db;

// // Initialize database connection
// async function initializeDatabase() {
//   try {
//     db = await mysql.createConnection(dbConfig);
//     console.log('Connected to MySQL database');
    
//     // Create tables if they don't exist
//     await createTables();
//   } catch (error) {
//     console.error('Database connection failed:', error);
//     process.exit(1);
//   }
// }

// // Create necessary tables
// async function createTables() {
//   const tables = [
//     // Users table (for both farmers and doctors)
//     `CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       phone VARCHAR(20) UNIQUE NOT NULL,
//       email VARCHAR(255),
//       password_hash VARCHAR(255) NOT NULL,
//       user_type ENUM('farmer', 'doctor') NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     )`,
    
//     // Farmers table
//     `CREATE TABLE IF NOT EXISTS farmers (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       user_id INT NOT NULL,
//       address TEXT,
//       farm_type ENUM('rice', 'vegetables', 'fruits', 'livestock', 'poultry', 'fish') NOT NULL,
//       farm_size DECIMAL(10,2),
//       experience_years INT,
//       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//     )`,
    
//     // Doctors table
//     `CREATE TABLE IF NOT EXISTS doctors (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       user_id INT NOT NULL,
//       qualification VARCHAR(500) NOT NULL,
//       specialization ENUM('crop_diseases', 'pest_management', 'soil_fertility', 'plant_nutrition', 'livestock_health', 'organic_farming') NOT NULL,
//       experience_years INT NOT NULL,
//       workplace VARCHAR(255),
//       license_number VARCHAR(100),
//       available_time_start TIME,
//       available_time_end TIME,
//       available_days JSON,
//       consultation_fee DECIMAL(10,2),
//       rating DECIMAL(3,2) DEFAULT 5.00,
//       total_consultations INT DEFAULT 0,
//       document_path VARCHAR(500),
//       is_verified BOOLEAN DEFAULT FALSE,
//       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//     )`,
    
//     // Appointments table
//     `CREATE TABLE IF NOT EXISTS appointments (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       farmer_id INT NOT NULL,
//       doctor_id INT NOT NULL,
//       appointment_date DATE NOT NULL,
//       appointment_time TIME NOT NULL,
//       problem_description TEXT NOT NULL,
//       farm_type ENUM('rice', 'vegetables', 'fruits', 'livestock', 'poultry', 'fish') NOT NULL,
//       urgency ENUM('normal', 'urgent', 'emergency') DEFAULT 'normal',
//       status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
//       consultation_notes TEXT,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//       FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE,
//       FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
//     )`,
    
//     // Consultation messages table
//     `CREATE TABLE IF NOT EXISTS consultation_messages (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       appointment_id INT NOT NULL,
//       sender_type ENUM('farmer', 'doctor') NOT NULL,
//       message TEXT NOT NULL,
//       message_type ENUM('text', 'image', 'file') DEFAULT 'text',
//       file_path VARCHAR(500),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
//     )`,
    
//     // Consultation sessions table
//     `CREATE TABLE IF NOT EXISTS consultation_sessions (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       appointment_id INT NOT NULL,
//       start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       end_time TIMESTAMP NULL,
//       session_type ENUM('chat', 'audio', 'video') DEFAULT 'chat',
//       session_duration INT DEFAULT 0,
//       notes TEXT,
//       FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
//     )`
//   ];

//   for (const table of tables) {
//     try {
//       await db.execute(table);
//     } catch (error) {
//       console.error('Error creating table:', error);
//     }
//   }
  
//   console.log('Database tables created successfully');
// }

// // Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'Access token required' });
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid token' });
//     }
//     req.user = user;
//     next();
//   });
// };

// // Routes

// // Auth Routes
// app.post('/api/auth/register', upload.single('document'), async (req, res) => {
//   try {
//     const { name, phone, email, password, userType, ...otherData } = req.body;
    
//     // Check if user already exists
//     const [existingUser] = await db.execute(
//       'SELECT id FROM users WHERE phone = ?',
//       [phone]
//     );
    
//     if (existingUser.length > 0) {
//       return res.status(400).json({ error: 'User already exists with this phone number' });
//     }
    
//     // Hash password
//     const passwordHash = await bcrypt.hash(password, 10);
    
//     // Insert user
//     const [userResult] = await db.execute(
//       'INSERT INTO users (name, phone, email, password_hash, user_type) VALUES (?, ?, ?, ?, ?)',
//       [name, phone, email, passwordHash, userType]
//     );
    
//     const userId = userResult.insertId;
    
//     // Insert specific user type data
//     if (userType === 'farmer') {
//       await db.execute(
//         'INSERT INTO farmers (user_id, address, farm_type, farm_size, experience_years) VALUES (?, ?, ?, ?, ?)',
//         [userId, otherData.address, otherData.farmType, otherData.farmSize || 0, otherData.experienceYears || 0]
//       );
//     } else if (userType === 'doctor') {
//       const documentPath = req.file ? req.file.path : null;
//       const availableDays = JSON.parse(otherData.availableDays || '[]');
      
//       await db.execute(
//         'INSERT INTO doctors (user_id, qualification, specialization, experience_years, workplace, license_number, available_time_start, available_time_end, available_days, consultation_fee, document_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//         [userId, otherData.qualification, otherData.specialization, otherData.experienceYears, otherData.workplace, otherData.licenseNumber, otherData.availableTimeStart, otherData.availableTimeEnd, JSON.stringify(availableDays), otherData.consultationFee, documentPath]
//       );
//     }
    
//     res.status(201).json({ 
//       message: 'User registered successfully',
//       userId: userId 
//     });
    
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });

// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { phone, password, userType } = req.body;
    
//     // Get user data
//     const [users] = await db.execute(
//       'SELECT * FROM users WHERE phone = ? AND user_type = ?',
//       [phone, userType]
//     );
    
//     if (users.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
    
//     const user = users[0];
    
//     // Verify password
//     const passwordMatch = await bcrypt.compare(password, user.password_hash);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
    
//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user.id, userType: user.user_type },
//       JWT_SECRET,
//       { expiresIn: '24h' }
//     );
    
//     // Get additional user data based on type
//     let additionalData = {};
//     if (userType === 'farmer') {
//       const [farmerData] = await db.execute(
//         'SELECT * FROM farmers WHERE user_id = ?',
//         [user.id]
//       );
//       additionalData = farmerData[0] || {};
//     } else if (userType === 'doctor') {
//       const [doctorData] = await db.execute(
//         'SELECT * FROM doctors WHERE user_id = ?',
//         [user.id]
//       );
//       additionalData = doctorData[0] || {};
//     }
    
//     res.json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         phone: user.phone,
//         email: user.email,
//         userType: user.user_type,
//         ...additionalData
//       }
//     });
    
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// // Doctor Routes
// app.get('/api/doctors', async (req, res) => {
//   try {
//     const [doctors] = await db.execute(`
//       SELECT 
//         d.*, 
//         u.name, 
//         u.phone, 
//         u.email 
//       FROM doctors d 
//       JOIN users u ON d.user_id = u.id 
//       WHERE d.is_verified = TRUE
//       ORDER BY d.rating DESC
//     `);
    
//     res.json(doctors);
//   } catch (error) {
//     console.error('Error fetching doctors:', error);
//     res.status(500).json({ error: 'Failed to fetch doctors' });
//   }
// });

// // Appointment Routes
// app.post('/api/appointments', authenticateToken, async (req, res) => {
//   try {
//     const { doctorId, appointmentDate, appointmentTime, problemDescription, farmType, urgency } = req.body;
    
//     // Get farmer ID from user
//     const [farmerData] = await db.execute(
//       'SELECT id FROM farmers WHERE user_id = ?',
//       [req.user.userId]
//     );
    
//     if (farmerData.length === 0) {
//       return res.status(404).json({ error: 'Farmer not found' });
//     }
    
//     const farmerId = farmerData[0].id;
    
//     // Check for conflicts
//     const [conflicts] = await db.execute(
//       'SELECT id FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? AND status IN ("pending", "confirmed")',
//       [doctorId, appointmentDate, appointmentTime]
//     );
    
//     if (conflicts.length > 0) {
//       return res.status(400).json({ error: 'Time slot already booked' });
//     }
    
//     // Create appointment
//     const [result] = await db.execute(
//       'INSERT INTO appointments (farmer_id, doctor_id, appointment_date, appointment_time, problem_description, farm_type, urgency) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [farmerId, doctorId, appointmentDate, appointmentTime, problemDescription, farmType, urgency]
//     );
    
//     res.status(201).json({
//       message: 'Appointment created successfully',
//       appointmentId: result.insertId
//     });
    
//   } catch (error) {
//     console.error('Error creating appointment:', error);
//     res.status(500).json({ error: 'Failed to create appointment' });
//   }
// });

// app.get('/api/appointments/farmer', authenticateToken, async (req, res) => {
//   try {
//     const [farmerData] = await db.execute(
//       'SELECT id FROM farmers WHERE user_id = ?',
//       [req.user.userId]
//     );
    
//     if (farmerData.length === 0) {
//       return res.status(404).json({ error: 'Farmer not found' });
//     }
    
//     const farmerId = farmerData[0].id;
    
//     const [appointments] = await db.execute(`
//       SELECT 
//         a.*,
//         u.name as doctor_name,
//         d.specialization,
//         d.qualification
//       FROM appointments a
//       JOIN doctors d ON a.doctor_id = d.id
//       JOIN users u ON d.user_id = u.id
//       WHERE a.farmer_id = ?
//       ORDER BY a.appointment_date DESC, a.appointment_time DESC
//     `, [farmerId]);
    
//     res.json(appointments);
//   } catch (error) {
//     console.error('Error fetching appointments:', error);
//     res.status(500).json({ error: 'Failed to fetch appointments' });
//   }
// });

// // Consultation Routes
// app.post('/api/consultations/:appointmentId/messages', authenticateToken, async (req, res) => {
//   try {
//     const { appointmentId } = req.params;
//     const { message } = req.body;
//     const senderType = req.user.userType;
    
//     const [result] = await db.execute(
//       'INSERT INTO consultation_messages (appointment_id, sender_type, message) VALUES (?, ?, ?)',
//       [appointmentId, senderType, message]
//     );
    
//     const messageData = {
//       id: result.insertId,
//       appointment_id: appointmentId,
//       sender_type: senderType,
//       message: message,
//       created_at: new Date()
//     };
    
//     // Emit to room
//     io.to(`appointment_${appointmentId}`).emit('new_message', messageData);
    
//     res.status(201).json(messageData);
//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({ error: 'Failed to send message' });
//   }
// });

// app.get('/api/consultations/:appointmentId/messages', authenticateToken, async (req, res) => {
//   try {
//     const { appointmentId } = req.params;
    
//     const [messages] = await db.execute(
//       'SELECT * FROM consultation_messages WHERE appointment_id = ? ORDER BY created_at ASC',
//       [appointmentId]
//     );
    
//     res.json(messages);
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ error: 'Failed to fetch messages' });
//   }
// });

// // Socket.IO for real-time communication
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);
  
//   socket.on('join_consultation', (appointmentId) => {
//     socket.join(`appointment_${appointmentId}`);
//     console.log(`User joined consultation room: appointment_${appointmentId}`);
//   });
  
//   socket.on('leave_consultation', (appointmentId) => {
//     socket.leave(`appointment_${appointmentId}`);
//     console.log(`User left consultation room: appointment_${appointmentId}`);
//   });
  
//   socket.on('send_message', async (data) => {
//     try {
//       const { appointmentId, message, senderType } = data;
      
//       // Save message to database
//       const [result] = await db.execute(
//         'INSERT INTO consultation_messages (appointment_id, sender_type, message) VALUES (?, ?, ?)',
//         [appointmentId, senderType, message]
//       );
      
//       const messageData = {
//         id: result.insertId,
//         appointment_id: appointmentId,
//         sender_type: senderType,
//         message: message,
//         created_at: new Date()
//       };
      
//       // Broadcast to room
//       io.to(`appointment_${appointmentId}`).emit('new_message', messageData);
//     } catch (error) {
//       console.error('Error handling message:', error);
//     }
//   });
  
//   socket.on('start_call', (data) => {
//     socket.to(`appointment_${data.appointmentId}`).emit('incoming_call', data);
//   });
  
//   socket.on('accept_call', (data) => {
//     socket.to(`appointment_${data.appointmentId}`).emit('call_accepted', data);
//   });
  
//   socket.on('end_call', (data) => {
//     socket.to(`appointment_${data.appointmentId}`).emit('call_ended', data);
//   });
  
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // Initialize database and start server
// initializeDatabase().then(() => {
//   server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });
// module.exports = app;
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
