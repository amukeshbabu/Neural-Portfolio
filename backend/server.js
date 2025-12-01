const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas Connection
mongoose.connect("mongodb+srv://amukeshbabu_db:Annadurai@portfoliodb.ysedzau.mongodb.net/PortfolioDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Schema & Model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// CREATE
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await new Contact({ name, email, message }).save();
        res.json({ success: true, message: "Message saved in MongoDB!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error saving message" });
    }
});

// READ (GET all messages)
app.get("/api/messages", async (req, res) => {
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
});

// UPDATE message
app.put("/api/messages/:id", async (req, res) => {
    const { name, email, message } = req.body;
    await Contact.findByIdAndUpdate(req.params.id, { name, email, message });
    res.json({ success: true });
});

// DELETE message
app.delete("/api/messages/:id", async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// ✅ START SERVER — must be last!
app.listen(5000, () => console.log("Server running on port 5000"));
