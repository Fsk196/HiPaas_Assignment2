import express from "express";
import mysql from "mysql2";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";

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

app.post("/verify-token", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    console.log("Decoded token: ", decoded);

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
