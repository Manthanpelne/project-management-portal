const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connection = require("./config/db");
const authRoute = require("./routes/authRoute")
const adminRoute = require("./routes/adminRoute");

app.use(cors({
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    credentials: true
}));

// 2. Body Parser
app.use(express.json());


// 4. Routes
app.use("/api/auth", authRoute)
app.use("/api/admin", adminRoute);



// Start Server
const PORT = process.env.port || 5000;
app.listen(PORT, async () => {
    try {
        await connection();
        console.log(`✅ Server running on port: ${PORT}`);
    } catch (err) {
        console.log("❌ DB Connection Error:", err);
    }
});