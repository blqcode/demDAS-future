const express = require('express');
const xlsx = require('xlsx');
const app = express();

// Load the Excel file
const workbook = xlsx.readFile('../excel/data.xlsx');
const sheetName = workbook.SheetNames[0];
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the data API!');
});

// Endpoint to get all data
app.get('/data', (req, res) => {
  res.json(data);
});

// Endpoint to get data by country
app.get('/data/:country', (req, res) => {
  const country = req.params.country;
  const countryData = data.find(item => item.Country === country);
  if (countryData) {
    res.json(countryData);
  } else {
    res.status(404).json({ message: 'Country not found' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
