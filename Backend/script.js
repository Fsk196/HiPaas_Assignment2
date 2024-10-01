import express from "express";
import mysql from "mysql2";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";
import SpeedTest from "fast-speedtest-api";

dotenv.config();

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqladmin",
  database: "dealerpaas",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL connected");
  }
});

app.get("/speedtest", async (req, res) => {
  const token = process.env.TOKEN;

  const speedTest = new SpeedTest({
    acceptLicense: true,
    acceptGdpr: true,
    token: token,
  });

  try {
    const speed = await speedTest.getSpeed();
    res.json({ speed });
  } catch (error) {
    res.status(500).json({ error: "Please check your internet connection" });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password, role, companyname, age } = req.body;
  if (!name || !email || !password || !role || !companyname || !age) {
    return res.status(400).json({ error: "All fields are requied" });
  }

  try {
    const [rows] = await db
      .promise()
      .query("Select * from users where email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db
      .promise()
      .query(
        "Insert into users (name, email, password, role, companyname, age) values (?, ?, ?, ?, ?, ?)",
        [name, email, hashedPassword, role, companyname, age]
      );

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { name, email, role, companyname, age },
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [rows] = await db
      .promise()
      .query("Select * from users where email = ?", [email]);

    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        companyname: user.companyname,
        age: user.age,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/fetchdata", async (req, res) => {
  try {
    const [rows] = await db.promise().query("Select * from users;");

    const formattedUsers = rows.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyname: user.companyname,
      age: user.age,
    }));

    res.status(200).json({
      message: "Data fetched successfully",
      users: formattedUsers,
    });
  } catch (error) {
    console.log("Database Fetch Error: ", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.get("/notes", async (req, res) => {
  try {
    const [rows] = await db.promise().query("Select * from notes;");

    const formattedNotes = rows.map((note) => ({
      id: note.id,
      title: note.title,
      createTime: note.createTime,
      content: note.content,
      badge: note.badge,
      status: note.status,
      user_id: note.user_id,
    }));
    res.status(200).json({
      message: "Notes fetched successfully.",
      notes: formattedNotes,
    });
  } catch (error) {
    console.log("Error in fetching notes: ", error);
    res.status(500).json({ message: "Error fetching Notes." });
  }
});

app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db
      .promise()
      .query("Select * from notes where user_id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Note not found." });
    }

    const formattedNotes = rows.map((note) => ({
      id: note.id,
      title: note.title,
      createTime: note.createTime,
      content: note.content,
      badge: note.badge,
      status: note.status,
      user_id: note.user_id,
    }));

    res.status(200).json({
      message: "Note fetched successfully.",
      notes: formattedNotes,
    });
  } catch (error) {
    console.log("Error in fetching note: ", error);
    res.status(500).json({ message: "Error fetching Note." });
  }
});

app.post("/updatenote", async (req, res) => {
  const { id, title, content, badge, status } = req.body;

  try {
    const [rows] = await db
      .promise()
      .query(
        "Update notes set title = ?, content = ?, badge = ?, status = ? where id = ?",
        [title, content, badge, status, id]
      );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({
      message: "Note updated successfully.",
      note: {
        id,
        title,
        content,
        badge,
        status,
      },
    });
  } catch (error) {
    console.log("Error in updating note: ", error);
    res.status(500).json({ message: "Error updating Note." });
  }
});

app.post("/addnotes", async (req, res) => {
  const { title, content, badge, status, user_id } = req.body;

  try {
    const [rows] = await db
      .promise()
      .query(
        "Insert into notes (title, content, badge, status, user_id) values (?, ?, ?, ?, ?)",
        [title, content, badge, status, user_id]
      );

    res.status(201).json({
      message: "Note created successfully.",
      note: {
        id: rows.insertId,
        title,
        content,
        badge,
        status,
        user_id,
      },
    });
  } catch (error) {
    console.log("Error in creating note: ", error);
    res.status(500).json({ message: "Error creating Note." });
  }
});

app.post("/deletenote", async (req, res) => {
  const { id } = req.body;

  try {
    const [rows] = await db
      .promise()
      .query("Delete from notes where id = ?", [id]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    console.log("Error in deleting note: ", error);
    res.status(500).json({ message: "Error deleting Note." });
  }
});

app.post("/verify-token", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    // console.log("Decoded token: ", decoded);

    // Fetch user from DB based on decoded email
    db.promise()
      .query("SELECT * FROM users WHERE email = ?", [decoded.email])
      .then(([rows]) => {
        if (rows.length === 0) {
          return res.status(400).json({ error: "User not found" });
        }

        const user = rows[0];
        res.status(200).json({
          message: "Token verified",
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
            companyname: user.companyname,
            age: user.age,
          },
        });
      })
      .catch((error) => {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (error) {
    console.error("Token verification failed", error);
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
