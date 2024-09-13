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

app.use(express.static(path.join(__dirname, 'public'))); // untuk melayani file statis dari folder 'public'

app.get('/*', (req, res) => {
   ;res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
