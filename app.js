const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fetchRequest = require("./controllers/apiController.js");

const currentTime = new Date();

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

// wait for the fetchRequest to resolve and then render the page
fetchRequest.then((waktu) => {
    const jadwalData = waktu.data.jadwal;
    const tanggal = jadwalData.tanggal;
    const waktuSubuh = jadwalData.subuh;
    const waktuTerbit = jadwalData.terbit;
    const waktuDzuhur = jadwalData.dzuhur;
    const waktuAshar = jadwalData.ashar;
    const waktuMaghrib = jadwalData.maghrib;
    const waktuIsya = jadwalData.isya;

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