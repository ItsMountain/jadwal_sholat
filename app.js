const express = require("express");
const app = express();
const port = 3000;

const fetchRequest = require('./apiFetching.js');

const currentTime = new Date();

app.set("views", "./views");
app.set("view engine", "ejs");

// Wait for the fetchRequest to resolve and then render the page
fetchRequest.then((waktu) => {
  const jadwalData = waktu.data.jadwal;
    app.get("/", (req, res) => {
        const tanggal = jadwalData.tanggal;
        const waktuSubuh = jadwalData.subuh;
        const waktuTerbit = jadwalData.terbit;
        const waktuDzuhur = jadwalData.dzuhur;
        const waktuAshar = jadwalData.ashar;
        const waktuMaghrib = jadwalData.maghrib;
        const waktuIsya = jadwalData.isya;


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
}).catch((error) => {
    console.error("Error fetching data:", error);
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`);
});
