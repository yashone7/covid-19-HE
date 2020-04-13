const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));

app.use("/api/patients", require("./routes/api/patients"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/tests", require("./routes/api/tests"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/feeds", require("./routes/api/feeds"));

// Serving static assets
if (process.env.NODE_ENV === "production") {
  // setting static foler
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`server running on ${PORT}`));
