require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require('./middleware/error');

const app = express();

const routeNotes = require("./routes/router");


app.use(express.json()); // essential for req.body

app.use("/api/v1/notes", routeNotes); // creating api route
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // Port no: where our process run

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
  });
});
