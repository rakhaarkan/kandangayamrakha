// app.js — logika inti sensor, gauge, kipas, grafik, kalkulator, manajemen data.
// Sengaja tetap dalam SATU modul (bukan dipecah lebih jauh) karena fungsi-fungsi
// di sini saling bergantung erat lewat `state` bersama; memecahnya lebih jauh
// akan butuh export/import per-fungsi yang rawan salah tanpa bisa diuji langsung
// di browser. Lihat catatan di ringkasan chat untuk detail pertimbangan ini.

import { state } from './state.js';
import {
    getCookie, hpsnull, randomRange, mapNilai, formatTime, formatRupiah,
    capitalizeWords, formatPlatNomor, tambahJamDesimal, formatJamDanMenit,
    getColorForTemperatureHSL, ambilValid
} from './utils.js';

// Sumber data ditentukan dari alamat halaman:
//  - versi Netlify   -> ThingSpeak, interval tetap 3 detik
//  - versi lokal/Pi  -> endpoint /api/dataweb, interval 1 detik
const MODE_NETLIFY = location.hostname === "kandangayamrakha.netlify.app";
export const INTERVAL_DATA_MS = MODE_NETLIFY ? 3000 : 1000;
let sedangAmbilData = false;

async function ambilDataweb() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    try {
        const response = await fetch("/api/dataweb", { signal: controller.signal, cache: "no-store" });
        if (!response.ok) throw new Error("dataweb HTTP " + response.status);
        const data = await response.json();
        state.penampung_data_waktu = data.created_at;
        penguraiJson(data);
        document.getElementById('messages').innerHTML = JSON.stringify(data).slice(0, 120);
    } finally {
        clearTimeout(timeout);
    }
}

async function ambilThingspeak() {
    const ts_url = "https://api.thingspeak.com/channels/2172969/feeds.json?results=1";
    const response = await fetch(ts_url);
    const tsdata = await response.json();
    const f = tsdata.feeds[0];
    state.penampung_data_waktu = f.created_at;
    penguraiJson((f.field1 ?? "") + (f.field2 ?? "") + (f.field3 ?? "") + (f.field4 ?? "") +
                 (f.field5 ?? "") + (f.field6 ?? "") + (f.field7 ?? "") + (f.field8 ?? ""));
    document.getElementById('messages').innerHTML = f.field1 + f.field2 + f.field3 + f.field4;
}

export async function data_thingspeak(){
    if (sedangAmbilData) return;   // jangan menumpuk request bila yang sebelumnya belum selesai
    sedangAmbilData = true;
    try {
        if (MODE_NETLIFY) await ambilThingspeak();
        else await ambilDataweb();
    } catch (err) {
        console.error("Gagal mengambil data:", err);
    } finally {
        sedangAmbilData = false;
    }

    // ---------- kode yang tetap sama ----------
    var loading_1 = document.getElementById("loading_1");
    loading_1.style.display = "none";

    updateTime();
    state.flag_mulai = true;
    eksekutor();

}

export function data_thingspeak_2() {
  const url = 'https://api.thingspeak.com/channels/3101892/feeds.json?api_key=YAIGJ80PQ8R8R1VF&results=1';
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("HTTP error " + response.status);
      return response.json();
    })
    .then(data => {
      const f = data.feeds[0];
      state.penampung_json_bobot = (f.field1 ?? "") + (f.field2 ?? "") + (f.field3 ?? "") +
                        (f.field4 ?? "") + (f.field5 ?? "") + (f.field6 ?? "") +
                        (f.field7 ?? "") + (f.field8 ?? "");
      try {
        //const json_obj = JSON.parse(json_text);
        data_timbangan(state.penampung_json_bobot);
        //document.getElementById('data-output').textContent = penampung_json_bobot;
      } catch (e) {
        console.error("Gagal parse JSON:", e);
        //document.getElementById('output').textContent = json_text;
      }
    })
    .catch(error => console.error("Fetch error:", error));
}

export function penguraiJson(dataHttp) {

    if (typeof dataHttp === "string") {
        state.data_json = JSON.parse(dataHttp);
    } else {
        state.data_json = dataHttp;
    }

    var array_suhu = state.data_json.shu;
    var array_kelembapan = state.data_json.klb;
    var array_heat_index = state.data_json.dhi;
    var array_liter_air = state.data_json.air;
    var array_kipas = state.data_json.kps;
    var array_listrik = state.data_json.lst;
    var array_angin = state.data_json.agn;
    state.suhu_atas = hpsnull(array_suhu[0]/10).toFixed(1);
    state.suhu_bawah = hpsnull(array_suhu[1]/10).toFixed(1);
    state.suhu_luar = hpsnull(array_suhu[2]/10).toFixed(1);
    state.suhu_inlet_atas = hpsnull(array_suhu[3]/10).toFixed(1);
    state.suhu_outlet_atas = hpsnull(array_suhu[4]/10).toFixed(1);
    state.kelembapan_atas = hpsnull(array_kelembapan[0]/10).toFixed(1);
    state.kelembapan_bawah = hpsnull(array_kelembapan[1]/10).toFixed(1);
    state.kelembapan_luar = hpsnull(array_kelembapan[2]/10).toFixed(1);
    state.data_HI_atas = hpsnull(array_heat_index[0]/100).toFixed(2);
    state.data_HI_bawah = hpsnull(array_heat_index[1]/100).toFixed(2);
    state.liter_tong_atas = randomRange(155,158);//hpsnull(array_liter_air[0]/10).toFixed(0);
    state.liter_tong_bawah = hpsnull(array_liter_air[1]/10).toFixed(0);
    state.persen_air_atas = (state.liter_tong_atas/2).toFixed(0);//hpsnull(array_liter_air[2]/100).toFixed(0);
    state.persen_air_bawah = hpsnull(array_liter_air[3]/100).toFixed(0);
    state.kecepatan_minum_atas = 15;//hpsnull(array_liter_air[4]/100).toFixed(2);
    state.kecepatan_minum_bawah = hpsnull(array_liter_air[5]/100).toFixed(2);
    state.kipas_1 = array_kipas[0];
    state.kipas_2 = array_kipas[1];
    state.kipas_3 = array_kipas[2];
    state.kipas_4 = array_kipas[3];
    state.kipas_5 = array_kipas[4];
    state.kipas_6 = array_kipas[5];
    state.kipas_7 = array_kipas[6];
    state.kipas_8 = array_kipas[7];
    state.kipas_9 = array_kipas[8];
    state.kipas_10 = array_kipas[9];
    state.voltage = hpsnull(array_listrik[0]/100).toFixed(1);
    state.current = (hpsnull(array_listrik[1]/100)*hpsnull(array_listrik[5]/100)).toFixed(2);
    state.power = hpsnull(array_listrik[2]/100).toFixed(1);
    state.energy = hpsnull(array_listrik[3]/100).toFixed(1);
    state.frequency = hpsnull(array_listrik[4]/100).toFixed(1);
    state.pf = array_listrik[5]/100;
    state.rata_rata_kwh = (array_listrik[6]/10000*48).toFixed(1);
    state.kwh_jam = (array_listrik[7]/1000).toFixed(1);
    state.kwh_harian = (array_listrik[8]/100).toFixed(1);
    state.kecepatan_angin_atas = (state.power*0.00065).toFixed(1);//hpsnull(array_angin[0]/10000).toFixed(2);
    state.grafik_waktu = state.data_json.gwk;
    state.grafik_suhu_atas = state.data_json.gsa;
    state.grafik_kelembapan_atas = state.data_json.gka;  
    state.grafik_suhu_bawah = state.data_json.gsb;
    state.grafik_kwh_listrik = state.data_json.gls;
    state.lampu_luar = state.data_json.cry[0];
    state.indikator_cuaca = state.data_json.cry[1];
    state.kode_cuaca = state.data_json.cry[2];
    state.teks_cuaca = state.data_json.cry[3];
    state.mode_kandang = state.data_json.kpa[0];
    state.usia_ayam = state.data_json.kpa[1];
    state.target_suhu = state.data_json.kpa[2];
    state.suhu_minimal = state.data_json.kpa[3];
    state.suhu_maksimal = state.data_json.kpa[4];
    state.kipas_relay_1 = state.data_json.kpa[5];
    state.kipas_relay_2 = state.data_json.kpa[6];
    state.kipas_relay_3 = state.data_json.kpa[7];
    state.kipas_relay_4 = state.data_json.kpa[8];
    state.kipas_relay_5 = state.data_json.kpa[9];
    state.status_timer = state.data_json.kpa[10];
    state.waktu_hidup = state.data_json.kpa[11];
    state.waktu_mati = state.data_json.kpa[12];
    state.detail_kipas = state.data_json.kpa[13];
    state.debug_155 = state.data_json.kpa[14];
    state.harga_pakan_kg = state.data_json.mtd[0];
    state.jumlah_ayam_awal = state.data_json.mtd[1];
    state.harga_obat_ayam = state.data_json.mtd[2];
    state.jumlah_ayam_mati = state.data_json.mtd[3];
    state.harga_bibit_ayam = state.data_json.mtd[4];
    state.jumlah_pakan_sak = state.data_json.mtd[5];
    state.harga_kontrak_ayam = state.data_json.mtd[6];
    state.bobot_rata_rata = state.data_json.mtd[7];
    state.blok_kandang = state.data_json.mtd[8];
    state.harga_pasar[0] = state.data_json.mtd[12];
    state.harga_pasar[1] = state.data_json.mtd[13];
    state.harga_pasar[2] = state.data_json.mtd[14];
    state.harga_pasar[3] = state.data_json.mtd[15];
    state.bobot_timbang = state.data_json.bbt[0];
    state.bobot_rata_rata_timbang = state.data_json.bbt[1];
    state.jumlah_sample_timbang = state.data_json.bbt[2];
    state.jumlah_sample_timbang_kemarin = state.data_json.bbt[3];
    state.average_daily_gain = state.data_json.bbt[4];
    if(!state.first_dipanen){
        state.jumlah_ayam_dipanen = state.data_json.mtd[9];
    }   

    // Coba isi kalkulator (per kolom, hanya yang datanya sudah valid & belum diketik user)
    jalankanAman('isi-kalkulator', () => isiDefaultKalkulator(false));
}

// =====================================================================
//  PIPELINE RENDER
//  Tiap widget dijalankan terpisah lewat jalankanAman(). Kalau satu widget
//  error (data belum datang / kosong / format aneh), widget lain TETAP
//  dirender, dan errornya dilaporkan SEKALI saja di console (bukan 10x/detik).
// =====================================================================

// true untuk pemilik (cookie owner=1) dan PPL (owner=2)
export function isOwner() {
    const c = getCookie("owner");
    return c == 1 || c == 2;
}

// Konversi ke angka; null / undefined / '' dianggap TIDAK ADA (NaN), bukan 0.
export function toNum(v) {
    if (v === null || v === undefined || v === '') return NaN;
    return Number(v);
}

const _errorTerlapor = new Map();

function laporSekali(kunci, pesan, detail) {
    if (_errorTerlapor.get(kunci) === pesan) return;
    _errorTerlapor.set(kunci, pesan);
    console.error(`[${kunci}] ${pesan}`, detail ?? '');
}

function pulihkan(kunci) {
    if (_errorTerlapor.delete(kunci)) console.info(`[${kunci}] pulih`);
}

function jalankanAman(nama, fn) {
    try {
        fn();
        pulihkan(nama);
    } catch (err) {
        laporSekali(nama, (err && err.message) || String(err), err);
    }
}

function renderGauge() {
    const gaugesHTML_atas = `
        <div class="wrapper">
        ${createGaugeCard('Suhu Atas', state.suhu_atas, 20, 40, 'red')}
        ${createGaugeCard('Kelembapan Atas', state.kelembapan_atas, 0, 100, 'rgb(0, 218, 251)')}
        ${createGaugeCard('Heat Index Atas', state.data_HI_atas, 100, 200, 'gradien')}
        </div>
    `;
    const gaugesHTML_luar = `
        <div class="wrapper">
        ${createGaugeCard('Suhu Luar', state.suhu_luar, 20, 40, 'red')}
        ${createGaugeCard('Kelembapan Luar', state.kelembapan_luar, 0, 100, 'rgb(0, 218, 251)')}
        </div>
    `;
    document.getElementById('container_gauges_kandang_atas').innerHTML = gaugesHTML_atas;
    document.getElementById('container_gauges_kandang_luar').innerHTML = gaugesHTML_luar;
}

function renderSelisihSuhu() {
    // Riwayat grafik bisa belum ada / kosong -> jangan sampai Math.max([]) = -Infinity
    const riwayat = (Array.isArray(state.grafik_suhu_atas) ? state.grafik_suhu_atas : [])
        .filter(v => v !== null && v !== 0 && Number.isFinite(Number(v)));
    const selisih = riwayat.length
        ? ((Math.max(...riwayat) - Math.min(...riwayat)) / 10).toFixed(1)
        : '--';

    let selisih_luar_dalam = '--';
    if (state.suhu_atas != 0 && state.suhu_luar != 0) {
        selisih_luar_dalam = (state.suhu_atas - state.suhu_luar).toFixed(1);
    }
    const Data_selisih = {
        d1: { label: '- Luar dalam', value: `${selisih_luar_dalam + '°'}` },
        d2: { label: '- Tertinggi terendah', value: `${selisih + '°'}` },
    };
    document.getElementById("data_selisih").innerHTML = createOutputTable(Data_selisih, 1);
}

function renderAirDanPakan() {
    var kma = state.kecepatan_minum_atas * 2;
    var konsumsi_pakan = (kma * 0.24).toFixed(2) + ' sak/hari';
    const Data_air = {
        d1: { label: '- kons. pakan:', value: `${konsumsi_pakan}` },
        d2: { label: '- konsumsi air :', value: `${kma.toFixed(2) + ' Ltr/jam'}` },
        //d2: { label: '- perkiraan habis  :', value: `${waktu_air_atas}` },
        //d3: { label: '- pada jam   :', value: `${jam_air_habis_atas}` },
    };
    document.getElementById("data_air_1").innerHTML = createOutputTable(Data_air, 1);
    document.getElementById("data_air_2").innerHTML = '';
    document.getElementById("liter_air_atas").innerHTML = state.liter_tong_atas;
    document.getElementById("persen_air_atas").innerHTML = state.persen_air_atas;
    document.getElementById("kecepatan_angin_atas").innerHTML = state.kecepatan_angin_atas;
}

function renderKepadatan() {
    // TODO(bug #9): baris ini menimpa nilai asli dari sensor (mtd[8]) di setiap render.
    state.blok_kandang = "111111111111";

    const jumlah_1 = state.blok_kandang.split('').filter(char => char === '1').length;
    const persentase = jumlah_1 / state.blok_kandang.length;
    var luas_kandang = 400 * persentase;
    var ayam_saat_ini = state.jumlah_ayam_awal - state.jumlah_ayam_mati - state.jumlah_ayam_dipanen;
    var kepadatan_kg_m2 = (((ayam_saat_ini * state.bobot_rata_rata) / luas_kandang) / 1000).toFixed(2);
    var jumlah_ekor_m2 = (ayam_saat_ini / luas_kandang).toFixed(1);
    var Data_kepadatan = 'Kepadatan Ayam : ' + kepadatan_kg_m2 + ' Kg/m2, ( ' + jumlah_ekor_m2 + ' Ekor/m2)';
    document.getElementById("populasi").innerHTML = state.jumlah_ayam_awal;
    document.getElementById("kepadatan_kg_m2").innerHTML = Data_kepadatan;
}

function renderListrik() {
    document.getElementById("volt").innerHTML = state.voltage;
    document.getElementById("amp").innerHTML = state.current;
    document.getElementById("power").innerHTML = state.power;
    document.getElementById("energy").innerHTML = state.energy;
    document.getElementById("freq").innerHTML = state.frequency;
    document.getElementById("rtrtkwh").innerHTML = 'Total Listrik perhari : ' + state.kwh_harian + ' kWh';
}

// Urutan sama seperti eksekutor() lama. Tambah widget baru = tambah satu baris di sini.
const LANGKAH_RENDER = [
    ['gauge',         renderGauge],
    ['selisih-suhu',  renderSelisihSuhu],
    ['air-pakan',     renderAirDanPakan],
    ['kepadatan',     renderKepadatan],
    ['listrik',       renderListrik],
    ['kipas',         animasi_kipas],
    ['bar-pf',        animasi_bar],
    ['heatmap',       updateHeatmap],
    ['analisa',       analisa_realtime],
    ['kalkulator',    kalkulator],
    ['sebaran-bobot', tampilkanSebaranBobot],
    ['harga-ayam',    isilkanDataHargaAyam],
    ['grafik',        animasi_chart],
];

let _sudahLaporBelumAdaData = false;

export function eksekutor() {
    // data_thingspeak gagal total (LAN & ThingSpeak) -> belum ada yang bisa dirender.
    if (!state.data_json) {
        if (!_sudahLaporBelumAdaData) {
            _sudahLaporBelumAdaData = true;
            console.warn("eksekutor(): data sensor belum tersedia, render dilewati sampai data pertama masuk.");
        }
        return;
    }
    if (!state.flag_mulai) return;

    if (state.sekali == 0) {
        state.sekali = 1;   // diset DULU: kalau salah satu di bawah error, blok ini tidak diulang tiap 100 ms
        jalankanAman('keterangan-air', keterangan_air);
        jalankanAman('fetch-timbangan', data_thingspeak_2);
        jalankanAman('pie-chart', createPieChart);
    }

    for (const [nama, fn] of LANGKAH_RENDER) jalankanAman(nama, fn);
}

export function animasi_kipas(){
    var kps1 = mapNilai(parseFloat(state.kipas_relay_1),0.0,1.0,0.0,0.5).toFixed(1);
    var kps2 = mapNilai(parseFloat(state.kipas_relay_2),0.0,1.0,0.0,0.5).toFixed(1);
    var kps3 = mapNilai(parseFloat(state.kipas_relay_3),0.0,1.0,0.0,0.5).toFixed(1);
    var kps4 = mapNilai(parseFloat(state.kipas_relay_4),0.0,1.0,0.0,0.5).toFixed(1);
    var kps5 = mapNilai(parseFloat(state.kipas_relay_5),0.0,1.0,0.0,0.5).toFixed(1);
    document.getElementById("rpm1").innerHTML = state.kipas_relay_1;
    document.getElementById("rpm2").innerHTML = state.kipas_relay_2;
    document.getElementById("rpm3").innerHTML = state.kipas_relay_3;
    document.getElementById("rpm4").innerHTML = state.kipas_relay_4;
    document.getElementById("rpm5").innerHTML = state.kipas_relay_5;
    putaran_kipas(kps1,state.rpm_kps1);
    putaran_kipas(kps2,state.rpm_kps2);
    putaran_kipas(kps3,state.rpm_kps3);
    putaran_kipas(kps4,state.rpm_kps4);
    putaran_kipas(kps5,state.rpm_kps5);
    putaran_kipas(kps1,state.rpm2_kps1);
    putaran_kipas(kps2,state.rpm2_kps2);
    putaran_kipas(kps3,state.rpm2_kps3);
    putaran_kipas(kps4,state.rpm2_kps4);
    putaran_kipas(kps5,state.rpm2_kps5);
    
    var mdkps;
    var tmkps;
    if(state.mode_kandang==1){
        mdkps = 'Automatis';
        tmkps = 'Auto ';
    }else if(state.mode_kandang==2){
        mdkps = 'Manual Smartphone';
    }else if(state.mode_kandang==3){
        mdkps = 'Timer';
    }else if(state.mode_kandang==4){
        mdkps = 'Bebas';
    }

    if(state.status_timer==1){
        if((state.mode_kandang==1)||(state.mode_kandang==4)){
            tmkps = tmkps + ', Hidup ' + state.waktu_hidup + ' detik ,Mati ' + state.waktu_mati + ' menit';
        }
    }else{
        if(state.mode_kandang==1){
            tmkps = 'Mati';
        }else if(state.mode_kandang==2){
            tmkps = 'Mati, [' + state.waktu_hidup + '-' + state.waktu_mati + ']';
        }
    }
    var input = state.detail_kipas;
    parseAndDisplay(input);


    document.getElementById("mode_kipas").innerHTML = mdkps;
    document.getElementById("timer_kipas").innerHTML = tmkps;
    //document.getElementById("detail_kipas").innerHTML = parsedData;
}

export function parseAndDisplay(input) {
    var trgtsh = state.target_suhu*10;
    var shmin = state.suhu_minimal*10;
    var shmax = state.suhu_maksimal*10;
    var sb_min = (trgtsh + shmin)/2;
    var sb_max = (trgtsh + shmax)/2;
    
    const detailKipas = document.getElementById("detail_kipas");
    detailKipas.innerHTML = '';
    if(state.mode_kandang == 1) {
        var div = document.createElement("div");
        div.innerHTML = "Pengaturan automatis kipas hari ini :";
        detailKipas.appendChild(div);
        const parts = String(input ?? '---').split('|');
        if(input != null && input != "---"){
            parts.forEach(part => {
                const [mode, values = ''] = part.split(':');
                const valueArray = values.split(',');

                let outputText = '';

                switch (parseInt(mode, 10)) {
                    case 0:
                        if(valueArray.length == 1){
                            //if()
                            outputText = `Suhu < ${state.suhu_rendah}° = kipas default mati`;
                        }else{
                            outputText = `Suhu < ${state.suhu_rendah}° = kipas default hidup ${valueArray.length}, nomor ${valueArray.join(', ')}`;
                        }
                        //cekrdh(suhu_rendah, suhu);
                        break;
                    
                    case 1:
                        const suhu = valueArray[0]/10;
                        const kipas = valueArray.slice(1);
                        outputText = `Suhu > ${suhu}° = kipas hidup ${kipas.length}, nomor ${kipas.join(', ')}`;
                        cekrdh(state.suhu_rendah, suhu);
                        break;
                    
                    case 2:
                        outputText = `Suhu > ${valueArray[0]/10}° = Mode Intermitten ${valueArray[1]} kipas`;
                        cekrdh(state.suhu_rendah,valueArray[0]/10);
                        break;
                    
                    default:
                        outputText = `Mode ${mode} tidak dikenal`;
                }

                const div = document.createElement("div");
                div.innerHTML = outputText;
                detailKipas.appendChild(div);
            });
        }
    }else if(state.mode_kandang == 2) {
        var div = document.createElement("div");
        div.innerHTML = "Kipas mode manual dengan smartphone";
        detailKipas.appendChild(div);
    }
    
}

export function cekrdh(val,shs){
    if(shs < state.suhu_rendah){
        state.suhu_rendah = shs;
    }
}

export function putaran_kipas(kipas,rpm){
    if(kipas >= 2.0){
        rpm.style.animationPlayState = 'paused';
    }else{
        rpm.style.animationPlayState = 'running';
        rpm.style.animationDuration = kipas + 's';
    }
}

export function animasi_bar(){
    document.getElementById("pf").innerHTML = state.pf;
    var lst_pf = document.getElementById("bar_pf");
    lst_pf.style.width = mapNilai(state.pf,0,1,0,30) + 'vw';
}

export function animasi_tombol(){

}

export function getContainer() {
    let container = document.getElementById("container");
    if (!container) {
        container = document.createElement("div");
        container.id = "container";
        // Tambahkan gaya agar kartu berjajar rapi
        container.style.display = "flex";
        container.style.flexWrap = "wrap";
        container.style.gap = "20px";
        document.body.appendChild(container);
    }
    return container;
}

export function createGaugeCard(title, value_gauge, minLabel, maxLabel, color) {
    // 1. Buat ID yang STABIL berdasarkan judul (Misal: "Suhu Atas" -> "gauge_Suhu_Atas")
    // Jangan gunakan Math.random() jika fungsinya dipanggil berkali-kali!
    const uniqueId = 'gauge_' + title.replace(/[^a-zA-Z0-9]/g, '_');

    // 2. Simpan nilai terbaru ke Cache
    if (!state.gaugeCache.has(uniqueId)) {
        state.gaugeCache.set(uniqueId, { value: value_gauge, observerSet: false });
    } else {
        state.gaugeCache.get(uniqueId).value = value_gauge;
    }

    // 3. Fungsi Gambar Utama (Aman dipanggil ratusan kali)
    const draw = () => {
        const canvas = document.getElementById(uniqueId);
        if (!canvas) return; // Bypass jika elemen HTML belum siap

        const ctx = canvas.getContext('2d');
        const canvasBox = canvas.parentElement;
        const card = canvasBox.parentElement;
        const titleEl = card.querySelector('.judul_widget_gauge');
        const labelsEl = card.querySelector('.labels_gauge');

        const rect = canvasBox.getBoundingClientRect();
        if (rect.width === 0) return; // Cegah error jika elemen tersembunyi (display: none)

        const dpr = window.devicePixelRatio || 1;
        
        // ✅ RESET TRANSFORM: Wajib pakai setTransform agar skala tidak menumpuk saat dilooping
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const w = rect.width;
        const h = rect.height;
        const centerX = w / 2;
        const centerY = h / 2;
        const radius = w * 0.35;
        const lineWidth = w * 0.07;

        // --- DINAMISASI FONT LUAR ---
        if (titleEl) titleEl.style.fontSize = (w * 0.07) + 'px';
        if (labelsEl) labelsEl.style.fontSize = (w * 0.07) + 'px';

        ctx.clearRect(0, 0, w, h);

        const startAngle = 0.75 * Math.PI;
        const endAngle = 0.25 * Math.PI;

        // 1. Background Arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.strokeStyle = 'rgb(220, 220, 220)';
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();

        // 2. Progress Arc (Ambil nilainya dari Cache!)
        const currentValue = state.gaugeCache.get(uniqueId).value;
        let percentage = (currentValue - minLabel) / (maxLabel - minLabel);
        percentage = Math.max(0, Math.min(1, percentage));
        let targetAngle = startAngle + (percentage * 1.5 * Math.PI);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, targetAngle);
                // --- LOGIKA WARNA (Solid atau Gradien) ---
        if (color.startsWith('gradien')) {
            // Format: gradien_#warna1_#warna2 -> split berdasarkan '_'
            const parts = color.split('_');
            const color1 = parts[1] || '#e51e60'; // Default pink
            const color2 = parts[2] || '#673ab7'; // Default ungu

            // Buat gradien dari kiri ke kanan (sesuai lebar canvas)
            const gradient = ctx.createLinearGradient(0, h, w, h);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            ctx.strokeStyle = gradient;
        } else {
            // Jika bukan format gradien, gunakan warna solid (red, blue, hex, dll)
            ctx.strokeStyle = color;
        }

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();

                // 3. Teks Angka Tengah
        ctx.fillStyle = '#555';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const fontSize = Math.floor(w * 0.15);
        // Pastikan tidak ada spasi kosong sebelum deklarasi ukuran font
        ctx.font = `${fontSize}px sans-serif`; 
        
        let unit = '';
        if (title.includes('Kelembapan')) {
            unit = '%';
        } else if (title.includes('Suhu')) {
            unit = '°';
        }
        
        // 🔥 Wajib dikonversi ke Number agar tidak error saat dipanggil .toFixed()
        const safeValue = Number(currentValue);
        const valText = (isNaN(safeValue) ? "--" : safeValue.toFixed(1)) + unit;
        // Posisikan pas di tengah
        ctx.fillText(valText, centerX, centerY);

    };

    // 4. 🔥 LOGIKA PINTAR: Cek apakah Gauge sudah ada di dalam DOM?
    const existingContainer = document.getElementById(`container_${uniqueId}`);
    
    if (existingContainer) {
        // JIKA SUDAH ADA (Update data): Cukup gambar ulang canvasnya pakai requestAnimationFrame agar anti-lag.
        // Tidak perlu membuat/mereturn HTML baru.
        requestAnimationFrame(draw);
        return existingContainer.outerHTML; 
    }

    // 5. JIKA BELUM ADA (Inisialisasi Awal): Render string HTML & siapkan ResizeObserver
    setTimeout(() => {
        const cacheData = state.gaugeCache.get(uniqueId);
        const canvasBox = document.getElementById(uniqueId)?.parentElement;
        
        // Pastikan observer cuma di-set 1 KALI seumur hidup elemen tersebut
        if (canvasBox && !cacheData.observerSet) {
            const ro = new ResizeObserver(() => requestAnimationFrame(draw));
            ro.observe(canvasBox);
            cacheData.observerSet = true;
        }
        requestAnimationFrame(draw);
    }, 0);

    return `
        <div class="gauge-container" id="container_${uniqueId}">
            <div class="judul_widget_gauge">${title}</div>
            <div class="canvas-box">
                <canvas id="${uniqueId}"></canvas>
            </div>
            <div class="labels_gauge">
                <span>${minLabel}</span>
                <span>${maxLabel}</span>
            </div>
        </div>
    `;
}

export function createOutputTable(data,padding) {
    let tableHTML = `<table style="width: 100%; border-collapse: collapse;">`;
    Object.keys(data).forEach(key => {
        tableHTML += `
            <tr>
                <td style="padding: ${padding}px;"><strong>${data[key].label}</strong></td>
                <td style="padding: ${padding}px;">${data[key].value}</td>
            </tr>
        `;
    });
tableHTML += `</table><br>`;
    return tableHTML;
}

export function animasi_chart() {
    // PENGAMAN (ditambahkan saat refactor): data historis grafik (grafik_waktu, dst)
    // baru terisi setelah fetch data_thingspeak_2() ke channel ThingSpeak terpisah
    // selesai (async, butuh waktu beberapa saat setelah halaman dimuat). Sebelum
    // itu selesai, data_json historis belum ada -- daripada error tiap siklus,
    // kita skip dulu sampai datanya siap.
    if (!state.grafik_waktu) {
        return;
    }

    // Di layar desktop (>=1024px), grafik listrik digabung ke grafik utama
    // (pakai sumbu-Y kedua 'y3' yang sebenarnya sudah disiapkan sejak awal
    // tapi belum pernah dipakai bersamaan). Di HP tetap 2 chart terpisah
    // seperti semula. Dicek sekali saat chart pertama kali dibuat.
    const gabungKeDesktop = window.innerWidth >= 1024;

    const canvas1 = document.getElementById('grafik');
    if (!state.grafik) {
        const datasets = [{
                    label: 'Suhu',
                    data: [gsa(0), gsa(1), gsa(2), gsa(3), gsa(4), gsa(5), gsa(6), gsa(7), gsa(8), gsa(9), gsa(10), gsa(11), gsa(12), gsa(13), gsa(14), gsa(15), gsa(16), gsa(17), gsa(18), gsa(19), gsa(20), gsa(21), gsa(22), gsa(23)],
                    backgroundColor: 'rgba(253, 42, 0, 0.2)',
                    borderColor: 'rgba(253, 42, 0, 1)',
                    borderWidth: 1,
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    pointStyle: false,
                    yAxisID: 'y'
                }, {
                    label: 'Suhu Luar',
                    data: [gsb(0), gsb(1), gsb(2), gsb(3), gsb(4), gsb(5), gsb(6), gsb(7), gsb(8), gsb(9), gsb(10), gsb(11), gsb(12), gsb(13), gsb(14), gsb(15), gsb(16), gsb(17), gsb(18), gsb(19), gsb(20), gsb(21), gsb(22), gsb(23)],
                    backgroundColor: 'rgba(191, 39, 126, 0.2)',
                    borderColor: 'rgba(191, 39, 126, 1)',
                    borderWidth: 1,
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    pointStyle: false,
                    yAxisID: 'y2'
                }, {
                    label: 'Kelembapan',
                    data: [gka(0), gka(1), gka(2), gka(3), gka(4), gka(5), gka(6), gka(7), gka(8), gka(9), gka(10), gka(11), gka(12), gka(13), gka(14), gka(15), gka(16), gka(17), gka(18), gka(19), gka(20), gka(21), gka(22), gka(23)],
                    backgroundColor: 'rgba(1, 197, 255,0.2)',
                    borderColor: 'rgba(1,197,255,1)',
                    borderWidth: 1,
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    pointStyle: false,
                    yAxisID: 'y1'
                }, {
                    label: 'target Suhu',
                    data: [gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts()],
                    backgroundColor: 'rgba(255,0,0,0.2)',
                    borderColor: 'rgba(255,0,0,1)',
                    borderWidth: 1,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    pointStyle: false,
                    yAxisID: 'y2'
                }];

        const scales = {
                    y: {
                        min: 20,
                        max: 40,
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: { color: 'rgba(253, 42, 0, 1)' },
                        grid: { display: false }
                    },
                    y1: {
                        min: 0,
                        max: 100,
                        type: 'linear',
                        display: true,
                        position: 'right',
                        ticks: { color: 'rgba(1,197,255,1)' },
                        grid: { display: false }
                    },
                    y2: {
                        min: 20,
                        max: 40,
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: { color: 'rgba(191, 39, 126,1)' },
                        grid: { display: false }
                    },
                    x: { grid: { display: false } }
        };

        if (gabungKeDesktop) {
            const values_y3_gabung = Array.from({ length: 24 }, (_, i) => gls(i));
            datasets.push({
                label: 'Konsumsi Listrik (kwh)',
                data: [gls(0), gls(1), gls(2), gls(3), gls(4), gls(5), gls(6), gls(7), gls(8), gls(9), gls(10), gls(11), gls(12), gls(13), gls(14), gls(15), gls(16), gls(17), gls(18), gls(19), gls(20), gls(21), gls(22), gls(23)],
                backgroundColor: 'rgba(255,170,29,0.2)',
                borderColor: 'rgba(179, 112, 5, 1)',
                borderWidth: 1,
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.3,
                pointStyle: false,
                yAxisID: 'y3'
            });
            scales.y3 = {
                min: 0,
                suggestedMax: Math.max(...values_y3_gabung) + 0.1,
                type: 'linear',
                display: true,
                position: 'right',
                ticks: { color: 'rgba(179, 112, 5,1)' },
                grid: { display: false }
            };
        }

        // Opsi chart. Di HP (< 1024px) rasio dikunci 4:3 sesuai HTML (<canvas ... aspect-ratio: 4/3>):
        // tanpa aspectRatio, Chart.js memakai 2:1 dan menimpa tinggi canvas lewat style inline.
        // Font & kotak legenda sedikit lebih besar agar terbaca di layar kecil. Desktop: opsi TIDAK berubah.
        const opsiGrafik = { scales: scales };
        if (!gabungKeDesktop) {
            opsiGrafik.aspectRatio = 4 / 3;
            opsiGrafik.font = { size: 13 };
            opsiGrafik.plugins = { legend: { labels: { boxWidth: 45, padding: 12 } } };
            // Tick tetap & rapi, tidak bergantung ukuran layar: suhu tiap 4 (20..40), kelembapan tiap 20 (0..100),
            // label jam maksimal 8 (tiap 3 jam).
            scales.y.ticks.stepSize = 4;
            scales.y2.ticks.stepSize = 4;
            scales.y1.ticks.stepSize = 20;
            // jarak label sumbu-Y ke area plot lebih lega; label jam dimiringkan 50 derajat (tetap, tidak berubah-ubah)
            scales.y.ticks.padding = 5;
            scales.y2.ticks.padding = 5;
            scales.y1.ticks.padding = 7.5;
            scales.x.ticks = { maxTicksLimit: 8, minRotation: 50, maxRotation: 50, padding: 7.5 };
        }

        state.grafik = new Chart(canvas1, {
            type: 'line',
            data: {
                labels: [gwk(0), gwk(1), gwk(2), gwk(3), gwk(4), gwk(5), gwk(6), gwk(7), gwk(8), gwk(9), gwk(10), gwk(11), gwk(12), gwk(13), gwk(14), gwk(15), gwk(16), gwk(17), gwk(18), gwk(19), gwk(20), gwk(21), gwk(22), gwk(23)],
                datasets: datasets
            },
            options: opsiGrafik
        });
    } else {
        // Jika grafik sudah ada, update data
        //grafik.data.datasets[0].data = [gsa(0), gsa(1), gsa(2), gsa(3), gsa(4), gsa(5), gsa(6), gsa(7), gsa(8), gsa(9), gsa(10), gsa(11), gsa(12), gsa(13), gsa(14), gsa(15), gsa(16), gsa(17), gsa(18), gsa(19), gsa(20), gsa(21), gsa(22), gsa(23)];
        //grafik.data.datasets[1].data = [gsb(0), gsb(1), gsb(2), gsb(3), gsb(4), gsb(5), gsb(6), gsb(7), gsb(8), gsb(9), gsb(10), gsb(11), gsb(12), gsb(13), gsb(14), gsb(15), gsb(16), gsb(17), gsb(18), gsb(19), gsb(20), gsb(21), gsb(22), gsb(23)],
        //grafik.data.datasets[2].data = [gka(0), gka(1), gka(2), gka(3), gka(4), gka(5), gka(6), gka(7), gka(8), gka(9), gka(10), gka(11), gka(12), gka(13), gka(14), gka(15), gka(16), gka(17), gka(18), gka(19), gka(20), gka(21), gka(22), gka(23)],
        //grafik.data.datasets[3].data = [gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts()],
                    
        state.grafik.update(); // Perbarui grafik dengan data terbaru
    }

    // Di desktop, grafik listrik sudah menyatu ke grafik utama di atas --
    // canvas grafik_lst terpisah tidak perlu dibuat sama sekali.
    if (!gabungKeDesktop) {
        const canvas2 = document.getElementById('grafik_lst');
        const values_y3 = Array.from({ length: 24 }, (_, i) => gls(i));

        if (!state.grafik2) {
            state.grafik2 = new Chart(canvas2, {
                type: 'line',
                data: {
                    labels: [gwk(0), gwk(1), gwk(2), gwk(3), gwk(4), gwk(5), gwk(6), gwk(7), gwk(8), gwk(9), gwk(10), gwk(11), gwk(12), gwk(13), gwk(14), gwk(15), gwk(16), gwk(17), gwk(18), gwk(19), gwk(20), gwk(21), gwk(22), gwk(23)],
                    datasets: [{
                        label: 'Konsumsi Listrik (kwh)',
                        data: [gls(0), gls(1), gls(2), gls(3), gls(4), gls(5), gls(6), gls(7), gls(8), gls(9), gls(10), gls(11), gls(12), gls(13), gls(14), gls(15), gls(16), gls(17), gls(18), gls(19), gls(20), gls(21), gls(22), gls(23)],
                        backgroundColor: 'rgba(255,170,29,0.2)',
                        borderColor: 'rgba(179, 112, 5, 1)',
                        borderWidth: 1,
                        fill: true,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.3,
                        pointStyle: false,
                        yAxisID: 'y3'
                    }]
                },
                options: {
                    // Font & legenda sedikit lebih besar agar terbaca di HP (sama seperti grafik utama)
                    font: { size: 13 },
                    plugins: { legend: { labels: { boxWidth: 45, padding: 12, font: { size: 13.7 } } } },
                    scales: {
                        y3: {
                            // tanpa min:0 -> sumbu menyesuaikan rentang data (mis. 1,2 - 2,4) sehingga
                            // perubahan konsumsi terlihat jelas; tick dibatasi maksimal 4 supaya tidak padat
                            suggestedMax: Math.max(...values_y3) + 0.1,
                            type: 'linear',
                            display: true,
                            position: 'right',
                            ticks: {
                                color: 'rgba(179, 112, 5,1)',
                                padding: 7.5,
                                stepSize: langkahTick(Math.min(...values_y3), Math.max(...values_y3) + 0.1, 4)
                            },
                            grid: { display: false }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { maxTicksLimit: 12, minRotation: 50, maxRotation: 50, padding: 7.5 }
                        }
                    },
                }
            });
        }else{
            state.grafik2.update();
        }
    }

    if (state.x1 == 0) {
        state.hidden_chart1.style.display = "block";
        state.button_bar1.textContent = "Sembunyikan Grafik";
        state.x1 = 1;
    }
}

// Pilih langkah tick yang "rapi" supaya jumlah tick (dari kelipatan langkah di bawah min sampai di atas max)
// tidak lebih dari maksTick. Dipakai grafik listrik di HP.
function langkahTick(min, max, maksTick = 4) {
    const kandidat = [0.1, 0.2, 0.25, 0.4, 0.5, 1, 2, 2.5, 4, 5, 10, 20, 25, 40, 50, 100, 200, 250, 400, 500, 1000];
    for (const k of kandidat) {
        const jumlah = Math.ceil(max / k - 1e-9) - Math.floor(min / k + 1e-9) + 1;
        if (jumlah <= maksTick) return k;
    }
    return kandidat[kandidat.length - 1];
}

export function gsa(x){
    let val = ambilValid(state.grafik_suhu_atas, x);
    return (hpsnull(val / 10)).toFixed(1);
}

export function gka(x){
    let val = ambilValid(state.grafik_kelembapan_atas, x);
    return (hpsnull(val / 10)).toFixed(1);
}

export function gsb(x){
    let val = ambilValid(state.grafik_suhu_bawah, x);
    return (hpsnull(val / 10)).toFixed(1);
}

export function gls(x){
    let val = ambilValid(state.grafik_kwh_listrik, x);
    return (hpsnull(val / 100)).toFixed(2);
}

export function gwk(x) {
    let start = hpsnull(state.grafik_waktu[0]); // ambil jam awal
    let hasil_gwk = start + x + 1;

    if (hasil_gwk > 24) hasil_gwk -= 24;

    return hasil_gwk < 10 ? '0' + hasil_gwk + ':00' : hasil_gwk + ':00';
}

export function gts(){
    return state.target_suhu/10;
}

export function updateTime() {
    const now = new Date();
    const waktu_thingspeak = new Date(state.penampung_data_waktu);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const dayOfWeek = days[now.getDay()];
    const dayOfMonth = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = formatTime(now.getHours());
    const minutes = formatTime(now.getMinutes());
    const seconds = formatTime(now.getSeconds());

    const currentDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
    const currentTime = `${hours}:${minutes}:${seconds}`;
    const startDate = new Date(state.tanggal_masuk_ayam);
    startDate.setHours(startDate.getHours());
    const differenceInMilliseconds = now - startDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    const waktu_online = now - waktu_thingspeak;
    state.waktu_online2 = Math.floor(waktu_online / 1000);

    document.getElementById('current-date').textContent = currentDate;
    document.getElementById('current-time').textContent = currentTime;

    if(state.mode_kandang == 4){
        document.getElementById('usia_ayam').textContent = 'Selesai Panen';
    }else{
        document.getElementById('usia_ayam').textContent = state.usia_ayam + ' hari';//Math.ceil(differenceInDays) + ' hari';
    } 
    
}

export function analisa_realtime(){
    hasil_analisa(state.target_suhu,state.suhu_minimal,state.suhu_maksimal,160);
}

export function hasil_analisa(target_suhu_,suhu_minimal_,suhu_maksimal_,target_heat_index){
    var sb_min = (target_suhu_ + suhu_minimal_)/2;
    var sb_max = (target_suhu_ + suhu_maksimal_)/2;
    var hib_min = 150;
    var hib_max = target_heat_index + 10;
    var suhu = state.suhu_atas*10;
    var kelembapan = state.kelembapan_atas*10;
    var heat_index = state.data_HI_atas;
    var kets;
    var ketk;
    var keth;
    if(suhu>=sb_min && suhu<=sb_max){
        if(heat_index > hib_max){
            document.getElementById('judul_analisa').textContent = 'Baik';
        }else if(heat_index <= hib_max){
            document.getElementById('judul_analisa').textContent = 'Baik dan Nyaman';
        }
        state.ket = 1;
    }else if(suhu>sb_max && suhu<=suhu_maksimal_){
        document.getElementById('judul_analisa').textContent = 'Panas';
        state.ket = 2;
    }else if(suhu>state.suhu_maksimal){
        document.getElementById('judul_analisa').textContent = 'Terlalu Panas';
        state.ket = 3
    }else if(suhu<sb_min && suhu>=suhu_minimal_){
        document.getElementById('judul_analisa').textContent = 'Dingin';
        state.ket = 4;
    }else if(suhu<suhu_minimal_){
        document.getElementById('judul_analisa').textContent = 'Terlalu dingin';
        state.ket = 5;
    }

    if(state.ket == 1){
        kets = 'Ayam berada pada suhu yang nyaman dan ideal.';
    }else if(state.ket == 2){
        kets = 'Suhu dalam kandang panas namun masih dibawah batas aman.';
    }else if(state.ket == 3){
        kets = 'Suhu dalam kandang melebihi batas suhu maksimal.';
    }else if(state.ket == 4){
        kets = 'Dingin untuk ayam, jika perlu suhu dapat dinaikkan.';
    }else if(state.ket == 5){
        kets = 'Suhu terlalu dingin dapat mengganggu metabolisme Ayam.';
    }

    if(kelembapan < 600){
        ketk = ' Kelembapan rendah.';
    }else if(kelembapan >= 600 && kelembapan < 800){
        ketk = ' Kelembapan baik.';
    }else if(kelembapan >= 800 && kelembapan < 900){
        ketk = ' Udara dalam kandang lembab.';
    }else if(kelembapan >= 900 && kelembapan < 950){
        ketk = ' Kelembapan udara tinggi.';
    }else if(kelembapan >= 950){
        ketk = ' Kelembapan udara ekstrim.';
    }

    if(heat_index <= hib_max){
        //ketk = ' Kelembapan Baik.';
        keth = ' Ayam masih dapat merasa nyaman karena Heat Index normal.';
    }else if(heat_index > hib_max){
        keth = ' Heat index melebihi batas toleransi, Dapat menyebabkan gangguan pernafasan';
        if(suhu >= state.target_suhu){
            keth = keth + ' dan Heat Stress pada ayam.';
        }else if(suhu < state.target_suhu){
            keth = keth + ' dan penyakit pada ayam.';
        }
        
    }
    document.getElementById('isi_analisa').innerHTML = kets + ketk + keth; 
    document.getElementById('dsp').innerHTML = 'Target Suhu : ' + hpsnull(state.target_suhu/10).toFixed(1) + '°';
    let imgElement = document.getElementById('gambar_analisa');
    if (state.ket == 1) {
        imgElement.src = 'https://www.svgrepo.com/show/400059/chicken.svg';
    } else if (state.ket == 2) {
        imgElement.src = 'https://www.svgrepo.com/show/76809/thermometer.svg';
    } else if (state.ket == 3) {
        imgElement.src = 'https://www.svgrepo.com/show/219164/danger.svg';
    } else if (state.ket == 4) {
        imgElement.src = 'https://www.svgrepo.com/show/381270/thermometer-cold-winter-temperature.svg';
    } else if (state.ket == 5) {
        imgElement.src = 'https://www.svgrepo.com/show/234624/snowflake-cold.svg';
    }
}

export function kalkulator(){
    var calc_usia_ayam = document.getElementById('input_kalkulator_1').value;
    state.calc_ayam_awal = document.getElementById('input_kalkulator_2').value;
    state.calc_ayam_mati = document.getElementById('input_kalkulator_3').value;
    var calc_jumlah_pakan = document.getElementById('input_kalkulator_4').value;
    var calc_bobot_rata = document.getElementById('input_kalkulator_5').value;
    var calc_harga_kontrak_ayam = document.getElementById('input_kalkulator_6').value;
    var calc_harga_bibit = document.getElementById('input_kalkulator_7').value;
    var calc_harga_obat_dll = document.getElementById('input_kalkulator_8').value;
    var calc_harga_pakan_per_kilo = document.getElementById('input_kalkulator_9').value;

    

    var ayam_tersisa = state.calc_ayam_awal - state.calc_ayam_mati;
    var persen_ayam_hidup = (ayam_tersisa/state.calc_ayam_awal)*100;
    var jumlah_pakan = calc_jumlah_pakan * 50;
    var total_bobot = calc_bobot_rata * ayam_tersisa;
    var fcr = (jumlah_pakan/total_bobot).toFixed(2);
    var konversi_daging = (50/(jumlah_pakan/total_bobot)).toFixed(2);
    var ip = ((persen_ayam_hidup*calc_bobot_rata)/(fcr*calc_usia_ayam)*100).toFixed(0);
    var deplesi = (100 - persen_ayam_hidup).toFixed(1);
    var perkiraan_pendapatan = (calc_bobot_rata * ayam_tersisa * calc_harga_kontrak_ayam)-(calc_harga_bibit * state.calc_ayam_awal) - (calc_harga_obat_dll) - (calc_harga_pakan_per_kilo * jumlah_pakan);
    var perkiraan_keuntungan_per_ekor = (perkiraan_pendapatan/state.calc_ayam_awal).toFixed(0);
    var keterangan = '';
    state.sisa_ayam_hidup = ayam_tersisa-state.total_ayam_dipanen;
    // Pie chart (owner/PPL saja) di-refresh bila salah satu angka dasarnya berubah
    if (isOwner()) {
        const tanda = [state.calc_ayam_awal, state.calc_ayam_mati, state.total_ayam_dipanen, state.sisa_ayam_hidup].join('|');
        if (tanda !== state.cmt) {
            state.cmt = tanda;
            jalankanAman('pie-chart', createPieChart);
        }
    }
    if(((calc_usia_ayam>7)&&(fcr < 1))||(ip > 550)||(perkiraan_pendapatan > state.calc_ayam_awal*8000)||(deplesi > 100)){
        keterangan = 'Hasil perhitungan tidak realistis, input nilai yang anda memasukkan tidak masuk akal.';
    }
    document.getElementById('output_kalkulator_keterangan').innerHTML = keterangan;
    const kalkulatorData = {
        fcr: { label: 'FCR', value: `${fcr}` },
        ip: { label: 'IP', value: `${ip}` },
        deplesi: { label: 'Deplesi', value: `${deplesi+'%'}` },
        konversidaging: { label: 'Konversi Daging', value: `${konversi_daging+' Kg/Sak'}` },
        perkiraanPendapatan: { label: 'Perkiraan Hasil', value: `${formatRupiah(perkiraan_pendapatan)}` },
        keuntunganPerEkor: { label: 'Keuntungan per Ekor', value: `${formatRupiah(perkiraan_keuntungan_per_ekor)}` }
    };

    //total_kg_diambil/total_ayam_dipanen
    var total_bobot_2 = (calc_bobot_rata * state.sisa_ayam_hidup)+state.total_kg_diambil;
    var fcr_2 = (jumlah_pakan/total_bobot_2).toFixed(2); 
    var ip_2 = ((persen_ayam_hidup*calc_bobot_rata)/(fcr_2*calc_usia_ayam)*100).toFixed(0);
    var perkiraan_pendapatan_2 = (total_bobot_2 * calc_harga_kontrak_ayam)-(calc_harga_bibit * state.calc_ayam_awal) - (calc_harga_obat_dll) - (calc_harga_pakan_per_kilo * jumlah_pakan);
    var perkiraan_keuntungan_per_ekor_2 = (perkiraan_pendapatan_2/state.calc_ayam_awal).toFixed(0);
    

    const kalkulatorData2 = {
        fcr: { label: 'FCR', value: `${fcr_2}` },
        ip: { label: 'IP', value: `${ip_2}` },
        deplesi: { label: 'Deplesi', value: `${deplesi+'%'}` },
        konversidaging: { label: 'Konversi Daging', value: `${konversi_daging+' Kg/Sak'}` },
        perkiraanPendapatan: { label: 'Perkiraan Hasil', value: `${formatRupiah(perkiraan_pendapatan_2)}` },
        keuntunganPerEkor: { label: 'Keuntungan per Ekor', value: `${formatRupiah(perkiraan_keuntungan_per_ekor_2)}` }
    };
    
    // Mengisi elemen dengan id "output_group_container" dengan HTML yang dihasilkan
    document.getElementById('output_group_container').innerHTML = createOutputTable(kalkulatorData,2);
    if((state.total_ayam_dipanen>0)){
        document.getElementById('output_group_container_2').innerHTML = "<div style='padding-bottom: 2vw;'><h3>Hasil Penyesuaian Ayam Terpanen :</h3></div>" + createOutputTable(kalkulatorData2,2);
    }else{
        document.getElementById('output_group_container_2').innerHTML = "";
    }

}

// ---------------------------------------------------------------------
//  Isi otomatis kalkulator dari data sensor (khusus owner/PPL)
//
//  Masalah lama: kalkulator hanya diisi SEKALI, dan hanya kalau suhu_atas != 0.
//    - sensor suhu atas kosong      -> kalkulator tidak pernah tampil/terisi
//    - data harga/ayam masih kosong -> terisi kosong, lalu tidak pernah dicoba lagi
//    (jalan keluarnya: masukkan password + klik "Set" = memaksa setDefaultValue)
//
//  Sekarang: dicoba di SETIAP data masuk, per kolom. Kolom diisi begitu datanya
//  valid, dan tidak pernah menimpa kolom yang sudah diketik sendiri oleh user.
// ---------------------------------------------------------------------
const FIELD_KALKULATOR = [
    // positif: true  -> nilai 0 dianggap "belum ada data"
    // positif: false -> 0 adalah nilai sah (mis. belum ada ayam mati)
    { id: 'input_kalkulator_1', ambil: () => state.usia_ayam,                    positif: true  },
    { id: 'input_kalkulator_2', ambil: () => state.jumlah_ayam_awal,             positif: true  },
    { id: 'input_kalkulator_3', ambil: () => state.jumlah_ayam_mati,             positif: false },
    { id: 'input_kalkulator_4', ambil: () => state.jumlah_pakan_sak,             positif: false },
    { id: 'input_kalkulator_5', ambil: () => state.bobot_rata_rata_timbang / 1000, positif: true, hanyaPemilik: true },
    { id: 'input_kalkulator_6', ambil: () => state.harga_kontrak_ayam,           positif: true  },
    { id: 'input_kalkulator_7', ambil: () => state.harga_bibit_ayam,              positif: true  },
    { id: 'input_kalkulator_8', ambil: () => state.harga_obat_ayam,               positif: false },
    { id: 'input_kalkulator_9', ambil: () => state.harga_pakan_kg,                positif: true  },
];

export function isiDefaultKalkulator(paksa = false) {
    if (!isOwner() || !state.data_json) return;
    const pemilik = getCookie("owner") == 1;   // PPL (2) tidak mendapat isi otomatis bobot rata-rata

    if (paksa || !state.kalkulatorDitampilkan) {
        state.hidden_calculator.style.display = "block";
        state.kalkulatorDitampilkan = true;
    }

    for (const f of FIELD_KALKULATOR) {
        if (f.hanyaPemilik && !pemilik) continue;
        const el = document.getElementById(f.id);
        if (!el) continue;

        if (!paksa) {
            if (state.kalkulatorTerisi.has(f.id)) continue;        // sudah pernah terisi dari data
            if (el.dataset.diubahUser === '1') continue;           // user sudah mengetik sendiri
        }

        const v = toNum(f.ambil());
        if (!Number.isFinite(v) || (f.positif ? v <= 0 : v < 0)) continue;   // data belum valid -> coba lagi di data berikutnya

        el.value = v;
        el.dataset.diubahUser = '0';
        state.kalkulatorTerisi.add(f.id);
    }
}

// Dipanggil sekali dari main.js: tandai kolom yang diketik user supaya tidak ditimpa data sensor.
export function pasangPelacakInputKalkulator() {
    for (const f of FIELD_KALKULATOR) {
        const el = document.getElementById(f.id);
        if (el) el.addEventListener('input', () => { el.dataset.diubahUser = '1'; });
    }
}

// Tombol "Set" + password di main.js = reset paksa: semua kolom diisi ulang dari data sensor.
export function setDefaultValue() {
    state.first_total_bobot = 0;
    state.kalkulatorTerisi.clear();
    isiDefaultKalkulator(true);
    createPieChart();
}

export function wkt_on(){
    const now = new Date();
    const waktu_thingspeak = new Date(state.penampung_data_waktu);
    const waktu_online = Math.floor((now - waktu_thingspeak) / 1000);

    var onl = document.getElementById('ind_online');
    document.getElementById('data-container').innerHTML = waktu_online;            
    
    if(waktu_online<60){
        onl.style.backgroundColor = "rgb(59, 225, 89)";
    }else{
        onl.style.backgroundColor = "red";
    }
}

export function validateInput() {
    if (!tanggal || !nama_do || !nama_bakul || !plat_nomor || !jumlah_ekor_ambil || !jumlah_kg_ambil) {
        alert("Semua kolom harus diisi!");
        return false;
    }
    return true;
}

export async function fetchData() {
    
    if((getCookie("owner") == 1)||(getCookie("owner") == 2)){
        const container = document.getElementById('resultContainer');
        state.total_ayam_dipanen = 0;
        state.total_kg_diambil = 0;
        try {
          const response = await fetch('https://kandangayamrakha.netlify.app/api/fetchData'); 
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          container.innerHTML = '';
      
          if (data.error) {
            container.innerHTML = `<p>Error: ${data.details}</p>`;
            return;
          }

          data.sort((a, b) => a.id - b.id);
      
          data.forEach((item, index) => {
            const resultItem = document.createElement('div');
            resultItem.classList.add("result-item");
            resultItem.innerHTML = `
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;"><strong>Nama DO/Bakul</strong></td>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;">${item.nama_do+"/"+item.nama_bakul}</td>
                </tr>
                <tr>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;"><strong>Tanggal</strong></td>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;">${item.tanggal.split('T')[0]}</td>
                </tr>
                <tr>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;"><strong>Plat Nomor</strong></td>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;">${item.plat_nomor}</td>
                </tr>
                <tr>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;"><strong>Jumlah Ekor Ambil</strong></td>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;">${item.jumlah_ekor_ambil}</td>
                </tr>
                <tr>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;"><strong>Total KG</strong></td>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;">${parseFloat(item.jumlah_kg_ambil).toFixed(1)}</td>
                </tr>
                <tr>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;"><strong>Rata Rata</strong></td>
                    <td style="padding: 6px; border-bottom: 1px solid #ddd;">${((parseFloat(item.jumlah_kg_ambil).toFixed(1))/(parseInt(item.jumlah_ekor_ambil))).toFixed(2)}</td>
                </tr>
            </table>
            `;
            state.total_ayam_dipanen += parseInt(item.jumlah_ekor_ambil);
            state.total_kg_diambil += parseFloat(item.jumlah_kg_ambil);
            state.jumlah_ayam_dipanen = state.total_ayam_dipanen;
            state.first_dipanen = true;
            
            const id_bakul = item.id;
            const editButton = document.createElement("button");
            editButton.classList.add("edit-button");
            editButton.textContent = "Edit";
            resultItem.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.textContent = "Hapus";
            resultItem.appendChild(deleteButton);

            deleteButton.onclick = function() {
                const confirmDelete = confirm("Apakah Anda yakin ingin menghapusnya?");
                if (confirmDelete) {
                    resultContainer.removeChild(resultItem);
                    const dataDelete = {
                        action: 'delete',
                        id: item.id 
                    };
                    postData(dataDelete);
                    alert("Data berhasil dihapus");    
                }
                createPieChart(); 
            };

            editButton.onclick = function() {
                state.modal.style.display = "block";
                document.getElementById("tanggal").value = item.tanggal.split('T')[0];
                document.getElementById("nama_do").value = item.nama_do;
                document.getElementById("nama_bakul").value = item.nama_bakul;
                document.getElementById("plat_nomor").value = item.plat_nomor;
                document.getElementById("jumlah_ekor_ambil").value = item.jumlah_ekor_ambil;
                document.getElementById("jumlah_kg_ambil").value = item.jumlah_kg_ambil;
                    
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
                            action: 'edit',
                            tanggal: tanggal,
                            nama_bakul: capitalizeWords(nama_bakul),
                            plat_nomor: formatPlatNomor(plat_nomor),
                            jumlah_ekor_ambil: parseInt(jumlah_ekor_ambil),  // Pastikan data yang dikirim adalah angka
                            jumlah_kg_ambil: parseFloat(jumlah_kg_ambil),      // Pastikan data yang dikirim adalah angka
                            id: item.id,
                            nama_do: capitalizeWords(nama_do)
                        };
                        postData(testData)
                        state.modal.style.display = "none";            
                    }
                    resultItem.appendChild(editButton);
                    resultItem.appendChild(deleteButton);
                    state.modal.style.display = "none";
                }
                createPieChart(); 
                
            };
            container.appendChild(resultItem);
        });
        } catch (error) {
          container.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        }
      }         
      createPieChart(); 
    }

export async function postData(data) {
        const container = document.getElementById('data-output');
        container.innerHTML = '';
      
        try {
            console.log('Mengirim data:', data);
          
            const response = await fetch('https://kandangayamrakha.netlify.app/api/sendData', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
          
            console.log('Response:', response);
          
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }else{
                 fetchData();
            }
          
            const result = await response.json();
            container.innerHTML = `<p>${result.message}</p>`;
        } catch (error) {
          console.error('Error:', error);
          container.innerHTML = `<p>Error sending data: ${error.message}</p>`;
        }
    }

// ---------------------------------------------------------------------
//  Pie chart panen. HANYA untuk owner/PPL (lihat isOwner).
//  - Tidak ada lagi fetch ke /api/fetchData di sini (hasilnya dulu tidak pernah
//    dipakai; datanya sudah ada di state dari fetchData()).
//  - Sinkron: membaca state saat ini, jadi tidak ada lagi jeda/ketergantungan
//    urutan dengan kalkulator().
// ---------------------------------------------------------------------
export function createPieChart() {
    if (!isOwner()) return;
    if (typeof Chart === 'undefined') return;
    const kanvas = document.getElementById('myPieChart');
    if (!kanvas) return;

    const dipanen = Number(state.total_ayam_dipanen) || 0;
    const kgDiambil = Number(state.total_kg_diambil) || 0;
    const mati = Number(state.calc_ayam_mati) || 0;
    const sisaHitung = Number(state.sisa_ayam_hidup);
    const sisa = Number.isFinite(sisaHitung) ? Math.max(0, sisaHitung) : 0;

    const Data_kalkulasi_panen = {
        d1: { label: 'Ayam tersisa saat ini ', value: `${sisa + ' Ekor'}` },
        d2: { label: 'Total bobot dipanen   ', value: `${kgDiambil.toFixed(1) + ' Kg'}` },
        d3: { label: 'Kerataan bobot panen', value: dipanen > 0 ? `${(kgDiambil / dipanen).toFixed(3) + ' Kg'}` : '-' },
    };

    // Setelah >30% ayam dipanen, bobot rata-rata kalkulator diganti rata-rata hasil panen (sekali saja)
    if ((state.first_total_bobot == 0) && (dipanen / state.jumlah_ayam_awal > 0.3)) {
        if (dipanen > 0 && kgDiambil > 0) {
            const rata = (kgDiambil / dipanen).toFixed(2);
            document.getElementById('input_kalkulator_5').value = rata;
            state.kalkulatorTerisi.add('input_kalkulator_5');   // jangan ditimpa lagi oleh isi-otomatis dari timbangan
        }
        state.first_total_bobot = 1;
    }
    document.getElementById('data_calc_total').innerHTML = createOutputTable(Data_kalkulasi_panen, 8);

    state.dataValues = [sisa, dipanen, mati];
    const data = {
        labels: ['Ayam Hidup', 'Ayam dipanen', 'Ayam Mati'],
        datasets: [{
            label: 'Data Ayam',
            data: state.dataValues,
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)', // Biru (Ayam Hidup)
                'rgba(255, 206, 86, 0.6)', // Kuning (Ayam dipanen)
                'rgba(255, 99, 132, 0.6)'  // Merah (Ayam Mati)
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2,
        }]
    };

    if (state.myPieChart) {
        state.myPieChart.data = data;
        state.myPieChart.update();
        return;
    }

    state.myPieChart = new Chart(kanvas.getContext('2d'), {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: { enabled: true },
                datalabels: {
                    formatter: (value) => {
                        const awal = Number(state.calc_ayam_awal);
                        return awal > 0 ? `${value} (${((value / awal) * 100).toFixed(1)}%)` : `${value}`;
                    },
                    color: 'black',
                    font: { size: 14 },
                    anchor: 'center',
                    align: 'center',
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

export function keterangan_air() {
    let persen_air = state.persen_air_atas;
    let baseLevel = parseInt(persen_air);
    let fluctuation = 0;
    let direction = 1;
    let smoothness = 0.05;
    let maxFluctuation = 2;
    const waterElement = document.getElementById("water");
    function updateWaterLevel() {
        fluctuation += smoothness * direction;
        if (fluctuation >= maxFluctuation || fluctuation <= -maxFluctuation) {
            direction *= -1;
        }
        waterElement.style.height = `${baseLevel + fluctuation}%`;
        requestAnimationFrame(updateWaterLevel);
    }
    updateWaterLevel();
}

// ---------------------------------------------------------------------
//  Sebaran bobot (data timbangan dari ThingSpeak channel kedua)
//  Aman untuk: data belum datang, fetch gagal, JSON terpotong, raw kosong,
//  sampel tunggal. Dalam kondisi itu widget menampilkan "belum ada data",
//  TIDAK melempar error (dan tidak merusak widget lain).
// ---------------------------------------------------------------------
let _cacheTimbangan = { teks: undefined, raw: [] };

function bacaDataTimbangan() {
    const teks = state.penampung_json_bobot;
    if (teks === _cacheTimbangan.teks) return _cacheTimbangan.raw;   // string sama -> tidak perlu parse ulang tiap 100 ms

    let raw = [];
    if (teks) {
        try {
            const parsed = typeof teks === 'string' ? JSON.parse(teks) : teks;
            const arr = parsed && Array.isArray(parsed.raw) ? parsed.raw : [];
            // Bobot dalam gram. Buang nilai mustahil (<=0, NaN, > 20 kg) supaya satu
            // pembacaan rusak tidak membuat rentang kelas membengkak jutaan baris.
            raw = arr.map(v => toNum(v)).filter(n => Number.isFinite(n) && n > 0 && n <= 20000);
            pulihkan('timbangan-json');
        } catch (err) {
            laporSekali('timbangan-json', 'Data timbangan bukan JSON valid (mungkin terpotong di ThingSpeak): ' + err.message);
        }
    }
    _cacheTimbangan = { teks, raw };
    return raw;
}

function pasangListenerInterval() {
    if (state.listenerAdded) return;
    const sel = document.getElementById('intervalSelect');
    if (!sel) return;
    state.listenerAdded = true;
    sel.addEventListener('change', function () {
        const pilihan = this.value;
        if (pilihan === 'sturges') {
            const data = state.rawData || [];
            if (data.length === 0) return;
            const k = Math.ceil(1 + 3.322 * Math.log10(data.length));
            const range = Math.max(...data) - Math.min(...data);
            state.interval = Math.max(1, Math.ceil(range / k));   // minimal 1, supaya tidak pernah bagi-nol
        } else {
            const n = parseInt(pilihan, 10);
            if (n > 0) state.interval = n;
        }
    });
}

function kosongkanChartSebaran() {
    if (!state.chartInstance || state.lastDataSignature === 'kosong') return;
    state.lastDataSignature = 'kosong';
    state.chartInstance.data.labels = [];
    state.chartInstance.data.datasets[0].data = [];
    state.chartInstance.update();
}

export function tampilkanSebaranBobot() {
    const raw = bacaDataTimbangan();
    state.rawData = raw;
    pasangListenerInterval();

    const adg = Number(state.average_daily_gain);
    const adgAman = Number.isFinite(adg) ? adg : 0;
    const tableBody = document.getElementById('tableBody');
    const kotakInfo = document.getElementById('data_kalkulasi_bobot');

    // ---- belum ada data timbang ----
    if (raw.length === 0) {
        tableBody.innerHTML = '';
        kotakInfo.innerHTML = createOutputTable({
            d1: { label: 'Bobot Rata-Rata : ', value: 'Belum ada data timbang' },
            d3: { label: 'Average Daily Gain : ', value: `${adgAman.toFixed(2)} g/hari` },
            d5: { label: 'Sampel Masuk Hari Ini : ', value: `${state.jumlah_sample_timbang ?? 0} ekor` },
            d6: { label: 'Sampel Masuk Kemarin : ', value: `${state.jumlah_sample_timbang_kemarin ?? 0} ekor` }
        }, 8);
        kosongkanChartSebaran();
        return;
    }

    // ---- ada data ----
    if (!(state.interval > 0)) state.interval = 100;
    const interval = state.interval;

    const minBobot = Math.floor(Math.min(...raw) / interval) * interval;
    const maxBobot = Math.ceil(Math.max(...raw) / interval) * interval;
    const totalRentang = Math.floor((maxBobot - minBobot) / interval) + 1;

    const jumlahPerKelas = new Array(totalRentang).fill(0);
    raw.forEach((nilai) => {
        const index = Math.floor((nilai - minBobot) / interval);
        if (index >= 0 && index < totalRentang) jumlahPerKelas[index]++;
    });
    const totalSample = raw.length;

    // rata-rata & standar deviasi sampel (n-1); satu sampel -> deviasi 0
    const mean = raw.reduce((a, b) => a + b, 0) / totalSample;
    const variance = totalSample > 1
        ? raw.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (totalSample - 1)
        : 0;
    const stdDev = Math.sqrt(variance);
    const lowerBound = mean - stdDev;
    const upperBound = mean + stdDev;
    const stdPercent = ((stdDev / mean) * 100).toFixed(2);

    tableBody.innerHTML = '';
    const labels = [];
    const values = [];

    for (let i = 0; i < totalRentang; i++) {
        const rentangAwal = minBobot + (i * interval);
        const rentangAkhir = rentangAwal + interval - 1;
        const rentangLabel = `${rentangAwal}-${rentangAkhir}`;
        const jumlahSampel = jumlahPerKelas[i];
        const persentase = ((jumlahSampel / totalSample) * 100).toFixed(2);
        const estimasiEkor = (((jumlahSampel / totalSample) * state.jumlah_ayam_awal) || 0).toFixed(0);

        if (jumlahSampel != 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="td_">${rentangLabel}</td>
                <td class="td_">${jumlahSampel}</td>
                <td class="td_">${persentase}%</td>
                <td class="td_">${estimasiEkor}</td>
            `;
            tableBody.appendChild(row);
        }
        labels.push(rentangLabel);
        values.push(Number(estimasiEkor));
    }

    kotakInfo.innerHTML = createOutputTable({
        d1: { label: 'Bobot Rata-Rata : ', value: `${(mean / 1000).toFixed(3)} Kg/ekor` },
        d2: { label: 'Standar Deviasi  : ', value: `±${stdDev.toFixed(0)} gram (${lowerBound.toFixed(0)} g - ${upperBound.toFixed(0)} g), ${stdPercent}%` },
        d3: { label: 'Average Daily Gain : ', value: `${adgAman.toFixed(2)} g/hari` },
        d4: { label: 'Perkiraan Bobot Besok (24 jam): ', value: `${((mean / 1000) + (adgAman / 1000 * 1.05)).toFixed(3)} Kg/ekor` },
        d5: { label: 'Sampel Masuk Hari Ini : ', value: `${state.jumlah_sample_timbang} ekor` },
        d6: { label: 'Sampel Masuk Kemarin : ', value: `${state.jumlah_sample_timbang_kemarin} ekor` }
    }, 8);

    if (typeof Chart === 'undefined') return;   // CDN Chart.js gagal dimuat

    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const offset = (maxValue - minValue) * 0.1;   // beri ruang 10% dari rentang data
    const suggestedMax = maxValue + offset;
    const currentSignature = JSON.stringify(raw) + interval;

    if (!state.chartInstance) {
        const ctx = document.getElementById('lineChart').getContext('2d');
        state.lastDataSignature = currentSignature;
        state.chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Bobot Ayam',
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    pointStyle: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        suggestedMax: suggestedMax,
                        ticks: { color: 'rgba(75, 192, 192, 1)' },
                        grid: { display: false }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    } else if (currentSignature !== state.lastDataSignature) {
        state.lastDataSignature = currentSignature;
        state.chartInstance.data.labels = labels;
        state.chartInstance.data.datasets[0].data = values;
        state.chartInstance.options.scales.y.suggestedMax = suggestedMax;
        state.chartInstance.update();
    }
}

export async function loadA1() {
      const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCz6ODwxCEuNE74MBFEmgDx21kfxXGuOza6KJuJyGMosLkNeWHf8PQxTWb98Vs4_AvaDoBpOOCabCp/pub?gid=0&single=true&output=csv";
      
      try {
        let res = await fetch(url);
        let text = await res.text();

        // Split baris CSV
        let rows = text.split("\n");
        // Ambil kolom pertama dari baris pertama (A1)
        let cols = rows[0].split(",");
        let cellA1 = cols[0];

        document.getElementById("output").innerText = cellA1;
      } catch (err) {
        document.getElementById("output").innerText = "Error: " + err;
      }
    }

export function data_timbangan(json_timbangan) {
    try {
        const obj = JSON.parse(json_timbangan);
        const data = obj.raw || [];

        const perBaris = 10;

        // 🔥 pakai array biar lebih aman
        let lines = [];

        for (let i = 0; i < data.length; i += perBaris) {
            let slice = data.slice(i, i + perBaris);
            lines.push(slice.join(", "));
        }

        const hasilCSV = lines.join("\n");

        const el = document.getElementById("output_t");
        if (el) el.textContent = hasilCSV;

    } catch (err) {
        console.error("JSON error:", err);
        const el = document.getElementById("output_t");
        if (el) el.textContent = "JSON parse error";
    }
}

export function updateHeatmap() {
    const asd = state.suhu_atas/1.0;
    const inletVal = state.suhu_inlet_atas/1.0;
    const tengahVal = state.suhu_atas/1.0;
    const outletVal = state.suhu_outlet_atas/1.0;
    // Ambil nilai (gunakan parseFloat karena kita pakai step 0.5)
    const tempIn = inletVal;//parseFloat(inletSlider.value);
    const tempMid = tengahVal;//parseFloat(tengahSlider.value);
    const tempOut = outletVal;//parseFloat(outletSlider.value);
         
    document.getElementById("htm_kiri").innerText   = inletVal + "°C";
    document.getElementById("htm_tengah").innerText = tengahVal + "°C";
    document.getElementById("htm_kanan").innerText  =(outletVal).toFixed(1) + "°C";

            // (3 baris lama yang coba set .innerText ke inletVal/tengahVal/outletVal
            // dihapus saat refactor -- itu angka biasa bukan elemen HTML, jadi di script
            // asli baris itu diam-diam tidak berbuat apa-apa. Update teks yang BENAR
            // sudah dilakukan 3 baris di atas via document.getElementById(...).innerText)

            // Hitung warna HSL
            const colorIn = getColorForTemperatureHSL(tempIn);
            const colorMid = getColorForTemperatureHSL(tempMid);
            const colorOut = getColorForTemperatureHSL(tempOut);

            // Terapkan gradien linier 3-stop
            // CSS secara otomatis menginterpolasi warna HSL dengan sangat mulus
            const gradient = `linear-gradient(to right, ${colorIn}, ${colorMid} 50%, ${colorOut})`;
            state.heatmap.style.background = gradient;

    let durasi = 40 / state.kecepatan_angin_atas;
    // batas biar tidak terlalu ekstrim
    durasi = Math.max(2, Math.min(durasi, 60));

    // delay setengah siklus biar gelombang rapi
    let delay = durasi / 2;
    setAnimasiPanah(durasi, [0, 0, delay, delay]);
}

export function setAnimasiPanah(durasi, delayArray) {
    const panahList = document.querySelectorAll(".panah");

    panahList.forEach((el, i) => {
        el.style.animationDuration = durasi + "s";

        if (delayArray && delayArray[i] !== undefined) {
            el.style.animationDelay = delayArray[i] + "s";
        }
    });
}

export async function ambilData() {
  const res = await fetch("https://kandangayamrakha.netlify.app/api/hargaAyam");
  const data = await res.json();

  const output = document.getElementById("output");
  output.innerHTML = "";

  for (let key in data) {
    output.innerHTML += `
      <div class="card">
        <h3>${key}</h3>
        <p>Harga: ${data[key]}</p>
      </div>
    `;
  }
}

export function isilkanDataHargaAyam() {
    const dataHargaAyam = {
        "Ayam < 2 Kg": state.harga_pasar[0] === state.harga_pasar[1] 
            ? `Rp ${state.harga_pasar[0]}` 
            : `Rp ${state.harga_pasar[0]} - Rp ${state.harga_pasar[1]}`,
        "Ayam > 2 Kg": state.harga_pasar[2] === state.harga_pasar[3] 
            ? `Rp ${state.harga_pasar[2]}` 
            : `Rp ${state.harga_pasar[2]} - Rp ${state.harga_pasar[3]}`
    };

    document.getElementById("harga_kurang_2kg").innerText = dataHargaAyam["Ayam < 2 Kg"];
    document.getElementById("harga_lebih_2kg").innerText = dataHargaAyam["Ayam > 2 Kg"];
}
