// utils.js — fungsi bantu murni, tidak bergantung pada state global

export function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

export function hpsnull(hps_null){
    if (hps_null !== null) {
        return hps_null;
    } else {
        return 0;
    }
}

export function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function mapNilai(nilai, dariMin, dariMax, keMin, keMax) {
    return (nilai - dariMin) * (keMax - keMin) / (dariMax - dariMin) + keMin;
}

export function tambahJamDesimal(jumlahJam) {
    const sekarang = new Date(); // Waktu saat ini
    const jam = Math.floor(jumlahJam); // Bagian jam (bilangan bulat)
    const menit = Math.round((jumlahJam - jam) * 60); // Konversi bagian desimal ke menit
    sekarang.setHours(sekarang.getHours() + jam); // Tambahkan jam
    sekarang.setMinutes(sekarang.getMinutes() + menit); // Tambahkan menit

    // Format menjadi "jam:menit"
    const hasilJam = String(sekarang.getHours()).padStart(2, '0');
    const hasilMenit = String(sekarang.getMinutes()).padStart(2, '0');
    return `${hasilJam}:${hasilMenit}`;
}

export function formatJamDanMenit(jumlahJam) {
    const jam = Math.floor(jumlahJam); // Ambil bagian jam (bilangan bulat)
    const menit = Math.round((jumlahJam - jam) * 60); // Konversi sisa desimal menjadi menit
    return `${jam} jam ${menit} menit`; // Format output
}

export function formatTime(time) {
    return (time < 10 ? '0' : '') + time;
}

export function ambilValid(arr, index, maxCheck = 24,mode=1) {
    let i = index;

    for (let step = 0; step < maxCheck; step++) {
        if(mode==1){
            if (i >= 0 && arr[i]<=1000 && arr[i] != 0 && arr[i] !== '' && !isNaN(arr[i]) ) {
                return arr[i];
            }
        }else if(mode==2){
            if (i >= 0 && arr[i]<=60 && arr[i] != 0 && arr[i] !== '' && !isNaN(arr[i]) ) {
                return arr[i];
            }
        }
        // Jika masih dalam range array
        

        // Mundur satu langkah ke index sebelumnya
        i--;
    }

    // Jika sampai 24 langkah tidak ketemu data valid
    return 0;
}

export function formatRupiah(angka) {
    return 'Rp.' + angka.toLocaleString('id-ID');
}

export function capitalizeWords(text) {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function formatPlatNomor(plat) {
    const parts = plat.split(' ');
    if (parts.length === 3) {
        const kodeWilayah = parts[0].toUpperCase();
        const angka = parts[1];
        const hurufAkhir = parts[2].toUpperCase();
        return `${kodeWilayah} ${angka} ${hurufAkhir}`;
    }
    return plat.toUpperCase();
}

export function getColorForTemperatureHSL(temp) {
            const minTemp = 24; // Biru
            const maxTemp = 34; // Merah

            // Batasi suhu dalam range
            temp = Math.max(minTemp, Math.min(maxTemp, temp));

            // Hitung rasio (0 = dingin, 1 = panas)
            const ratio = (temp - minTemp) / (maxTemp - minTemp);

            // Balikkan rasio untuk Hue karena 240(Biru) > 0(Merah)
            // Kita ingin transisi: 240 (Biru) -> 180 (Cyan) -> 120 (Hijau) -> 60 (Kuning) -> 0 (Merah)
            const hue = (1 - ratio) * 240;

            // Saturation 100% (Warna pekat), Lightness 50% (Normal)
            return `hsl(${hue}, 100%, 50%)`;
        }