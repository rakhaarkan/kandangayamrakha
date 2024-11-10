// netlify/functions/fetchData.js
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://datakandangayamrakha_owner:QPR73rjkFcoS@ep-nameless-band-a1x2caxb.ap-southeast-1.aws.neon.tech/datakandangayamrakha?sslmode=require',//process.env.POSTGRES_URL, // Gunakan env dari Netlify
  ssl: { rejectUnauthorized: false },
});

exports.handler = async function (event, context) {
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM playing_with_neon LIMIT 10');
    await client.end();
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database error', details: error.message }),
    };
  }
};

