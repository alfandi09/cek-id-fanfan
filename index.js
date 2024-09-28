const axios = require('axios');
const express = require('express');
const cors = require('cors');
const { cekIdGameController } = require('./controllers/cekIdGameController');
const _ = require('lodash');
const path = require('path');
const { dataGame } = require('./lib/dataGame');
const getZoneController = require('./controllers/getZoneController');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));
//app.use(express.urlencoded({ extended: false }));
app.use(cors());
const cache = {};
const cacheExpiry = 24 * 60 * 60 * 1000; // 1 hari dalam milidetik

const apiHits = {};

// Middleware untuk menghitung hit API
app.use((req, res, next) => {
   const route = req.path;
   // Jika route sudah ada di apiHits, tambah 1, jika belum, set ke 1
   if (apiHits[route]) {
      apiHits[route] += 1;
   } else {
      apiHits[route] = 1;
   }
   next();
});

// Route untuk mengambil total API hits
app.get('/api/total-hits', (req, res) => {
   res.json({ totalHits: apiHits });
});

app.get('/api', (req, res) => {
   const currentTime = Date.now();

   // Jika ada cache dan belum kadaluarsa, gunakan cache
   if (cache['/api'] && (currentTime - cache['/api'].timestamp < cacheExpiry)) {
      console.log('Mengambil dari cache');
      return res.json(cache['/api'].data);
   }
   // Jika tidak ada cache atau sudah kadaluarsa, buat respons baru
   const newDataGame = dataGame.map((item) => {
      return {
         name: item.name,
         slug: item.slug,
         endpoint: `/api/game/${item.slug}`,
         query: `?id=xxxx${item.isZone ? '&zone=xxx' : ''}`,
         hasZoneId: item.isZone ? true : false,
         listZoneId: item.dropdown ? `/api/game/get-zone/${item.slug}` : null,
      };
   });

   const response = {
      name: 'Cek Data Game',
      author: 'FANFANSTORE',
      data: _.orderBy(newDataGame, ['name'], ['asc']),
   };
   // Simpan data baru dan waktu cache
   cache['/api'] = {
      data: response,
      timestamp: currentTime, // waktu penyimpanan cache
   };
   res.json(response);
});


app.get('/api/game/:game', cekIdGameController);
app.get('/api/game/get-zone/:game', getZoneController);


app.get("/api/listewallet", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api-rekening.lfourr.com/listEwallet"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bank data" });
  }
});

app.get("/api/ewalletaccount", async (req, res) => {
  const { bankCode, accountNumber } = req.query;

  if (!bankCode || !accountNumber) {
    return res.status(400).json({ message: "Missing bankCode or accountNumber" });
  }

  try {
    const response = await axios.get(
      `https://api-rekening.lfourr.com/getEwalletAccount?bankCode=${bankCode}&accountNumber=${accountNumber}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bank account data" });
  }
});

app.get("/api/listbank", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api-rekening.lfourr.com/listBank"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bank data" });
  }
});

app.get("/api/bankaccount", async (req, res) => {
  const { bankCode, accountNumber } = req.query;

  if (!bankCode || !accountNumber) {
    return res.status(400).json({ message: "Missing bankCode or accountNumber" });
  }

  try {
    const response = await axios.get(
      `https://api-rekening.lfourr.com/getBankAccount?bankCode=${bankCode}&accountNumber=${accountNumber}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bank account data" });
  }
});


app.use(express.static(path.join(__dirname, 'public'))); // untuk melayani file statis dari folder 'public'

app.get('/*', (req, res) => {
   ;res.sendFile(path.join(__dirname, 'public', 'index.js'));
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
