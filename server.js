const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Properly parse form data
app.use(express.static(path.join(__dirname, "public"))); 

// MongoDB Connection
mongoose.connect("mongodb+srv://code:gaps12345@cluster0.i1bby.mongodb.net/GapsLight?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ Connected to MongoDB (GapsLight)"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// MongoDB Schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String], 
});

const directorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  certificates: { type: String, default: "No certificates provided" },
  description: { type: String, default: "No description available" },
  image: { type: String, default: "default-image.jpg" },
});

const User = mongoose.model("User", userSchema);
const Project = mongoose.model("Project", projectSchema);
const Director = mongoose.model("Director", directorSchema);

// File Upload Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 🏠 Home Routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "public", "contact.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "public", "about.html")));
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "admin", "login.html")));
app.get("/admin-dashboard.html", (req, res) => res.sendFile(path.join(__dirname, "admin", "dashboard.html")));

// 🔹 Fetch All Projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects." });
  }
});

// 🔹 Fetch All Admins
app.get("/api/admins", async (req, res) => {
  try {
    const admins = await User.find();
    res.json(admins);
  } catch (error) {
    console.error("❌ Error fetching admins:", error);
    res.status(500).json({ message: "Failed to fetch admins." });
  }
});

// 🔹 Admin Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`🔹 Login Attempt: ${username}`);

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  console.log("✅ Login successful");
  res.json({ message: "Login successful", user });
});

// 🔹 Create Admin
app.post("/api/admins", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (await User.findOne({ username })) {
      return res.status(400).json({ message: "Admin already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({ username, password: hashedPassword });

    await newAdmin.save();
    console.log("✅ New Admin Created:", newAdmin);
    res.json({ message: "Admin created successfully!", admin: newAdmin });
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    res.status(500).json({ message: "Error creating admin." });
  }
});

// 🔹 Create a New Director
app.post("/api/directors", upload.single("image"), async (req, res) => {
  try {
    console.log("🔹 Received Body:", req.body);
    console.log("🔹 Uploaded File:", req.file);

    const { name, certificates, description } = req.body;
    if (!name || !certificates || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let image = req.body.image; 
    if (req.file) {
      image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const newDirector = new Director({ name, certificates, description, image });
    await newDirector.save();

    console.log("✅ New Director Created:", newDirector);
    res.json({ message: "Director added successfully!", director: newDirector });

  } catch (error) {
    console.error("❌ Error creating Director:", error);
    res.status(500).json({ message: "Error creating Director." });
  }
});

// 🔹 Fetch All Directors
app.get("/api/directors", async (req, res) => {
  try {
    const directors = await Director.find();
    res.json(directors);
  } catch (error) {
    console.error("❌ Error fetching Directors:", error);
    res.status(500).json({ message: "Failed to fetch directors." });
  }
});

// 🔹 Delete Admin
app.delete("/api/admins/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log(`✅ Admin Deleted (ID: ${req.params.id})`);
    res.json({ message: "Admin deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting admin:", error);
    res.status(500).json({ message: "Error deleting admin." });
  }
});

// 🔹 Delete Director
app.delete("/api/directors/:id", async (req, res) => {
  try {
    await Director.findByIdAndDelete(req.params.id);
    console.log(`✅ Director Deleted (ID: ${req.params.id})`);
    res.json({ message: "Director deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting director:", error);
    res.status(500).json({ message: "Error deleting director." });
  }
});

// 🔹 Add a Project
app.post("/api/projects", upload.array("images", 10), async (req, res) => {
  try {
    const { title, description, imageUrls } = req.body;

    const uploadedImages = req.files.map((file) => {
      return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    });

    const urls = imageUrls ? imageUrls.split(",").map((url) => url.trim()) : [];

    const newProject = new Project({
      title,
      description,
      images: [...uploadedImages, ...urls],
    });

    await newProject.save();
    console.log("✅ New Project Created:", newProject);
    res.json({ message: "Project added successfully!", project: newProject });

  } catch (error) {
    console.error("❌ Error adding project:", error);
    res.status(500).json({ message: "Failed to add project." });
  }
});

// Start the Server
app.listen(5500, () => {
  console.log("🚀 Server running on http://localhost:5500");
});
