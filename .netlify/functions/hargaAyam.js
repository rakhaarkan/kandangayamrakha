const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function (event, context) {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // 🔥 Handle preflight (CORS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
    };
  }

  try {
    const url = "https://chickin.id/blog/update/harga-ayam/jawa-tengah/";
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const rows = $("tr");

    let last_kota = "";
    let last_wilayah = "";

    let hasil = {};

    rows.each((i, row) => {
      const cols = $(row).find("td");

      if (cols.length === 4) {
        let wilayah = $(cols[0]).text().trim();
        let kota = $(cols[1]).text().trim();
        let berat = $(cols[2]).text().trim();
        let harga = $(cols[3]).text().trim();

        if (wilayah) last_wilayah = wilayah;
        if (kota) last_kota = kota;

        if (last_kota.toLowerCase().includes("yogyakarta")) {

          // 🔥 parsing harga aman
          let harga_split = harga.split("-");
          if (harga_split.length < 2) return;

          let harga_min = parseInt(harga_split[0].replace(/\D/g, ""));
          let harga_max = parseInt(harga_split[1].replace(/\D/g, ""));

          let avg = Math.floor((harga_min + harga_max) / 2);

          if (berat.includes("<")) {
            hasil["kecil"] = avg;
          } else if (berat.includes(">")) {
            hasil["besar"] = avg;
          }
        }
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        source: "chickin",
        wilayah: "Yogyakarta",
        data: hasil
      }),
    };

  } catch (error) {
    console.error("Scraping error:", error.message);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Gagal ambil data",
        details: error.message
      }),
    };
  }
};