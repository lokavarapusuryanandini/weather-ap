const express = require("express");
const axios = require("axios");
const app = express();
const path = require('path');

require('dotenv').config();

// Set the view engine to EJS
// Serv e static assets from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set the views directory for rendering
app.set('views', path.join(__dirname, 'views'));

// Set up EJS as the view engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Example route for rendering a view
app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apiKey = process.env.API_KEY || "6f9887195332bfa42df2f7735fafbae7";
  // Add your logic here to fetch weather data from the API
  const APIUrl = `${process.env.API_URL}/weather?q=${city}&units=imperial&appid=${apiKey}`;
  let weather;
  let error = null;
  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = "Error, Please try again";
  }
  // Render the index template with the weather data and error message
  res.render("index", { weather, error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
