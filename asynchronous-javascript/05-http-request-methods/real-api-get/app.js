const express = require("express");
const app = express();

// fetching random joke
app.get("/joke", async (req, res) => {
  try {
    const response = await fetch("https://v2.jokeapi.dev/Any?type=single");
    const data = await response.json();

    res.json({
      message: "Joke is fetched successfully",
      joke: data,
    });
  } catch (error) {
    res.json({ error: "Failed to fetch jokes" });
  }
});

// fetching weather data
app.get("/weather", async (req, res) => {
    const city = req.query.city;
  try {
    const apiKey = "df15b70d09513c579f559d7790fad0ce";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(URL);
    const data = await response.json();

    res.json({
        message: `Weather for ${city}`,
        weather: data
    })
  } catch (error) {
    res.json({error:"Failed to fetch Weather data"});
  }
});


app.listen(3000, () => {
    console.log("Server is running at PORT 3000........")
})