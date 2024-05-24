const formatDate = require("./dateController.js");

function fetchRequest() {
  const today = new Date();
  const formattedDate = formatDate(today);
  const kota = "1301";

  return fetch(`https://api.myquran.com/v2/sholat/jadwal/${kota}/${formattedDate}`)
    .then((response) => {
      console.log("\x1b[36m%s\x1b[0m", formattedDate);

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
}

module.exports = fetchRequest;
