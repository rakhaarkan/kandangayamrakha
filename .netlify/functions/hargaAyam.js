global.File = class {}; // 🔥 FIX ERROR UNDICI

const cheerio = require('cheerio');

exports.handler = async function (event, context) {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  try {
    const url = "https://chickin.id/blog/update/harga-ayam/jawa-tengah/";

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    let hasil = {};
    let last_kota = "";

    $("tr").each((i, row) => {
      const cols = $(row).find("td");

      if (cols.length === 4) {
        let kota = $(cols[1]).text().trim();
        let berat = $(cols[2]).text().trim();
        let harga = $(cols[3]).text().trim();

        if (kota) last_kota = kota;

        if (last_kota.toLowerCase().includes("yogyakarta")) {
          let split = harga.split("-");
          if (split.length < 2) return;

          let min = parseInt(split[0].replace(/\D/g, ""));
          let max = parseInt(split[1].replace(/\D/g, ""));

          let avg = Math.floor((min + max) / 2);

          if (berat.includes("<")) hasil.kecil = avg;
          if (berat.includes(">")) hasil.besar = avg;
        }
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(hasil),
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};