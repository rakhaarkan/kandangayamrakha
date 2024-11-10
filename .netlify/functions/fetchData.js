// netlify/functions/fetchData.js
const { Pool } = require('pg');

// Membuat pool koneksi PostgreSQL
const pool = new Pool({
  connectionString: 'postgresql://datakandangayamrakha_owner:QPR73rjkFcoS@ep-nameless-band-a1x2caxb.ap-southeast-1.aws.neon.tech/datakandangayamrakha?sslmode=require',
  ssl: { rejectUnauthorized: false }, // Menonaktifkan validasi SSL pada koneksi
});

exports.handler = async function (event, context) {
  try {
    // Mengambil koneksi dari pool
    const client = await pool.connect();

    try {
      // Melakukan query ke database
      const result = await client.query('SELECT * FROM data_bakul');
      
      // Mengembalikan hasil query sebagai response
      return {
        statusCode: 200,
        body: JSON.stringify(result.rows),
        headers: {
          'Access-Control-Allow-Origin': '*', // Menambahkan header CORS
        },
      };
    } finally {
      // Mengembalikan koneksi ke pool setelah selesai
      client.release();
    }
  } catch (error) {
    // Menangani error jika terjadi masalah pada koneksi atau query
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database error', details: error.message }),
      headers: {
        'Access-Control-Allow-Origin': '*', // Menambahkan header CORS
      },
    };
  }
};
