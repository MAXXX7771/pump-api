
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

let cache = [];

async function fetchData() {
  try {
    const res = await axios.get('https://pump.fun/api/recent');
    cache = res.data;
  } catch (err) {
    console.error('Ошибка при получении данных:', err.message);
  }
}

setInterval(fetchData, 10000); // каждые 10 сек
fetchData();

app.get('/', (req, res) => {
  res.json(cache.slice(0, 30));
});

module.exports = app;
