import React, { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Ambil data dari API Next.js untuk menghubungkan ke database
      fetch('/api/data')
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data: ", error));
    }, 5000); // Mengambil data setiap 5 detik (5000 ms)

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, []); // Hanya dijalankan sekali ketika komponen mount

  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>This is a static site.</p>
      {/* Menampilkan data dari database */}
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
