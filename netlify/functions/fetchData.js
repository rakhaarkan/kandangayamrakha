const { Client } = require('pg'); // Menggunakan library pg untuk koneksi PostgreSQL

exports.handler = async (event, context) => {
  const connectionString = process.env.postgres_link;
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const res = await client.query('SELECT * FROM your_table_name LIMIT 10'); // Ganti your_table_name dengan nama tabel
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify(res.rows),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};
