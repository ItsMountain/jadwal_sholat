const formatDate = require("./dateController.js");

const today = new Date();
const formattedDate = formatDate(today);
var kota = "1301";

const fetchRequest = fetch(`https://api.myquran.com/v2/sholat/jadwal/${kota}/${formattedDate}`)
  .then((response) => {
    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the JSON response and return it
    return response.json();
  })
  .then((request) => {
    return request; 
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch operation
    console.error("Fetch error:", error);
    throw error; // Re-throwing the error for handling in the calling code
  });

module.exports = fetchRequest;
