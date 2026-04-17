const express = require("express");
const app = express();

const routeNotes = require('./routes/router');

app.use(express.json()); // essential for req.body

app.use('/api/v1/routes', routeNotes); // creating api route

const PORT = 5000; // Port no: where our process run

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
