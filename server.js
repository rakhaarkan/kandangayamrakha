// server.js
const WebSocket = require('ws');
const { Client } = require('pg');

// Menghubungkan ke database PostgreSQL
const client = new Client({
  connectionString: 'postgresql://datakandangayamrakha_owner:QPR73rjkFcoS@ep-nameless-band-a1x2caxb.ap-southeast-1.aws.neon.tech/datakandangayamrakha?sslmode=require',
});
client.connect();

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Mengirim data saat client terhubung
  ws.on('message', async (message) => {
    console.log(`Received: ${message}`);

    // Contoh query ke database
    try {
      const result = await client.query('SELECT * FROM playing_with_neon LIMIT 10');
      ws.send(JSON.stringify(result.rows));
    } catch (error) {
      ws.send(JSON.stringify({ error: 'Database error', details: error.message }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
