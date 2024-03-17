const fs = require("fs");
const now = new Date();
const currentDateTime = now.toLocaleString();

// Read the JSON file
fs.readFile("jadwalSholat.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  const jsonData = JSON.parse(data);
  const timings = jsonData.data.timings;
  const fajrTime = timings.Fajr;
});
