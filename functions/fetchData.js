const { Client } = require('pg');

exports.handler = async (event, context) => {
    const connectionString = "postgresql://datakandangayamrakha_owner:QPR73rjkFcoS@ep-frosty-boat-a14cp3s0.ap-southeast-1.aws.neon.tech/datakandangayamrakha?sslmode=require";
    const client = new Client({
        connectionString,
    });

    try {
        await client.connect();
        const res = await client.query('SELECT * FROM your_table_name LIMIT 10'); // Ganti 'your_table_name' dengan nama tabel kamu
        await client.end();

        return {
            statusCode: 200,
            body: JSON.stringify(res.rows),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database query failed' }),
        };
    }
};
