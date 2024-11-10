const { Pool } = require('pg');

// Membuat pool koneksi PostgreSQL
const pool = new Pool({
  connectionString: 'postgresql://datakandangayamrakha_owner:QPR73rjkFcoS@ep-nameless-band-a1x2caxb.ap-southeast-1.aws.neon.tech/datakandangayamrakha?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
    };
  }

  try {
    const client = await pool.connect();
    const body = JSON.parse(event.body);

    const { tanggal, nama_bakul, plat_nomor, jumlah_ekor_ambil, jumlah_kg_ambil } = body;

    console.log('Data yang diterima:', body);

    const query = `
      INSERT INTO data_bakul (tanggal, nama_bakul, plat_nomor, jumlah_ekor_ambil, jumlah_kg_ambil)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    
    const result = await client.query(query, [tanggal, nama_bakul, plat_nomor, jumlah_ekor_ambil, jumlah_kg_ambil]);
    console.log('Hasil query:', result.rows);

    client.release();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Data berhasil ditambahkan', data: result.rows }),
    };
  } catch (error) {
    console.error('Database error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Database error', details: error.message }),
    };
  }
};
