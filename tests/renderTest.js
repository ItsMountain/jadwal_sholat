const fetchRequest = require("../controllers/apiController");
let currentTime;

function updateTime() {
  // Get current time
  const now = new Date();
  currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const dayOfWeek = now.getDay();
  const daysOfWeek = [
    "Ahad",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  const dayName = daysOfWeek[dayOfWeek];

  const tanggal = `${dayName}, ${date}/${month}/${year}`;

  document.getElementById("currentTime").textContent = currentTime;
  document.getElementById("tanggal").textContent = tanggal;
}

// Update prayer times every second
setInterval(updateTime, 1000);

// Initial update
updateTime();

function updateTimePrayer() {
  // Make an HTTP GET request to the API endpoint
  fetchRequest()
    .then((response) => {
      // Check if the response is successful (status code 200)
      if (response.ok) {
        // Parse the JSON response
        console.log("ok")
        return response.json();
      }
      // Handle HTTP errors
      throw new Error("Failed to fetch prayer times");
    })
    .then((prayerData) => {
      const jadwalData = prayerData.data.jadwal;
      const waktuSubuh = jadwalData.subuh;
      const waktuDzuhur = jadwalData.dzuhur;
      const waktuAshar = jadwalData.ashar;
      const waktuMaghrib = jadwalData.maghrib;
      const waktuIsya = jadwalData.isya;

      let prayerTimeNow;
      let timePrayer;

      if (currentTime < waktuSubuh) {
        prayerTimeNow = "Sholat Subuh";
        timePrayer = "</b> pukul <b> <%= waktuSubuh %>";
      } else if (currentTime < waktuDzuhur) {
        if (dayName === "Jum'at") {
          prayerTimeNow = "Sholat Jum'at";
          timePrayer = "</b> pukul <b> <%= waktuDzuhur %>";
        } else {
          prayerTimeNow = "Sholat Dzuhur";
          timePrayer = "</b> pukul <b> <%= waktuDzuhur %>";
        }
      } else if (currentTime < waktuAshar) {
        prayerTimeNow = "Sholat Ashar";
        timePrayer = "</b> pukul <b> <%= waktuAshar %>";
      } else if (currentTime < waktuMaghrib) {
        prayerTimeNow = "Sholat Maghrib";
        timePrayer = "</b> pukul <b> <%= waktuMaghrib %>";
      } else if (currentTime < waktuIsya) {
        prayerTimeNow = "Sholat Isya";
        timePrayer = "</b> pukul <b> <%= waktuIsya %>";
      } else if (currentTime > waktuIsya) {
        prayerTimeNow = "Sholat Subuh";
        timePrayer = "";
      }

      // Update the HTML element with the new prayer time
      document.getElementById("timePrayer").textContent = timePrayer;
      document.getElementById("prayerTimeNow").textContent = prayerTimeNow;

    })
    .catch((error) => {
      // Handle errors
      console.error("Error fetching prayer times:", error);
    });
}

// Update prayer times every minute (adjust as needed)
setInterval(updateTimePrayer, 1000);

// Initial update
updateTimePrayer();
