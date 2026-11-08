// main.js — entry point aplikasi. Mengimpor semua modul dan menjalankan
// urutan inisialisasi yang sama seperti script.js versi lama.

import { state } from './state.js';
import { setCookie, getCookie, capitalizeWords, formatPlatNomor } from './utils.js';
import { initSidebar } from './sidebar.js';
import {
    data_thingspeak, INTERVAL_DATA_MS, data_thingspeak_2, eksekutor, keterangan_air, loadA1,
    wkt_on, setDefaultValue, fetchData, postData, createPieChart, setAnimasiPanah,
    pasangPelacakInputKalkulator
} from './app.js';

initSidebar();
pasangPelacakInputKalkulator();

//Math.floor(randomFraction * (5000 - 2000 + 1)) + 2000;

data_thingspeak();   // data pertama langsung, tidak menunggu interval
setInterval(data_thingspeak, INTERVAL_DATA_MS);
setInterval(eksekutor,100);
setInterval(keterangan_air, 8000);
setInterval(loadA1, 10000);
setInterval(data_thingspeak_2,60000);

// 🔥 Siapkan Cache di luar fungsi agar data dan Observer tidak ter-reset

state.toggleButton.addEventListener('click', function() {
    if (state.hiddenText.style.display == "none") {
        state.hiddenText.style.display = "block";
        state.toggleButton.textContent = "Sembunyikan Teks";
    } else {
        state.hiddenText.style.display = "none";
        state.toggleButton.textContent = "Lihat Teks Data";
    }
});

state.toggleButton2.addEventListener('click', function() {
    var myVar;
    var input_cookie = document.getElementById("input_test_kosong").value;
    if (input_cookie == "rakha25") {
        alert("Perangkat anda telah di atur menjadi mode pemilik kandang");
        myVar = "1";
        setCookie("owner", myVar, 7); 
        setDefaultValue();
        state.addButton.style.display = "block";
        state.dt_bakul.style.display = "block";
        state.dt_calc_chart.style.display = "block";
        fetchData();
        createPieChart();
    } else if (input_cookie == "ppl") {
        alert("Perangkat anda telah di atur menjadi mode ppl kandang untuk 1 hari");
        myVar = "2";
        setCookie("owner", myVar, 1); 
        setDefaultValue();
        state.addButton.style.display = "block";
        state.dt_bakul.style.display = "block";
        state.dt_calc_chart.style.display = "block";
        fetchData();
        createPieChart();
    } else if (input_cookie == '') {
        createPieChart();
        //alert("kosong");
    } else {
        myVar = "0";
        setCookie("owner", myVar, 7); 
        setDefaultValue();
        state.addButton.style.display = "none";
        state.dt_bakul.style.display = "none";
        state.dt_calc_chart.style.display = "none";
        //alert("oke");
    }
});

state.button_calculator.addEventListener('click', function() {
    if (state.hidden_calculator.style.display == "none") {
        state.hidden_calculator.style.display = "block";
        //hidden_calculator.textContent = "Sembunyikan Teks";
    } else {
        state.hidden_calculator.style.display = "none";
        //hidden_calculator.textContent = "Lihat Teks Data";
    }
});

state.button_bar1.addEventListener('click', function() {
    if (state.hidden_chart1.style.display == "none") {
        state.hidden_chart1.style.display = "block";
        state.button_bar1.textContent = "Sembunyikan Grafik";
    } else {
        state.hidden_chart1.style.display = "none";
        state.button_bar1.textContent = "Lihat Grafik";
    }
});

state.button_detail_kipas.addEventListener('click', function() {
    if (state.hidden_detail_kipas.style.display == "none") {
        state.hidden_detail_kipas.style.display = "block";
        state.button_detail_kipas.textContent = "Sembunyikan Detail";
    } else {
        state.hidden_detail_kipas.style.display = "none";
        state.button_detail_kipas.textContent = "Lihat Detail Kipas";
    }
});

setInterval(wkt_on, 1000);

if(getCookie("owner") == 1){
    state.hidden_detail_kipas.style.display = "none";
    state.button_detail_kipas.textContent = "Lihat Detail Kipas";
    state.addButton.style.display = "block";
    state.dt_bakul.style.display = "block";
    state.dt_calc_chart.style.display = "block"; 
    state.addButton.onclick = function() {
    state.modal.style.display = "block";
    state.dt_bakul.style.display = "block";
    state.dt_calc_chart.style.display = "block"; 
    }
}else if(getCookie("owner") == 2){
    state.hidden_detail_kipas.style.display = "block";
    state.addButton.style.display = "block";
    state.dt_bakul.style.display = "block";
    state.dt_calc_chart.style.display = "block"; 
    state.addButton.onclick = function() {
    state.modal.style.display = "block";
    state.dt_bakul.style.display = "block";
    state.dt_calc_chart.style.display = "block"; 
    }
}else{
    state.hidden_detail_kipas.style.display = "block";
    state.addButton.style.display = "none";
    state.dt_bakul.style.display = "none";
    state.dt_calc_chart.style.display = "none";   // pie chart & data panen hanya untuk owner/PPL
    
}

state.closeButton.onclick = function() {
    state.modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == state.modal) {
        state.modal.style.display = "none";
    }
}

state.submitButton.onclick = function() {
    var tanggal = document.getElementById("tanggal").value;
    var nama_do = document.getElementById("nama_do").value;
    var nama_bakul = document.getElementById("nama_bakul").value;
    var plat_nomor = document.getElementById("plat_nomor").value;
    var jumlah_ekor_ambil = document.getElementById("jumlah_ekor_ambil").value;
    var jumlah_kg_ambil = document.getElementById("jumlah_kg_ambil").value;
    if (!tanggal || !nama_do || !nama_bakul || !plat_nomor || !jumlah_ekor_ambil || !jumlah_kg_ambil) {
        alert("Semua kolom harus diisi!");
        //return false;
    }else{
        const testData = {
            action: 'insert',
            tanggal: tanggal,
            nama_bakul: capitalizeWords(nama_bakul),
            plat_nomor: formatPlatNomor(plat_nomor),
            jumlah_ekor_ambil: parseInt(jumlah_ekor_ambil),
            jumlah_kg_ambil: parseFloat(jumlah_kg_ambil), 
            nama_do: capitalizeWords(nama_do)     
        };
        postData(testData)
        state.modal.style.display = "none";            
    }
}


// script.js/

window.addEventListener('DOMContentLoaded', fetchData());

// Simpan referensi chart agar bisa diupdate

// Fungsi untuk mengonversi suhu ke warna HSL Spektrum Pelangi
        // HSL (Hue, Saturation, Lightness) sangat cocok untuk pelangi.
        // Hue 240 = Biru (Dingin), Hue 0 = Merah (Panas)

setAnimasiPanah(4, [0, 0, 2, 2]);
