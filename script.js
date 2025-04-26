function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

function toggleSidebar() {
    const sidebar = document.getElementById("mySidebar");
    const overlay = document.getElementById("overlay");
    const menuBtn = document.getElementById("menuBtn");
    const isOpen = sidebar.style.width === "250px";

    if (isOpen) {
      sidebar.style.width = "0";
      overlay.classList.remove("active");
      menuBtn.classList.remove("active");
    } else {
      sidebar.style.width = "250px";
      overlay.classList.add("active");
      menuBtn.classList.add("active");
    }
  }

  function navigate(event, url) {
    event.preventDefault(); // Mencegah navigasi default jika kondisi terpenuhi

    // Cek apakah pengguna sudah berada di halaman yang sama
    if (window.location.href === url) {
        console.log("Sudah berada di halaman ini, tidak perlu navigasi ulang.");
        toggleSidebar();
        return;
    }

    // Jika halaman berbeda, lakukan navigasi
    window.location.href = url;
}

function hpsnull(hps_null){
    if (hps_null !== null) {
        return hps_null;
    } else {
        return 0;
    }
}

var penampung_json_1;
var penampung_json_2;
var penampung_json_3;
var penampung_json_4;
var penampung_data_waktu;
const randomFraction = Math.random();
const randomValue = 4560;//Math.floor(randomFraction * (5000 - 2000 + 1)) + 2000;

var suhu_atas = 0;
var suhu_tengah = 0;
var suhu_bawah = 0;
var suhu_luar = 0;
var suhu_depan = 0;
var suhu_belakang = 0;
var suhu_greenhouse = 0;
var kelembapan_atas = 0;
var kelembapan_tengah = 0;
var kelembapan_bawah = 0;
var kelembapan_luar = 0;
var kelembapan_depan = 0;
var kelembapan_belakang = 0;
var kelembapan_greenhouse = 0;
var data_HI_atas = 0;
var data_HI_tengah = 0;
var data_HI_bawah = 0;
var data_HI_luar = 0;
var data_HI_depan = 0;
var data_HI_belakang = 0;
var data_HI_greenhouse = 0;
var ppm_gas_atas = 0;
var ppm_gas_tengah = 0;
var ppm_gas_bawah = 0;
var kecepatan_angin = 0;
var kecepatan_angin_atas = 0;
var kecepatan_angin_tengah = 0;
var kecepatan_angin_bawah = 0;
var intensitas_cahaya_atas = 0;
var intensitas_cahaya_tengah = 0;
var intensitas_cahaya_bawah = 0;
var liter_tong_atas = 0.00;
var liter_tong_bawah = 0.00;
var persen_air_atas = 0.00;
var persen_air_bawah = 0.00;
var kecepatan_minum_atas = 0.00;
var kecepatan_minum_bawah = 0.00;
var nomor_perangkat;
var indikator_ultrasonik = 0;
var intensitas_cahaya;
var jarak_ultrasonik;
var ult;
var tinggi_air_1;
var tinggi_air_2;
var indikator_p1 = 0;
var indikator_p2 = 0;
var indikator_p3 = 0;
var indikator_p4 = 0;
var indikator_p5 = 0;
var indikator_p6 = 0;
var target_heat_index = 155;
var target_suhu_atas_maksimal = 33;
var kipas_1 = 0;
var kipas_2 = 0;
var kipas_3 = 0;
var kipas_4 = 0;
var kipas_5 = 0;
var kipas_6 = 0;
var kipas_7 = 0;
var kipas_8 = 0;
var kipas_9 = 0;
var kipas_10 = 0;
var rpm_kipas;
var grafik_waktu;
var grafik_suhu_atas;
var grafik_suhu_luar;
var grafik_kelembapan_atas;
var grafik_kwh_listrik;
var voltage = 0;
var current = 0;
var power = 0;
var energy = 0;
var frequency = 0;
var pf = 0;
var rata_rata_kwh = 0;
var kwh_jam = 0;
var kwh_harian = 0;
var jam = 0;
var lampu_luar = 0;
var kode_cuaca = 0;
var teks_cuaca = "";
var indikator_cuaca = 0;
var tanggal_masuk_ayam;
var tanggal_masuk_ayam_hari;
var tanggal_masuk_ayam_bulan;
var tanggal_masuk_ayam_tahun;
var mode_kandang = 1;
var usia_ayam = 0;
var target_suhu;
var suhu_minimal;
var suhu_maksimal;
var kipas_relay_1;
var kipas_relay_2;
var kipas_relay_3;
var kipas_relay_4;
var kipas_relay_5;
var waktu_hidup = 0;
var waktu_mati = 0;
var status_timer = 0;
var detail_kipas = "---";
var debug_155 = "---";
var jumlah_ayam_awal = 0;
var jumlah_ayam_mati = 0;
var jumlah_pakan_sak = 0;
var bobot_rata_rata = 0;
var harga_kontrak_ayam = 0;
var harga_bibit_ayam = 0;
var harga_obat_ayam = 0;
var harga_pakan_kg = 0;
var epr_jumlah_ayam_mati;
var epr_jumlah_pakan_sak;
var blok_kandang = 0;
var jumlah_ayam_dipanen = 0;
var bobot_timbang = 0;
var bobot_rata_rata_timbang = 0;
var jumlah_sample_timbang = 0;
var sebaran_bobot = [];

var first_mqtt = false;
var flag_mulai = false;

function data_thingspeak(){
    const url = 'https://api.thingspeak.com/channels/2172969/feeds.json?results=1';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const fieldData_1 = data.feeds[0].field1;
                const fieldData_2 = data.feeds[0].field2;
                const fieldData_3 = data.feeds[0].field3;
                const fieldData_4 = data.feeds[0].field4;
                const lastUpdateTime = data.feeds[0].created_at;
                var json_chart = '{"gsa":[250,257,259,262,268,278,289,299,302,311,317,322,327,333,337,325,320,310,301,292,281,270,267,261,258],"gwk":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"gka":[850,857,859,762,268,278,289,299,302,311,317,322,327,333,337,325,320,310,301,292,281,270,267,261,258]}'
                var objek1 = JSON.parse(fieldData_1);
                var objek2 = JSON.parse(fieldData_2);
                var objek3 = JSON.parse(fieldData_3);
                var objek4 = JSON.parse(fieldData_4);
                penampung_json_1 = objek1;
                penampung_json_2 = objek2;
                penampung_json_3 = objek3;
                penampung_json_4 = objek4;
                penampung_data_waktu = lastUpdateTime;
                penguraiJson(1,fieldData_1,1);
                penguraiJson(1,fieldData_2,2);
                penguraiJson(1,fieldData_3,3);
                penguraiJson(1,fieldData_4,4);
                document.getElementById('messages').innerHTML = 'field1 : ' + fieldData_1 + ', field2 : ' + fieldData_2 + ', field3 : ' + fieldData_3 + ', field4 : ' + fieldData_4;
                var loading_1 = document.getElementById("loading_1");
                loading_1.style.display = "none";
                updateTime();
                flag_mulai = true;
                eksekutor();
                if(!first_mqtt){
                    koneksi_mqtt();
                    first_mqtt = true;
                }
            })
            //.catch(error => console.error('Error fetching data:', error));
            
}

const server_pusat_data = "http://192.168.0.150/";
const server_sensor_dalam = "http://192.168.0.151/";
const server_sensor_tangki_air = "http://192.168.0.152/";
const server_sensor_kipas = "http://192.168.0.153/";
const server_sensor_listrik = "http://192.168.0.154/";
const server_pusat_kipas_atas = "http://192.168.0.155/";
const server_kebun_kandang = "http://192.168.0.156/";
const server_saklar_cuaca_relay = "http://192.168.0.157/";

function data_server_lokal(){
    //getDataLocalServer(server_pusat_data);
    getDataLocalServer(server_sensor_dalam);
    getDataLocalServer(server_sensor_tangki_air);
    //getDataLocalServer(server_sensor_kipas);
    getDataLocalServer(server_sensor_listrik);
    getDataLocalServer(server_pusat_kipas_atas);
    //getDataLocalServer(server_kebun_kandang);
    //getDataLocalServer(server_saklar_cuaca_relay);
}
async function getDataLocalServer(url_local_server) {
    try {
     const response = await fetch(url_local_server);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    const groupSensor = await response.text();
    penguraiJson(2,groupSensor);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }
var first_dipanen = false;
function penguraiJson(kode,dataHttp,kode_2=0) {
    if(kode == 1){
        data_json = JSON.parse(dataHttp);
        if(kode_2 == 1){
            var array_suhu = data_json.shu;
            var array_kelembapan = data_json.klb;
            var array_heat_index = data_json.dhi;
            var array_liter_air = data_json.air;
            var array_kipas = data_json.kps;
            var array_listrik = data_json.lst;
            var array_angin = data_json.agn;
            suhu_atas = hpsnull(array_suhu[0]/10).toFixed(1);
            suhu_bawah = hpsnull(array_suhu[1]/10).toFixed(1);
            suhu_luar = hpsnull(array_suhu[2]/10).toFixed(1);
            kelembapan_atas = hpsnull(array_kelembapan[0]/10).toFixed(1);
            kelembapan_bawah = hpsnull(array_kelembapan[1]/10).toFixed(1);
            kelembapan_luar = hpsnull(array_kelembapan[2]/10).toFixed(1);
            data_HI_atas = hpsnull(array_heat_index[0]/100).toFixed(2);
            data_HI_bawah = hpsnull(array_heat_index[1]/100).toFixed(2);
            liter_tong_atas = hpsnull(array_liter_air[0]/10).toFixed(0);
            liter_tong_bawah = hpsnull(array_liter_air[1]/10).toFixed(0);
            persen_air_atas = hpsnull(array_liter_air[2]/100).toFixed(0);
            persen_air_bawah = hpsnull(array_liter_air[3]/100).toFixed(0);
            kecepatan_minum_atas = hpsnull(array_liter_air[4]/100).toFixed(2);
            kecepatan_minum_bawah = hpsnull(array_liter_air[5]/100).toFixed(2);
            kipas_1 = array_kipas[0];
            kipas_2 = array_kipas[1];
            kipas_3 = array_kipas[2];
            kipas_4 = array_kipas[3];
            kipas_5 = array_kipas[4];
            kipas_6 = array_kipas[5];
            kipas_7 = array_kipas[6];
            kipas_8 = array_kipas[7];
            kipas_9 = array_kipas[8];
            kipas_10 = array_kipas[9];
            voltage = hpsnull(array_listrik[0]/100).toFixed(1);
            current = (hpsnull(array_listrik[1]/100)*hpsnull(array_listrik[5]/100)).toFixed(2);
            power = hpsnull(array_listrik[2]/100).toFixed(1);
            energy = hpsnull(array_listrik[3]/100).toFixed(1);
            frequency = hpsnull(array_listrik[4]/100).toFixed(1);
            pf = array_listrik[5]/100;
            rata_rata_kwh = (array_listrik[6]/10000*48).toFixed(1);
            kwh_jam = (array_listrik[7]/10000).toFixed(1);
            kwh_harian = (array_listrik[8]/10).toFixed(1);
            kecepatan_angin_atas = hpsnull(array_angin[0]/10000).toFixed(2);
        }else if(kode_2 == 2){
            grafik_waktu = data_json.gwk;
            grafik_suhu_atas = data_json.gsa;
            grafik_kelembapan_atas = data_json.gka;  
        }else if(kode_2 == 3){
            grafik_suhu_bawah = data_json.gsb;
            grafik_kwh_listrik = data_json.gls;
            lampu_luar = data_json.cry[0];
            indikator_cuaca = data_json.cry[1];
            kode_cuaca = data_json.cry[2];
            teks_cuaca = data_json.cry[3];
        }else if(kode_2 == 4){
            mode_kandang = data_json.kpa[0];
            usia_ayam = data_json.kpa[1];
            target_suhu = data_json.kpa[2];
            suhu_minimal = data_json.kpa[3];
            suhu_maksimal = data_json.kpa[4];
            kipas_relay_1 = data_json.kpa[5];
            kipas_relay_2 = data_json.kpa[6];
            kipas_relay_3 = data_json.kpa[7];
            kipas_relay_4 = data_json.kpa[8];
            kipas_relay_5 = data_json.kpa[9];
            status_timer = data_json.kpa[10];
            waktu_hidup = data_json.kpa[11];
            waktu_mati = data_json.kpa[12];
            detail_kipas = data_json.kpa[13];
            debug_155 = data_json.kpa[14];
            harga_pakan_kg = data_json.mtd[0];
            jumlah_ayam_awal = data_json.mtd[1];
            harga_obat_ayam = data_json.mtd[2];
            jumlah_ayam_mati = data_json.mtd[3];
            harga_bibit_ayam = data_json.mtd[4];
            jumlah_pakan_sak = data_json.mtd[5];
            harga_kontrak_ayam = data_json.mtd[6];
            bobot_rata_rata = data_json.mtd[7];
            blok_kandang = data_json.mtd[8];
            bobot_timbang = data_json.bbt[0];
            bobot_rata_rata_timbang = data_json.bbt[1];
            jumlah_sample_timbang = data_json.bbt[2];
            /*sebaran_bobot[0] = 10;
            sebaran_bobot[1] = 2;
            sebaran_bobot[2] = 6;
            sebaran_bobot[3] = 2;
            sebaran_bobot[4] = 21;
            sebaran_bobot[5] = 6;
            sebaran_bobot[6] = 3;
            sebaran_bobot[7] = 0;
            sebaran_bobot[8] = 1;
            sebaran_bobot[9] = 0;
            sebaran_bobot[10] = 0;*/
            sebaran_bobot[0] = data_json.bbt[3];
            sebaran_bobot[1] = data_json.bbt[4];
            sebaran_bobot[2] = data_json.bbt[5];
            sebaran_bobot[3] = data_json.bbt[6];
            sebaran_bobot[4] = data_json.bbt[7];
            sebaran_bobot[5] = data_json.bbt[8];
            sebaran_bobot[6] = data_json.bbt[9];
            sebaran_bobot[7] = data_json.bbt[10];
            sebaran_bobot[8] = data_json.bbt[11];
            sebaran_bobot[9] = data_json.bbt[12];
            sebaran_bobot[10] = data_json.bbt[13];
            if(!first_dipanen){
                jumlah_ayam_dipanen = data_json.mtd[9];
            }
        }
    }else if(kode == 2){
        try {
        const terimaJson = JSON.parse(dataHttp);
        const nomorJson = terimaJson.dta[0];
        if (nomorJson === 1) {
            suhu_atas = terimaJson.shu[0];
            suhu_bawah = terimaJson.shu[1];
            kelembapan_atas = terimaJson.klb[0];
            kelembapan_bawah = terimaJson.klb[1];
            data_HI_atas = terimaJson.dhi[0];
            data_HI_bawah = terimaJson.dhi[1];
        } else if (nomorJson === 2) {
            liter_tong_atas = terimaJson.air[0];
            persen_air_atas = terimaJson.air[1];
            liter_tong_bawah = terimaJson.air[2];
            persen_air_bawah = terimaJson.air[3];
        } else if (nomorJson === 3) {
            kipas_1 = terimaJson.kps[0];
            kipas_2 = terimaJson.kps[1];
            kipas_3 = terimaJson.kps[2];
            kipas_4 = terimaJson.kps[3];
            kipas_5 = terimaJson.kps[4];
        } else if (nomorJson === 4) {
            if (terimaJson.lst[0] !== 0) voltage = terimaJson.lst[0];
            current = terimaJson.lst[1];
            power = terimaJson.lst[2];
            if (terimaJson.lst[3] !== 0) energy = terimaJson.lst[3];
            frequency = terimaJson.lst[4];
            pf = terimaJson.lst[5];
            rata_rata_kwh = terimaJson.lst[6];
        } else if (nomorJson === 5) {
            mode_kandang = terimaJson.kpa[0];
            tanggal_masuk_ayam_hari = terimaJson.kpa[1];
            tanggal_masuk_ayam_bulan = terimaJson.kpa[2];
            tanggal_masuk_ayam_tahun = terimaJson.kpa[3];
            usia_ayam = terimaJson.kpa[4];
            target_suhu = terimaJson.kpa[5];
            suhu_minimal = terimaJson.kpa[6];
            suhu_maksimal = terimaJson.kpa[7];
            kipas_relay_1 = terimaJson.kpa[8];
            kipas_relay_2 = terimaJson.kpa[9];
            kipas_relay_3 = terimaJson.kpa[10];
            kipas_relay_4 = terimaJson.kpa[11];
            kipas_relay_5 = terimaJson.kpa[12];
            status_timer = terimaJson.kpa[13];
            waktu_hidup = terimaJson.kpa[14];
            waktu_mati = terimaJson.kpa[15];
            detail_kipas = terimaJson.kpa[16];
            debug_155 = terimaJson.kpa[18];
        } else if (nomorJson === 6) {
            // nothing
        } else if (nomorJson === 7) {
            lampu_luar = terimaJson.cry[0];
            indikator_cuaca = terimaJson.cry[1];
            kode_cuaca = terimaJson.cry[2];
            teks_cuaca = String(terimaJson.cry[3]);
        }
        } catch (error) {
        console.error("JSON parsing error:", error.message);
        }
    }
}
  
setInterval(data_thingspeak,randomValue);
setInterval(eksekutor,100);
setInterval(keterangan_air, 8000);
    
var sekali = 0;

function eksekutor(){
    if(flag_mulai){
        if(sekali==0){
            keterangan_air();
            sekali = 1;
        }
        const gaugesHTML_atas = `
            <div class="wrapper">
            ${createGaugeCard('Suhu Atas', suhu_atas, 40, '20', '40', 'red')}
            ${createGaugeCard('Kelembapan Atas', kelembapan_atas, 40, '0', '100', 'rgb(0, 218, 251)')}
            ${createGaugeCard('Heat Index Atas', data_HI_atas,40, '100', '200', 'url(#GradientColor)')}
            </div>
        `;
        const gaugesHTML_luar = `
            <div class="wrapper">
            ${createGaugeCard('Suhu Luar', suhu_luar, 40, '20', '40', 'red')}
            ${createGaugeCard('Kelembapan Luar', kelembapan_luar, 40, '0', '100', 'rgb(0, 218, 251)')}
            </div>
        `;
        var filteredValues = 0;
        var nilaiTertinggi = 0;
        var nilaiTerendah = 0;
        filteredValues = grafik_suhu_atas.filter(value => value !== 0);
        nilaiTertinggi = Math.max(...filteredValues);
        nilaiTerendah = Math.min(...filteredValues);
        const selisih = ((nilaiTertinggi - nilaiTerendah)/10000).toFixed(1);
        var selisih_luar_dalam = "NaN";
        if (suhu_atas != 0 && suhu_luar != 0) {
            selisih_luar_dalam = (suhu_atas - suhu_luar).toFixed(1);
        }
        const Data_selisih = {
            d1: { label: '- Luar dalam', value: `${selisih_luar_dalam+'°'}` },
            d2: { label: '- Tertinggi terendah', value: `${selisih+'°'}` },
        };
        var kma = kecepatan_minum_atas*2;//;
        var sisa_jam_1 = ((liter_tong_atas/kma));
        var waktu_air_atas = formatJamDanMenit(sisa_jam_1);
        var jam_air_habis_atas = tambahJamDesimal(sisa_jam_1);
        var konsumsi_pakan = (kma*0.24).toFixed(2)+' sak/hari';
        var konsumsi_pakan_2 = (kma*0.5).toFixed(2)+' kg/jam';
        const Data_air = {
            d1: { label: '- kons. pakan:', value: `${konsumsi_pakan}` },
            d2: { label: '- konsumsi air :', value: `${kma.toFixed(2)+' Ltr/jam'}` },
            //d2: { label: '- perkiraan habis  :', value: `${waktu_air_atas}` },
            //d3: { label: '- pada jam   :', value: `${jam_air_habis_atas}` },
        };
        blok_kandang = "111111111111";
        //jumlah_ayam_dipanen = 290;

        const jumlah_1 = blok_kandang.split('').filter(char => char === '1').length;
        const total_digit = blok_kandang.length;
        const persentase = (jumlah_1 / total_digit);
        var Data_air_2 = 'perkiraan air habis dalam '+waktu_air_atas+', pada jam '+jam_air_habis_atas;
        var luas_kandang = 400*persentase;
        var ayam_saat_ini = jumlah_ayam_awal-jumlah_ayam_mati-jumlah_ayam_dipanen;
        var kepadatan_kg_m2 = (((ayam_saat_ini*bobot_rata_rata)/luas_kandang)/1000).toFixed(2);
        var jumlah_ekor_m2 = (ayam_saat_ini/luas_kandang).toFixed(1);
        var Data_kepadatan = 'Kepadatan Ayam : ' + kepadatan_kg_m2 +' Kg/m2, ( ' + jumlah_ekor_m2 + ' Ekor/m2)';
        document.getElementById('container_gauges_kandang_atas').innerHTML = gaugesHTML_atas;
        document.getElementById('container_gauges_kandang_luar').innerHTML = gaugesHTML_luar;
        //document.getElementById('gaugesha').innerHTML = gaugesha;
        document.getElementById("populasi").innerHTML = jumlah_ayam_awal;
        document.getElementById("kepadatan_kg_m2").innerHTML = Data_kepadatan;
        //document.getElementById("jumlah_ekor_m2").innerHTML = jumlah_ekor_m2;
        document.getElementById("kecepatan_angin_atas").innerHTML = kecepatan_angin_atas;
        document.getElementById("data_selisih").innerHTML = createOutputTable(Data_selisih,1);
        document.getElementById("data_air_1").innerHTML = createOutputTable(Data_air,1);
        document.getElementById("data_air_2").innerHTML = Data_air_2;
        document.getElementById("liter_air_atas").innerHTML = liter_tong_atas;
        document.getElementById("persen_air_atas").innerHTML = persen_air_atas;
        document.getElementById("volt").innerHTML = voltage;
        document.getElementById("amp").innerHTML = current;
        document.getElementById("power").innerHTML = power;
        document.getElementById("energy").innerHTML = energy;
        document.getElementById("freq").innerHTML = frequency;
        document.getElementById("rtrtkwh").innerHTML = 'Rata Rata Listrik perhari : ' + (kwh_jam*24).toFixed(1) + ' kWh';
        animasi_kipas();
        animasi_bar();
        animasi_tombol();
        analisa_realtime();
        kalkulator();
        tampilkanSebaranBobot();
        animasi_chart();
        //fetchData();
    }
}

function mapNilai(nilai, dariMin, dariMax, keMin, keMax) {
    return (nilai - dariMin) * (keMax - keMin) / (dariMax - dariMin) + keMin;
}

function tambahJamDesimal(jumlahJam) {
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

function formatJamDanMenit(jumlahJam) {
    const jam = Math.floor(jumlahJam); // Ambil bagian jam (bilangan bulat)
    const menit = Math.round((jumlahJam - jam) * 60); // Konversi sisa desimal menjadi menit
    return `${jam} jam ${menit} menit`; // Format output
}

var rpm_kps1 = document.getElementById('square1');
var rpm_kps2 = document.getElementById('square2');
var rpm_kps3 = document.getElementById('square3');
var rpm_kps4 = document.getElementById('square4');
var rpm_kps5 = document.getElementById('square5');
    
function animasi_kipas(){
    var kps1 = mapNilai(parseFloat(kipas_relay_1),0.0,1.0,0.0,0.5).toFixed(1);
    var kps2 = mapNilai(parseFloat(kipas_relay_2),0.0,1.0,0.0,0.5).toFixed(1);
    var kps3 = mapNilai(parseFloat(kipas_relay_3),0.0,1.0,0.0,0.5).toFixed(1);
    var kps4 = mapNilai(parseFloat(kipas_relay_4),0.0,1.0,0.0,0.5).toFixed(1);
    var kps5 = mapNilai(parseFloat(kipas_relay_5),0.0,1.0,0.0,0.5).toFixed(1);
    document.getElementById("rpm1").innerHTML = kipas_relay_1;
    document.getElementById("rpm2").innerHTML = kipas_relay_2;
    document.getElementById("rpm3").innerHTML = kipas_relay_3;
    document.getElementById("rpm4").innerHTML = kipas_relay_4;
    document.getElementById("rpm5").innerHTML = kipas_relay_5;
    putaran_kipas(kps1,rpm_kps1);
    putaran_kipas(kps2,rpm_kps2);
    putaran_kipas(kps3,rpm_kps3);
    putaran_kipas(kps4,rpm_kps4);
    putaran_kipas(kps5,rpm_kps5);
    
    var mdkps;
    var tmkps;
    if(mode_kandang==1){
        mdkps = 'Automatis';
        tmkps = 'Auto ';
    }else if(mode_kandang==2){
        mdkps = 'Manual';
    }else if(mode_kandang==3){
        mdkps = 'Bebas';
    }

    if(status_timer==1){
        if(mode_kandang==1){
            tmkps = tmkps + ', Hidup ' + waktu_hidup + ' detik ,Mati ' + waktu_mati + ' menit';
        }
    }else{
        if(mode_kandang==1){
            tmkps = 'Mati';
        }else if(mode_kandang==2){
            tmkps = 'Mati, [' + waktu_hidup + '-' + waktu_mati + ']';
        }
    }
    var input = detail_kipas;
    parseAndDisplay(input);


    document.getElementById("mode_kipas").innerHTML = mdkps;
    document.getElementById("timer_kipas").innerHTML = tmkps;
    //document.getElementById("detail_kipas").innerHTML = parsedData;
}

var suhu_rendah = 33.0;    
function parseAndDisplay(input) {
    var trgtsh = target_suhu*10;
    var shmin = suhu_minimal*10;
    var shmax = suhu_maksimal*10;
    var sb_min = (trgtsh + shmin)/2;
    var sb_max = (trgtsh + shmax)/2;
    
    const detailKipas = document.getElementById("detail_kipas");
    detailKipas.innerHTML = '';
    if(mode_kandang == 1) {
        var div = document.createElement("div");
        div.innerHTML = "Pengaturan automatis kipas hari ini :";
        detailKipas.appendChild(div);
        const parts = input.split('|');
        if(input!="---"){
            parts.forEach(part => {
                const [mode, values] = part.split(':');
                const valueArray = values.split(',');

                let outputText = '';

                switch (parseInt(mode, 10)) {
                    case 0:
                        if(valueArray.length == 1){
                            //if()
                            outputText = `Suhu < ${suhu_rendah}° = kipas default mati`;
                        }else{
                            outputText = `Suhu < ${suhu_rendah}° = kipas default hidup ${valueArray.length}, nomor ${valueArray.join(', ')}`;
                        }
                        //cekrdh(suhu_rendah, suhu);
                        break;
                    
                    case 1:
                        const suhu = valueArray[0]/10;
                        const kipas = valueArray.slice(1);
                        outputText = `Suhu > ${suhu}° = kipas hidup ${kipas.length}, nomor ${kipas.join(', ')}`;
                        cekrdh(suhu_rendah, suhu);
                        break;
                    
                    case 2:
                        outputText = `Suhu > ${valueArray[0]/10}° = Mode Intermitten ${valueArray[1]} kipas`;
                        cekrdh(suhu_rendah,valueArray[0]/10);
                        break;
                    
                    default:
                        outputText = `Mode ${mode} tidak dikenal`;
                }

                const div = document.createElement("div");
                div.innerHTML = outputText;
                detailKipas.appendChild(div);
            });
        }
    }else if(mode_kandang == 2) {
        var div = document.createElement("div");
        div.innerHTML = "Kipas mode manual dengan smartphone";
        detailKipas.appendChild(div);
    }
    
}

function cekrdh(val,shs){
    if(shs < suhu_rendah){
        suhu_rendah = shs;
    }
}

function putaran_kipas(kipas,rpm){
    if(kipas >= 2.0){
        rpm.style.animationPlayState = 'paused';
    }else{
        rpm.style.animationPlayState = 'running';
        rpm.style.animationDuration = kipas + 's';
    }
}


function animasi_bar(){
    document.getElementById("pf").innerHTML = pf;
    var lst_pf = document.getElementById("bar_pf");
    lst_pf.style.width = mapNilai(pf,0,1,0,30) + 'vw';
}

function animasi_tombol(){

}

function createGaugeCard(title, value_gauge, ukuran_1, minLabel, maxLabel, color, size = 10) {
    var ukuran_2 = (-0.1 * ukuran_1 ** 2) + (14 * ukuran_1) - 150;;
    var lingkar_gauge = mapNilai(value_gauge, minLabel, maxLabel, ukuran_2, ukuran_2*0.25);
    
    return `
        <div class="card_gauge" style="grid-template-rows: 1fr auto; gap: 1em;">
            <div class="judul_widget">${title}</div>
            <div class="skill" style="width: calc(20vw*var(--rasio-gauge));height: calc(20vw*var(--rasio-gauge));">
                <div class="outer" style="width: 100%; height: 100%;">
                    <div class="inner">
                        <div id="number">
                            <span class="keterangan widget1">${value_gauge}</span>
                            <span>${title.includes('Kelembapan') ? '%' : '°'}</span>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" 
                         viewBox="0 0 100 100" style="width: 100%; height: 100%;">
                        <defs>
                            <linearGradient id="GradientColor">
                                <stop offset="0%" stop-color="#e91e63" />
                                <stop offset="100%" stop-color="#673ab7"/>
                            </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="${ukuran_1}" stroke-linecap="round" 
                                style="stroke-dasharray: ${ukuran_2}; stroke-dashoffset: calc(0.25*${ukuran_2});"/>
                        <circle cx="50" cy="50" r="${ukuran_1}" stroke-linecap="round" 
                                style="stroke:${color}; stroke-dasharray: ${ukuran_2}; stroke-dashoffset: calc(${lingkar_gauge});"/>  
                    </svg>
                    <div class="ket_gauge_kiri">${minLabel}</div>
                    <div class="ket_gauge_kanan">${maxLabel}</div>
                </div>
            </div>
        </div>
    `;
}


function createOutputTable(data,padding) {
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

const toggleButton = document.getElementById("toggleButton");
const toggleButton2 = document.getElementById("toggleButton2");
const hiddenText = document.getElementById("hiddenText");
const button_bar1 = document.getElementById("button_bar1");
const hidden_chart1 = document.getElementById("hidden_chart1");
const hidden_chart2 = document.getElementById("hidden_chart2");
const button_calculator = document.getElementById("button_calculator");
const hidden_calculator = document.getElementById("hidden_calculator");
const button_detail_kipas = document.getElementById("button_detail_kipas");
const hidden_detail_kipas = document.getElementById("hidden_detail_kipas");

toggleButton.addEventListener('click', function() {
    if (hiddenText.style.display == "none") {
        hiddenText.style.display = "block";
        toggleButton.textContent = "Sembunyikan Teks";
    } else {
        hiddenText.style.display = "none";
        toggleButton.textContent = "Lihat Teks Data";
    }
});

toggleButton2.addEventListener('click', function() {
    var myVar;
    var input_cookie = document.getElementById("input_test_kosong").value;
    if (input_cookie == "rakha25") {
        alert("Perangkat anda telah di atur menjadi mode pemilik kandang");
        myVar = "1";
        setCookie("owner", myVar, 7); 
        setDefaultValue();
        addButton.style.display = "block";
        dt_bakul.style.display = "block";
        dt_calc_chart.style.display = "block";
        fetchData();
        createPieChart();
    } else if (input_cookie == "ppl") {
        alert("Perangkat anda telah di atur menjadi mode ppl kandang untuk 1 hari");
        myVar = "2";
        setCookie("owner", myVar, 1); 
        setDefaultValue();
        addButton.style.display = "block";
        dt_bakul.style.display = "block";
        dt_calc_chart.style.display = "block";
        fetchData();
        createPieChart();
    } else if (input_cookie == '') {
        //alert("kosong");
    } else {
        myVar = "0";
        setCookie("owner", myVar, 7); 
        setDefaultValue();
        addButton.style.display = "none";
        dt_bakul.style.display = "none";
        dt_calc_chart.style.display = "none";
        //alert("oke");
    }
});

button_calculator.addEventListener('click', function() {
    if (hidden_calculator.style.display == "none") {
        hidden_calculator.style.display = "block";
        //hidden_calculator.textContent = "Sembunyikan Teks";
    } else {
        hidden_calculator.style.display = "none";
        //hidden_calculator.textContent = "Lihat Teks Data";
    }
});

button_bar1.addEventListener('click', function() {
    if (hidden_chart1.style.display == "none") {
        hidden_chart1.style.display = "block";
        button_bar1.textContent = "Sembunyikan Grafik";
    } else {
        hidden_chart1.style.display = "none";
        button_bar1.textContent = "Lihat Grafik";
    }
});

button_detail_kipas.addEventListener('click', function() {
    if (hidden_detail_kipas.style.display == "none") {
        hidden_detail_kipas.style.display = "block";
        button_detail_kipas.textContent = "Sembunyikan Detail";
    } else {
        hidden_detail_kipas.style.display = "none";
        button_detail_kipas.textContent = "Lihat Detail Kipas";
    }
});
function formatTime(time) {
    return (time < 10 ? '0' : '') + time;
}

var x1 = 0;
let grafik;
function animasi_chart() {
    const canvas1 = document.getElementById('grafik');
    if (!grafik) {
        grafik = new Chart(canvas1, {
            type: 'line',
            data: {
                labels: [gwk(0), gwk(1), gwk(2), gwk(3), gwk(4), gwk(5), gwk(6), gwk(7), gwk(8), gwk(9), gwk(10), gwk(11), gwk(12), gwk(13), gwk(14), gwk(15), gwk(16), gwk(17), gwk(18), gwk(19), gwk(20), gwk(21), gwk(22), gwk(23)],
                datasets: [{
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
                }/*, {
                    label: 'kWh Listrik',
                    data: [gls(0), gls(1), gls(2), gls(3), gls(4), gls(5), gls(6), gls(7), gls(8), gls(9), gls(10), gls(11), gls(12), gls(13), gls(14), gls(15), gls(16), gls(17), gls(18), gls(19), gls(20), gls(21), gls(22), gls(23)],
                    backgroundColor: 'rgba(255,170,29,0.2)',
                    borderColor: 'rgba(255,170,29,1)',
                    borderWidth: 1,
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    pointStyle: false,
                    yAxisID: 'y3'
                }*/]
            },
            options: {
                scales: {
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
                    /*y3: {
                        min: 0,
                        max: 6,
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: { color: 'rgba(255,255,0,1)' },
                        grid: { display: false }
                    },*/
                    x: { grid: { display: false } }
                },
            }
        });
    } else {
        // Jika grafik sudah ada, update data
        //grafik.data.datasets[0].data = [gsa(0), gsa(1), gsa(2), gsa(3), gsa(4), gsa(5), gsa(6), gsa(7), gsa(8), gsa(9), gsa(10), gsa(11), gsa(12), gsa(13), gsa(14), gsa(15), gsa(16), gsa(17), gsa(18), gsa(19), gsa(20), gsa(21), gsa(22), gsa(23)];
        //grafik.data.datasets[1].data = [gsb(0), gsb(1), gsb(2), gsb(3), gsb(4), gsb(5), gsb(6), gsb(7), gsb(8), gsb(9), gsb(10), gsb(11), gsb(12), gsb(13), gsb(14), gsb(15), gsb(16), gsb(17), gsb(18), gsb(19), gsb(20), gsb(21), gsb(22), gsb(23)],
        //grafik.data.datasets[2].data = [gka(0), gka(1), gka(2), gka(3), gka(4), gka(5), gka(6), gka(7), gka(8), gka(9), gka(10), gka(11), gka(12), gka(13), gka(14), gka(15), gka(16), gka(17), gka(18), gka(19), gka(20), gka(21), gka(22), gka(23)],
        //grafik.data.datasets[3].data = [gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts(), gts()],
                    
        grafik.update(); // Perbarui grafik dengan data terbaru
    }

    if (x1 == 0) {
        hidden_chart1.style.display = "block";
        button_bar1.textContent = "Sembunyikan Grafik";
        x1 = 1;
    }
}


function gsa(x){
    var hasil_gsa;
    if(grafik_suhu_atas[x] > 400){
        if(x<1){x=2;}
        hasil_gsa = hpsnull(grafik_suhu_atas[x-1]/10).toFixed(1);
    }else{
        hasil_gsa = hpsnull(grafik_suhu_atas[x]/10).toFixed(1);
    }
    return hasil_gsa;
}

function gka(x){
    var hasil_gka = hpsnull(grafik_kelembapan_atas[x]/10).toFixed(1);
    return hasil_gka;
}

function gsb(x){
    var hasil_gsb;
    if(grafik_suhu_bawah[x] > 400){
        if(x<1){x=2;}
        hasil_gsb = hpsnull(grafik_suhu_bawah[x-1]/10).toFixed(1);
    }else{
        hasil_gsb = hpsnull(grafik_suhu_bawah[x]/10).toFixed(1);
    }
    return hasil_gsb;
}

function gls(x){
    var hasil_gls = hpsnull(grafik_kwh_listrik[x]/1000).toFixed(1);
    return hasil_gls;    
}

function gwk(x) {
    var hasil_gwk = hpsnull(grafik_waktu[0])+x+1;
    if(hasil_gwk>24){
        hasil_gwk = hasil_gwk-24;
    }

    if(hasil_gwk<10){
        return '0' + hasil_gwk + ':00';
    }else{
        return hasil_gwk + ':00';
    }
}

function gts(){
    return target_suhu/10;
}


var waktu_online2;
var skr;
var default_input = false;
    
function updateTime() {
    const now = new Date();
    const waktu_thingspeak = new Date(penampung_data_waktu);
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
    const startDate = new Date(tanggal_masuk_ayam);
    startDate.setHours(startDate.getHours());
    const differenceInMilliseconds = now - startDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    const waktu_online = now - waktu_thingspeak;
    waktu_online2 = Math.floor(waktu_online / 1000);

    document.getElementById('current-date').textContent = currentDate;
    document.getElementById('current-time').textContent = currentTime;

    if(mode_kandang == 3){
        document.getElementById('usia_ayam').textContent = 'Selesai Panen';
    }else{
        document.getElementById('usia_ayam').textContent = usia_ayam + ' hari';//Math.ceil(differenceInDays) + ' hari';
    } 
    if((!default_input)&&(suhu_atas!=0)){
        setDefaultValue();
        default_input = true;
    }
    
}

function analisa_realtime(){
    hasil_analisa(target_suhu,suhu_minimal,suhu_maksimal,160);
}

var ket;
function hasil_analisa(target_suhu_,suhu_minimal_,suhu_maksimal_,target_heat_index){
    var sb_min = (target_suhu_ + suhu_minimal_)/2;
    var sb_max = (target_suhu_ + suhu_maksimal_)/2;
    var hib_min = 150;
    var hib_max = target_heat_index + 10;
    var suhu = suhu_atas*10;
    var kelembapan = kelembapan_atas*10;
    var heat_index = data_HI_atas;
    var kets;
    var ketk;
    var keth;
    if(suhu>=sb_min && suhu<=sb_max){
        if(heat_index > hib_max){
            document.getElementById('judul_analisa').textContent = 'Baik';
        }else if(heat_index <= hib_max){
            document.getElementById('judul_analisa').textContent = 'Baik dan Nyaman';
        }
        ket = 1;
    }else if(suhu>sb_max && suhu<=suhu_maksimal_){
        document.getElementById('judul_analisa').textContent = 'Panas';
        ket = 2;
    }else if(suhu>suhu_maksimal){
        document.getElementById('judul_analisa').textContent = 'Terlalu Panas';
        ket = 3
    }else if(suhu<sb_min && suhu>=suhu_minimal_){
        document.getElementById('judul_analisa').textContent = 'Dingin';
        ket = 4;
    }else if(suhu<suhu_minimal_){
        document.getElementById('judul_analisa').textContent = 'Terlalu dingin';
        ket = 5;
    }

    if(ket == 1){
        kets = 'Ayam berada pada suhu yang nyaman dan ideal.';
    }else if(ket == 2){
        kets = 'Suhu dalam kandang panas namun masih dibawah batas aman.';
    }else if(ket == 3){
        kets = 'Suhu dalam kandang melebihi batas suhu maksimal.';
    }else if(ket == 4){
        kets = 'Dingin untuk ayam, jika perlu suhu dapat dinaikkan.';
    }else if(ket == 5){
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
        if(suhu >= target_suhu){
            keth = keth + ' dan Heat Stress pada ayam.';
        }else if(suhu < target_suhu){
            keth = keth + ' dan penyakit pada ayam.';
        }
        
    }
    document.getElementById('isi_analisa').innerHTML = kets + ketk + keth; 
    document.getElementById('dsp').innerHTML = 'Target Suhu : ' + hpsnull(target_suhu/10).toFixed(1) + '°';
    let imgElement = document.getElementById('gambar_analisa');
    if (ket == 1) {
        imgElement.src = 'https://www.svgrepo.com/show/400059/chicken.svg';
    } else if (ket == 2) {
        imgElement.src = 'https://www.svgrepo.com/show/76809/thermometer.svg';
    } else if (ket == 3) {
        imgElement.src = 'https://www.svgrepo.com/show/219164/danger.svg';
    } else if (ket == 4) {
        imgElement.src = 'https://www.svgrepo.com/show/381270/thermometer-cold-winter-temperature.svg';
    } else if (ket == 5) {
        imgElement.src = 'https://www.svgrepo.com/show/234624/snowflake-cold.svg';
    }
}

var calc_ayam_awal;
var calc_ayam_mati;
var sisa_ayam_hidup;
var cmt; 

function kalkulator(){
    var calc_usia_ayam = document.getElementById('input_kalkulator_1').value;
    calc_ayam_awal = document.getElementById('input_kalkulator_2').value;
    calc_ayam_mati = document.getElementById('input_kalkulator_3').value;
    var calc_jumlah_pakan = document.getElementById('input_kalkulator_4').value;
    var calc_bobot_rata = document.getElementById('input_kalkulator_5').value;
    var calc_harga_kontrak_ayam = document.getElementById('input_kalkulator_6').value;
    var calc_harga_bibit = document.getElementById('input_kalkulator_7').value;
    var calc_harga_obat_dll = document.getElementById('input_kalkulator_8').value;
    var calc_harga_pakan_per_kilo = document.getElementById('input_kalkulator_9').value;

    if((cmt!= calc_ayam_mati)&&(getCookie("owner") == 1)){
        createPieChart();
        cmt = calc_ayam_mati;
    };

    var ayam_tersisa = calc_ayam_awal - calc_ayam_mati;
    var persen_ayam_hidup = (ayam_tersisa/calc_ayam_awal)*100;
    var jumlah_pakan = calc_jumlah_pakan * 50;
    var total_bobot = calc_bobot_rata * ayam_tersisa;
    var fcr = (jumlah_pakan/total_bobot).toFixed(2); 
    var ip = ((persen_ayam_hidup*calc_bobot_rata)/(fcr*calc_usia_ayam)*100).toFixed(0);
    var deplesi = (100 - persen_ayam_hidup).toFixed(1);
    var perkiraan_pendapatan = (calc_bobot_rata * ayam_tersisa * calc_harga_kontrak_ayam)-(calc_harga_bibit * calc_ayam_awal) - (calc_harga_obat_dll) - (calc_harga_pakan_per_kilo * jumlah_pakan);
    var perkiraan_keuntungan_per_ekor = (perkiraan_pendapatan/calc_ayam_awal).toFixed(0);
    var keterangan = '';
    sisa_ayam_hidup = ayam_tersisa-total_ayam_dipanen;
    if(((calc_usia_ayam>7)&&(fcr < 1))||(ip > 550)||(perkiraan_pendapatan > calc_ayam_awal*8000)||(deplesi > 100)){
        keterangan = 'Hasil perhitungan tidak realistis, input nilai yang anda memasukkan tidak masuk akal.';
    }
    document.getElementById('output_kalkulator_keterangan').innerHTML = keterangan;
    const kalkulatorData = {
        fcr: { label: 'FCR', value: `${fcr}` },
        ip: { label: 'IP', value: `${ip}` },
        deplesi: { label: 'Deplesi', value: `${deplesi+'%'}` },
        perkiraanPendapatan: { label: 'Perkiraan Hasil', value: `${formatRupiah(perkiraan_pendapatan)}` },
        keuntunganPerEkor: { label: 'Keuntungan per Ekor', value: `${formatRupiah(perkiraan_keuntungan_per_ekor)}` }
    };
    
    // Mengisi elemen dengan id "output_group_container" dengan HTML yang dihasilkan
    document.getElementById('output_group_container').innerHTML = createOutputTable(kalkulatorData,2);

}

function setDefaultValue() {
    const retrievedVar = getCookie("owner")
    if(retrievedVar == 1){
        hidden_calculator.style.display = "block";
        document.getElementById('input_kalkulator_1').value = usia_ayam;
        document.getElementById('input_kalkulator_2').value = jumlah_ayam_awal;
        document.getElementById('input_kalkulator_3').value = jumlah_ayam_mati;
        document.getElementById('input_kalkulator_4').value = jumlah_pakan_sak;
        document.getElementById('input_kalkulator_5').value = bobot_rata_rata_timbang/1000;//bobot_rata_rata/1000;
        document.getElementById('input_kalkulator_6').value = harga_kontrak_ayam;
        document.getElementById('input_kalkulator_7').value = harga_bibit_ayam;
        document.getElementById('input_kalkulator_8').value = harga_obat_ayam;
        document.getElementById('input_kalkulator_9').value = harga_pakan_kg;
        createPieChart();  
    }else if(retrievedVar == 2){
        hidden_calculator.style.display = "block";
        document.getElementById('input_kalkulator_1').value = usia_ayam;
        document.getElementById('input_kalkulator_2').value = jumlah_ayam_awal;
        document.getElementById('input_kalkulator_3').value = jumlah_ayam_mati;
        document.getElementById('input_kalkulator_4').value = jumlah_pakan_sak;
        document.getElementById('input_kalkulator_6').value = harga_kontrak_ayam;
        document.getElementById('input_kalkulator_7').value = harga_bibit_ayam;
        document.getElementById('input_kalkulator_8').value = harga_obat_ayam;
        document.getElementById('input_kalkulator_9').value = harga_pakan_kg;
        createPieChart();
    }
}

function formatRupiah(angka) {
    return 'Rp.' + angka.toLocaleString('id-ID');
}

setInterval(wkt_on, 1000);

function wkt_on(){
    const now = new Date();
    const waktu_thingspeak = new Date(penampung_data_waktu);
    const waktu_online = Math.floor((now - waktu_thingspeak) / 1000);

    var onl = document.getElementById('ind_online');
    document.getElementById('data-container').innerHTML = waktu_online;            
    
    if(waktu_online<60){
        onl.style.backgroundColor = "rgb(59, 225, 89)";
    }else{
        onl.style.backgroundColor = "red";
    }
}

const modal = document.getElementById("modal");
const dt_bakul = document.getElementById("resultContainer");
const dt_calc_chart = document.getElementById("data_kalkulator_chart");
const addButton = document.getElementById("addButton");
const closeButton = document.querySelector(".close");
const submitButton = document.getElementById("submitButton");

if(getCookie("owner") == 1){
    hidden_detail_kipas.style.display = "none";
    button_detail_kipas.textContent = "Lihat Detail Kipas";
    addButton.style.display = "block";
    dt_bakul.style.display = "block";
    dt_calc_chart.style.display = "block"; 
    addButton.onclick = function() {
    modal.style.display = "block";
    dt_bakul.style.display = "block";
    dt_calc_chart.style.display = "block"; 
    }
}else if(getCookie("owner") == 2){
    hidden_detail_kipas.style.display = "block";
    addButton.style.display = "block";
    dt_bakul.style.display = "block";
    dt_calc_chart.style.display = "block"; 
    addButton.onclick = function() {
    modal.style.display = "block";
    dt_bakul.style.display = "block";
    dt_calc_chart.style.display = "block"; 
    }
}else{
    hidden_detail_kipas.style.display = "block";
    addButton.style.display = "none";
    dt_bakul.style.display = "none";
    dt_calc_chart.style.display = "none";
}

closeButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function validateInput() {
    if (!tanggal || !nama_do || !nama_bakul || !plat_nomor || !jumlah_ekor_ambil || !jumlah_kg_ambil) {
        alert("Semua kolom harus diisi!");
        return false;
    }
    return true;
}
submitButton.onclick = function() {
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
        modal.style.display = "none";            
    }
}


// script.js/

var total_ayam_dipanen;
var total_kg_diambil = 0;

async function fetchData() {
    
    if((getCookie("owner") == 1)||(getCookie("owner") == 2)){
        const container = document.getElementById('resultContainer');
        total_ayam_dipanen = 0;
        total_kg_diambil = 0;
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
            total_ayam_dipanen += parseInt(item.jumlah_ekor_ambil);
            total_kg_diambil += parseFloat(item.jumlah_kg_ambil);
            jumlah_ayam_dipanen = total_ayam_dipanen;
            first_dipanen = true;
            
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
                modal.style.display = "block";
                document.getElementById("tanggal").value = item.tanggal.split('T')[0];
                document.getElementById("nama_do").value = item.nama_do;
                document.getElementById("nama_bakul").value = item.nama_bakul;
                document.getElementById("plat_nomor").value = item.plat_nomor;
                document.getElementById("jumlah_ekor_ambil").value = item.jumlah_ekor_ambil;
                document.getElementById("jumlah_kg_ambil").value = item.jumlah_kg_ambil;
                    
                submitButton.onclick = function() {
                     
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
                        modal.style.display = "none";            
                    }
                    resultItem.appendChild(editButton);
                    resultItem.appendChild(deleteButton);
                    modal.style.display = "none";
                }
                createPieChart(); 
                
            };
            container.appendChild(resultItem);
        });
        //koneksi_mqtt();
        } catch (error) {
          container.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        }
      }         
      createPieChart(); 
    }
    
    window.addEventListener('DOMContentLoaded', fetchData());
      async function postData(data) {
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
let myPieChart;
var first_total_bobot = 0;
    
async function createPieChart() {
    const response = await fetch('https://kandangayamrakha.netlify.app/api/fetchData');
    const result = await response.json();
  
    if (!result || result.length === 0) {
        console.error("Data kosong");
        //return;
    }
    const Data_kalkulasi_panen = {
        d1: { label: 'Ayam tersisa saat ini ', value: `${sisa_ayam_hidup+' Ekor'}` },
        d2: { label: 'Total bobot dipanen   ', value: `${total_kg_diambil.toFixed(1)+' Kg'}` },
        d3: { label: 'Kerataan bobot panen', value: `${(total_kg_diambil/total_ayam_dipanen).toFixed(2)+' Kg'}` },
        
    };
    if((first_total_bobot==0)&&(getCookie("owner") == 1)){
        var hsl_rtrt = (total_kg_diambil/total_ayam_dipanen).toFixed(2);
        if(hsl_rtrt>0){
            document.getElementById('input_kalkulator_5').value = (total_kg_diambil/total_ayam_dipanen).toFixed(2);
        }
        first_total_bobot=1;
    }
    document.getElementById('data_calc_total').innerHTML = createOutputTable(Data_kalkulasi_panen,8);
    const labels = ['Ayam Hidup', 'Ayam dipanen', 'Ayam Mati'];
    const dataValues = [sisa_ayam_hidup, total_ayam_dipanen, calc_ayam_mati];
    const total = dataValues.reduce((acc, val) => acc + val, 0);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Data Ayam',
            data: dataValues,
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)', // Biru (Ayam Hidup)
                'rgba(255, 206, 86, 0.6)', // Kuning (Ayam dipanen)
                'rgba(255, 99, 132, 0.6)'  // Merah (Ayam Mati)
            ],
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true
                },
                datalabels: {
                    formatter: (value, context) => {
                        let percentage = ((value / calc_ayam_awal) * 100).toFixed(1);
                        return `${value} (${percentage}%)`; // Menampilkan nilai dan persentase
                    },
                    color: 'black',
                    font: {
                        //weight: 'bold',
                        size: 14
                    },
                    anchor: 'center',
                    align: 'center',
                }
            }
        },
        plugins: [ChartDataLabels]
    };

    const ctx = document.getElementById('myPieChart').getContext('2d');
    if (myPieChart) {
        myPieChart.data = data;
        myPieChart.update();
    } else {
        myPieChart = new Chart(ctx, config);
    }
}

function keterangan_air() {
    let persen_air = persen_air_atas;
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

function capitalizeWords(text) {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatPlatNomor(plat) {
    const parts = plat.split(' ');
    if (parts.length === 3) {
        const kodeWilayah = parts[0].toUpperCase();
        const angka = parts[1];
        const hurufAkhir = parts[2].toUpperCase();
        return `${kodeWilayah} ${angka} ${hurufAkhir}`;
    }
    return plat.toUpperCase();
}

//setInterval(koneksi_mqtt,1000);
function koneksi_mqtt(){
    if(getCookie("owner") == 1){
        // Koneksi ke broker HiveMQ
        const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

        client.on("connect", function () {
            console.log("Terhubung ke HiveMQ dari browser!");

            // Kirim pesan ke topik "rakha/esp32/dht11" 
            client.publish("kndgrkh", JSON.stringify({ aym: total_ayam_dipanen}), { qos: 0, retain: true });
        });

        client.on("message", function (topic, message) {
            console.log(`Pesan diterima dari ${topic}: ${message.toString()}`);
        });
    }
}

const token = "Wl380IhMybLGDKPaG88Cg5Lvva7ylU7j"; // Ganti dengan tokenmu
    const writeUrl = `https://sgp1.blynk.cloud/external/api/update`;
    const readUrl = `https://sgp1.blynk.cloud/external/api/get`;

    function kirimPesan() {
      const pesan = document.getElementById("pesanInput").value.toLowerCase();
      document.getElementById("pesanInput").value = "";
      if (!pesan) return;

      // Kirim pesan ke V7
      fetch(`${writeUrl}?token=${token}&v7=${encodeURIComponent(pesan)}`)
        .then(() => {
          document.getElementById("output").innerText = "Menunggu balasan...";

          // Mulai polling setiap 1 detik, timeout setelah 10 detik
          let waktu = 0;
          const interval = setInterval(() => {
            fetch(`${readUrl}?token=${token}&v7`)
              .then(res => res.text())
              .then(data => {
                if (data !== pesan) { // Kalau balasan beda dari pesan asli
                  clearInterval(interval);
                  document.getElementById("output").innerText = data;
                }
              });

            waktu += 1;
            if (waktu >= 15) {
              clearInterval(interval);
              document.getElementById("output").innerText = "Tidak ada balasan, mungkin sedang offline, coba lagi nanti";
            }
          }, 1000);
        })
        .catch(err => {
          console.error("Gagal kirim:", err);
          alert("Gagal mengirim pesan.");
        });
    }

const statusEl = document.getElementById("statusBlynk");

    async function cekStatusBlynk() {
        try {
            const response = await fetch(`https://sgp1.blynk.cloud/external/api/isHardwareConnected?token=${token}`);
            const isOnline = await response.text();

            if (isOnline === "true") {
                statusEl.textContent = " Online";
                statusEl.style.color = "green";
            } else {
                statusEl.textContent = " Offline";
                statusEl.style.color = "red";
            }
        } catch (error) {
            statusEl.textContent = "Error mengecek status";
            statusEl.style.color = "orange";
        }
    }

    // Jalankan setiap 5 detik
    setInterval(cekStatusBlynk, 10000);

    function tampilkanSebaranBobot() {
        // Data yang diambil dari data_json.bbt
        
      
        // Menampilkan tabel dengan rentang bobot
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = ''; // Kosongkan tabel terlebih dahulu
      
        let totalSample = 0;
        for (let i = 1; i <= 10; i++) {
            totalSample += sebaran_bobot[i];
        }   

        for (let i = 0; i < 10; i++) {
        // Rentang bobot pertama dimulai dari 1300, jadi kita tambahkan sebaran_bobot[0] * 100
            let rentangAwal = (sebaran_bobot[0] * 100) + (i * 100);
            let rentangAkhir = rentangAwal + 99;
            
            let rentangBobot = rentangAwal + " - " + rentangAkhir;
            let jumlahSampel = sebaran_bobot[i + 1]; // Ambil nilai dari array sebaran_bobot
            let persentase = 0;
            let estimasi_ekor = 0;
            
            // Hitung persentase hanya jika jumlah sampel ada
            if (totalSample > 0) {
                persentase = ((jumlahSampel / (totalSample)) * 100).toFixed(2);
                if(getCookie("owner") == 1){
                    estimasi_ekor = ((persentase*sisa_ayam_hidup)/100).toFixed(0);
                }else{
                    estimasi_ekor = ((persentase*jumlah_ayam_awal)/100).toFixed(0);
                }
                    
            }// Menambahkan baris baru ke tabel
            if(jumlahSampel!=0){
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td class="td_">${rentangBobot}</td>
                    <td class="td_">${jumlahSampel}</td>
                    <td class="td_">${persentase}%</td>
                    <td class="td_">${estimasi_ekor}</td>
                `;
                tableBody.appendChild(row);
            }
          
        }
      }
      