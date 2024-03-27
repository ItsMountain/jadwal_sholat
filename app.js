const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fetchRequest = require("./controllers/apiController.js");
let currentTime = new Date();
let tanggal = ''; // Initialize tanggal variable

app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.use("/controllers", express.static(path.join(__dirname, "controllers")));

app.set("views", "./views");
app.set("view engine", "ejs");

function fetchDataAndUpdateTanggal() {
  fetchRequest.then((waktu) => {
    const jadwalData = waktu.data.jadwal;
    tanggal = jadwalData.tanggal;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
}

fetchDataAndUpdateTanggal();

setInterval(fetchDataAndUpdateTanggal, 24 * 60 * 60 * 1000);


fetchRequest.then((waktu) => {
    const jadwalData = waktu.data.jadwal;

    // const tanggal = jadwalData.tanggal;

    const waktuSubuh = jadwalData.subuh;
    const waktuTerbit = jadwalData.terbit;
    let waktuDzuhur = jadwalData.dzuhur;
    const waktuAshar = jadwalData.ashar;
    const waktuMaghrib = jadwalData.maghrib;
    const waktuIsya = jadwalData.isya;

    const dayOfWeek = new Date(tanggal).getDay();
    if (dayOfWeek === 5) {
        waktuDzuhur = "Jum'at";
    }

    // console.log(tanggal)

    app.get("/", (req, res) => {
      res.render("index", {
        currentTime,
        tanggal,
        waktuSubuh,
        waktuTerbit,
        waktuDzuhur,
        waktuAshar,
        waktuMaghrib,
        waktuIsya,
      });
    });

    app.get("/tv", (req, res) => {
      res.render("tv", {
        currentTime,
        tanggal,
        waktuSubuh,
        waktuTerbit,
        waktuDzuhur,
        waktuAshar,
        waktuMaghrib,
        waktuIsya,
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}/`);
});


// tests here

// function getCurrentTime() {
//   const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
//   const currentTime = new Date().toLocaleTimeString('en-US', options);
//   return currentTime;
// }

// function getTomorrowTime() {
//   const now = new Date();
//   const tomorrow = new Date(now);
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
//   const tomorrowTime = tomorrow.toLocaleTimeString('en-US', options);
//   return tomorrowTime;
// }

// // Usage
// const CurrentTime = getCurrentTime();
// const tomorrowTime = getTomorrowTime();

// console.log("Current time:", CurrentTime);
// console.log("Time for tomorrow:", tomorrowTime);