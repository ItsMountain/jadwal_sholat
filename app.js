const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fetchRequest = require("./controllers/apiController.js");
const formatDate = require("./controllers/dateController.js");

const today = new Date();
const formattedDate = formatDate(today);

let currentTime = new Date();

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

function fetchDataAndRenderPage() {
  fetchRequest()
    .then((waktu) => {
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
          currentTime: new Date(), // or use the fetched data if needed
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
          currentTime: new Date(), // or use the fetched data if needed
          tanggal,
          waktuSubuh,
          waktuTerbit,
          waktuDzuhur,
          waktuAshar,
          waktuMaghrib,
          waktuIsya,
        });
      });

      app.get("/fetchTanggal", (req, res) => {
        fetchRequest()
          .then((waktu) => {
            const jadwalData = waktu.data.jadwal;
            res.json({ waktu });
          })
          .catch((error) => {
            console.error("Error fetching tanggal data:", error);
            res.status(500).json({ error: "Internal Server Error" });
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchDataAndRenderPage();

// Set the interval to fetch data every 24 hours (86400000 milliseconds)
// const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
const oneDayInMilliseconds = 10000000;

setInterval(fetchDataAndRenderPage, oneDayInMilliseconds);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}/`);
});

