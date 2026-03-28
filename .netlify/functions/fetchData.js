// netlify/functions/fetchData.js

const { Client } = require('pg');

exports.handler = async function (event, context) {
  const client = new Client({
    connectionString: 'postgresql://kandangrakha_owner:5Psm3KGwHfdO@ep-winter-cloud-a1b56pb2.ap-southeast-1.aws.neon.tech/kandangrakha?sslmode=require',
    ssl: { rejectUnauthorized: false },
  });

  try {
    // Membuka koneksi
    await client.connect();

    // Melakukan query ke database
    const result = await client.query('SELECT * FROM data_bakul');

    // Mengembalikan hasil query sebagai response
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database error', details: error.message }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

  } finally {
    // 🔥 Penting: benar-benar menutup koneksi
    await client.end();
  }
};