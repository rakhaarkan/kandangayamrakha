const { Pool } = require('pg');

// Membuat pool koneksi PostgreSQL
const pool = new Pool({
  connectionString: 'postgresql://kandangrakha_owner:5Psm3KGwHfdO@ep-winter-cloud-a1b56pb2.ap-southeast-1.aws.neon.tech/kandangrakha?sslmode=require',
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
    const { action, tanggal, nama_bakul, plat_nomor, jumlah_ekor_ambil, jumlah_kg_ambil, id, nama_do} = body;
    
    console.log('Action yang diterima:', action);
    let query, result;

    // Cek jenis perintah SQL berdasarkan action
    if (action === 'insert') {
      query = `
        INSERT INTO data_bakul (tanggal, nama_bakul, plat_nomor, jumlah_ekor_ambil, jumlah_kg_ambil, nama_do)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
      `;
        result = await client.query(query, [tanggal, nama_bakul, plat_nomor, jumlah_ekor_ambil, jumlah_kg_ambil, nama_do]);
    } else if (action === 'delete') {
        query = `DELETE FROM data_bakul WHERE id = $1 RETURNING *;`;
        result = await client.query(query, [id]);
    } else if (action === 'droop') {
        query = `DROP TABLE IF EXISTS data_bakul;`;
        result = await client.query(query);
    } else if (action === 'edit') {
        query = `
        UPDATE data_bakul 
        SET tanggal = $1, nama_bakul = $2, plat_nomor = $3, jumlah_ekor_ambil = $4, jumlah_kg_ambil = $5, nama_do = $7 
        WHERE id = $6 
        RETURNING *;
        `;
        result = await client.query(query, [tanggal, nama_bakul, plat_nomor, jumlah_ekor_ambil, jumlah_kg_ambil, id, nama_do]);
    } else {
        throw new Error('Unsupported action');
    }

    console.log('Hasil query:', result.rows);

    client.release();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Operasi berhasil', data: result.rows }),
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
