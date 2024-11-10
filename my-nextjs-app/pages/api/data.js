import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL, // Pastikan Anda sudah menambahkan URL database di .env
  });

  try {
    await client.connect();
    
    // Ambil data dari tabel (ganti dengan query yang sesuai dengan database Anda)
    const result = await client.query('SELECT * FROM your_table');
    const data = result.rows;

    res.status(200).json(data); // Mengirim data ke frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.end();
  }
}
