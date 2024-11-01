function openOrFocusTab(url) {
    const existingTab = window.open(url, "_blank");

    // Cek apakah tab sudah ada atau belum
    if (existingTab) {
        // Jika tab sudah ada, fokus ke tab tersebut
        existingTab.focus();
    } else {
        // Jika tidak bisa fokus, buka tab baru
        window.open(url, "_blank");
    }
}

// Contoh penggunaan
openOrFocusTab("https://kandangayamrakha.netlify.app/");

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
const randomValue = 5000;//Math.floor(randomFraction * (5000 - 2000 + 1)) + 2000;

function data_thingspeak(){
    const url = 'https://api.thingspeak.com/channels/2172969/feeds.json?results=2';
    
        // Fetch data from Thingspeak API
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Ambil data dari field1
                const fieldData_1 = data.feeds[1].field1;
                const fieldData_2 = data.feeds[1].field2;
                const fieldData_3 = data.feeds[1].field3;
                const fieldData_4 = data.feeds[1].field4;
                const lastUpdateTime = data.feeds[1].created_at;
                // Tampilkan data di dalam elemen dengan id 'data-container'
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
                //document.getElementById('tks1').innerHTML = fieldData_2;
                document.getElementById('messages').innerHTML = 'field1 : ' + fieldData_1 + ', field2 : ' + fieldData_2 + ', field3 : ' + fieldData_3 + ', field4 : ' + fieldData_4;
                eksekutor();
            })
            //.catch(error => console.error('Error fetching data:', error));
            
}

setInterval(data_thingspeak,randomValue)

function eksekutor(){
    var array_suhu = penampung_json_1.shu;
    var array_kelembapan = penampung_json_1.klb;
    var array_heat_index = penampung_json_1.dhi;
    var array_liter_air = penampung_json_1.air;
    var array_listrik = penampung_json_1.lst;
    var array_angin = penampung_json_1.agn;
    document.getElementById("suhu_atas").innerHTML = hpsnull(array_suhu[0]/10).toFixed(1);
    document.getElementById("suhu_luar").innerHTML = hpsnull(array_suhu[2]/10).toFixed(1);
    document.getElementById("kelembapan_atas").innerHTML = hpsnull(array_kelembapan[0]/10).toFixed(1);
    document.getElementById("kelembapan_luar").innerHTML = hpsnull(array_kelembapan[2]/10).toFixed(1);
    document.getElementById("heat_index_atas").innerHTML = hpsnull(array_heat_index[0]/100).toFixed(2);
    //document.getElementById("heat_index_luar").innerHTML = hpsnull(array_heat_index[2]/100).toFixed(2);
    document.getElementById("kecepatan_angin_atas").innerHTML = hpsnull(array_angin[0]/100).toFixed(2);
    document.getElementById("liter_air_atas").innerHTML = hpsnull(array_liter_air[0]).toFixed(0);
    document.getElementById("persen_air_atas").innerHTML = hpsnull(array_liter_air[2]).toFixed(0);
    document.getElementById("volt").innerHTML = hpsnull(array_listrik[0]/100).toFixed(1);
    document.getElementById("amp").innerHTML = hpsnull(array_listrik[1]/100).toFixed(2);
    document.getElementById("power").innerHTML = hpsnull(array_listrik[2]/100).toFixed(1);
    document.getElementById("energy").innerHTML = hpsnull(array_listrik[3]/100).toFixed(2);
    document.getElementById("freq").innerHTML = hpsnull(array_listrik[4]/100).toFixed(1);
    var loading_1 = document.getElementById("loading_1");
    loading_1.style.display = "none";
    updateTime();
    animasi_gauge();
    animasi_kipas();
    animasi_bar();
    animasi_tombol();
    analisa_realtime();
    kalkulator();
    animasi_chart();
}

function mapNilai(nilai, dariMin, dariMax, keMin, keMax) {
    // Mencocokkan nilai dari satu rentang ke rentang lain
    return (nilai - dariMin) * (keMax - keMin) / (dariMax - dariMin) + keMin;
}

function animasi_gauge(){
    var array_suhu = penampung_json_1.shu;
    var array_kelembapan = penampung_json_1.klb;
    var array_heat_index = penampung_json_1.dhi;
    var cir1 = document.getElementById("crc_sha");
    var cir2 = document.getElementById("crc_kla");
    var cir3 = document.getElementById("crc_hia");
    var crc_shl = document.getElementById("crc_shl");
    var crc_kl = document.getElementById("crc_kll");
    //var crc_hil = document.getElementById("crc_hil");
    cir1.style.strokeDashoffset = mapNilai(array_suhu[0]/10,20,40,42.7,-2) + 'vw';
    cir2.style.strokeDashoffset = mapNilai(array_kelembapan[0]/10,0,100,42.7,-2) + 'vw';
    cir3.style.strokeDashoffset = mapNilai(array_heat_index[0]/100,100,200,42.7,-2) + 'vw';
    crc_shl.style.strokeDashoffset = mapNilai(array_suhu[2]/10,20,40,42.7,-2) + 'vw';
    crc_kl.style.strokeDashoffset = mapNilai(array_kelembapan[2]/10,0,100,42.7,-2) + 'vw';
    //crc_hil.style.strokeDashoffset = mapNilai(array_heat_index[2]/100,100,200,42.7,-2) + 'vw';

}

var rpm_kps1 = document.getElementById('square1');
var rpm_kps2 = document.getElementById('square2');
var rpm_kps3 = document.getElementById('square3');
var rpm_kps4 = document.getElementById('square4');
var rpm_kps5 = document.getElementById('square5');
    
var mode_kandang;
    
function animasi_kipas(){
    var array_rpm_kipas = penampung_json_1.kps;
    var array_kipas_pusat = penampung_json_4.kpa;
    var kps1 = mapNilai(parseFloat(array_kipas_pusat[5]),0.0,1.0,0.0,0.5).toFixed(1);
    var kps2 = mapNilai(parseFloat(array_kipas_pusat[6]),0.0,1.0,0.0,0.5).toFixed(1);
    var kps3 = mapNilai(parseFloat(array_kipas_pusat[7]),0.0,1.0,0.0,0.5).toFixed(1);
    var kps4 = mapNilai(parseFloat(array_kipas_pusat[8]),0.0,1.0,0.0,0.5).toFixed(1);
    var kps5 = mapNilai(parseFloat(array_kipas_pusat[9]),0.0,1.0,0.0,0.5).toFixed(1);
    document.getElementById("rpm1").innerHTML = hpsnull(array_kipas_pusat[5]).toFixed(0);
    document.getElementById("rpm2").innerHTML = hpsnull(array_kipas_pusat[6]).toFixed(0);
    document.getElementById("rpm3").innerHTML = hpsnull(array_kipas_pusat[7]).toFixed(0);
    document.getElementById("rpm4").innerHTML = hpsnull(array_kipas_pusat[8]).toFixed(0);
    document.getElementById("rpm5").innerHTML = hpsnull(array_kipas_pusat[9]).toFixed(0);
    putaran_kipas(kps1,rpm_kps1);
    putaran_kipas(kps2,rpm_kps2);
    putaran_kipas(kps3,rpm_kps3);
    putaran_kipas(kps4,rpm_kps4);
    putaran_kipas(kps5,rpm_kps5);
    
    //document.getElementById('label_kps1').innerHTML = kps1;
    //console.log("onMessageArrived: ");
    var mdkps;
    var tmkps;
    mode_kandang = array_kipas_pusat[0];
    if(mode_kandang==1){
        mdkps = 'Automatis';
        tmkps = 'Auto ';
    }else if(mode_kandang==2){
        mdkps = 'Manual';
    }else if(mode_kandang==3){
        mdkps = 'Bebas';
    }

    if(array_kipas_pusat[10]==1){
        if(mode_kandang==1){
            tmkps = tmkps + ', Hidup ' + array_kipas_pusat[11] + ' detik ,Mati ' + array_kipas_pusat[12] + ' menit';
        }
    }else{
        if(mode_kandang==1){
            tmkps = 'Mati';
        }else if(mode_kandang==2){
            tmkps = 'Mati, [' + array_kipas_pusat[11] + '-' + array_kipas_pusat[12] + ']';
        }
    }
    document.getElementById("mode_kipas").innerHTML = mdkps;
    document.getElementById("timer_kipas").innerHTML = tmkps;
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
    var array_listrik = penampung_json_1.lst;
    document.getElementById("pf").innerHTML = array_listrik[5]/100;
    var lst_pf = document.getElementById("bar_pf");
    lst_pf.style.width = mapNilai(array_listrik[5],0,100,0,30) + 'vw';
    
}

function animasi_tombol(){

}

const toggleButton = document.getElementById("toggleButton");
const hiddenText = document.getElementById("hiddenText");
const button_bar1 = document.getElementById("button_bar1");
const hidden_chart1 = document.getElementById("hidden_chart1");
const hidden_chart2 = document.getElementById("hidden_chart2");
const button_caclulator = document.getElementById("button_caclulator");
const hidden_caclulator = document.getElementById("hidden_caclulator");

toggleButton.addEventListener('click', function() {
    if (hiddenText.style.display == "none") {
        hiddenText.style.display = "block";
        toggleButton.textContent = "Sembunyikan Teks";
    } else {
        hiddenText.style.display = "none";
        toggleButton.textContent = "Lihat Teks Data";
    }
});

//button_caclulator.addEventListener('click', function() {
    // Periksa apakah teks sedang ditampilkan atau tidak
    //if (hidden_caclulator.style.display == "none") {
        // Jika teks disembunyikan, tampilkan teks dan ubah teks tombol
        //hidden_caclulator.style.display = "block";
        //button_caclulator.textContent = "Sembunyikan Teks";
    //} else {
        // Jika teks ditampilkan, sembunyikan teks dan ubah teks tombol
        //hidden_caclulator.style.display = "none";
        //button_caclulator.textContent = "Lihat Teks Data";
    //}
//});

button_bar1.addEventListener('click', function() {
    if (hidden_chart1.style.display == "none") {
        hidden_chart1.style.display = "block";
        button_bar1.textContent = "Sembunyikan Grafik";
    } else {
        hidden_chart1.style.display = "none";
        button_bar1.textContent = "Lihat Grafik";
    }
});
function formatTime(time) {
    return (time < 10 ? '0' : '') + time;
}

const x1 = 0;
function animasi_chart(){
    const canvas1 = document.getElementById('grafik');
        const grafik = new Chart(canvas1, {
            type: 'line',
            data: {
                labels: [gwk(0),gwk(1),gwk(2),gwk(3),gwk(4),gwk(5),gwk(6),gwk(7),gwk(8),gwk(9),gwk(10),gwk(11),gwk(12),gwk(13),gwk(14),gwk(15),gwk(16),gwk(17),gwk(18),gwk(19),gwk(20),gwk(21),gwk(22),gwk(23)],
                datasets: [{
                    label: 'Suhu',
                    data: [gsa(0),gsa(1),gsa(2),gsa(3),gsa(4),gsa(5),gsa(6),gsa(7),gsa(8),gsa(9),gsa(10),gsa(11),gsa(12),gsa(13),gsa(14),gsa(15),gsa(16),gsa(17),gsa(18),gsa(19),gsa(20),gsa(21),gsa(22),gsa(23)],
                    backgroundColor: 'rgba(253, 42, 0, 0.2)', // Warna area di bawah garis
                    borderColor: 'rgba(253, 42, 0, 1)', // Warna garis
                    borderWidth: 1 ,// Lebar garis
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    pointStyle: false,
                    yAxisID: 'y'
                },{
                    label: 'Suhu Luar',
                    data: [gsb(0),gsb(1),gsb(2),gsb(3),gsb(4),gsb(5),gsb(6),gsb(7),gsb(8),gsb(9),gsb(10),gsb(11),gsb(12),gsb(13),gsb(14),gsb(15),gsb(16),gsb(17),gsb(18),gsb(19),gsb(20),gsb(21),gsb(22),gsb(23)],
                    backgroundColor: 'rgba(191, 39, 126, 0.2)', // Warna area di bawah garis
                    borderColor: 'rgba(191, 39, 126, 1)', // Warna garis
                    borderWidth: 1 ,// Lebar garis
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    pointStyle: false,
                    yAxisID: 'y2'
                },{
                    label: 'Kelembapan',
                    data: [gka(0),gka(1),gka(2),gka(3),gka(4),gka(5),gka(6),gka(7),gka(8),gka(9),gka(10),gka(11),gka(12),gka(13),gka(14),gka(15),gka(16),gka(17),gka(18),gka(19),gka(20),gka(21),gka(22),gka(23)],
                    backgroundColor: 'rgba(1, 197, 255,0.2)', // Warna area di bawah garis
                    borderColor: 'rgba(1,197,255,1)', // Warna garis
                    borderWidth: 1 ,// Lebar garis
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,
                    pointStyle: false,
                    yAxisID: 'y1'
                }]
            },
            options: {
                scales: {
                    y: {
                        min : 20,
                        max : 40,
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            color: 'rgba(253, 42, 0, 1)'
                        },
                        grid: {
                            display: false
                        }
                    },
                    y1: {
                        min : 0,
                        max : 100,
                        type: 'linear',
                        display: true,
                        position: 'right',
                        ticks: {
                            color: 'rgba(1,197,255,1)'
                        },
                        grid: {
                            display: false
                        }
                    },
                    y2: {
                        min : 20,
                        max : 40,
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            color: 'rgba(191, 39, 126,1)'
                        },
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
            }
        });
    grafik.data.datasets[0].data = [gsa(0),gsa(1),gsa(2),gsa(3),gsa(4),gsa(5),gsa(6),gsa(7),gsa(8),gsa(9),gsa(10),gsa(11),gsa(12),gsa(13),gsa(14),gsa(15),gsa(16),gsa(17),gsa(18),gsa(19),gsa(20),gsa(21),gsa(22),gsa(23)]
    grafik.update();

    if(x1 == 0){
        hidden_chart1.style.display = "block";
        button_bar1.textContent = "Sembunyikan Grafik";
        x1 = 1;
    }

}

function gsa(x){
    var array_grafik_suhu = penampung_json_2.gsa;
    var hasil_gsa;
    if(array_grafik_suhu[x] > 400){
        if(x<1){x=2;}
        hasil_gsa = hpsnull(array_grafik_suhu[x-1]/10).toFixed(1);
    }else{
        hasil_gsa = hpsnull(array_grafik_suhu[x]/10).toFixed(1);
    }
    return hasil_gsa;
}

function gka(x){
    var array_grafik_kelembapan = penampung_json_2.gka;
    var hasil_gka = hpsnull(array_grafik_kelembapan[x]/10).toFixed(1);
    return hasil_gka;
}

function gsb(x){
    var array_grafik_suhu = penampung_json_3.gsb;
    var hasil_gsb;
    if(array_grafik_suhu[x] > 400){
        if(x<1){x=2;}
        hasil_gsb = hpsnull(array_grafik_suhu[x-1]/10).toFixed(1);
    }else{
        hasil_gsb = hpsnull(array_grafik_suhu[x]/10).toFixed(1);
    }
    return hasil_gsb;
}

function gwk(x) {
    var array_grafik_waktu = penampung_json_2.gwk;
    var hasil_gwk = hpsnull(array_grafik_waktu[0])+x+1;
    if(hasil_gwk>24){
        hasil_gwk = hasil_gwk-24;
    }

    if(hasil_gwk<10){
        return '0' + hasil_gwk + ':00';
    }else{
        return hasil_gwk + ':00';
    }
}


var waktu_online2;
var skr;
var usia_ayam;
var default_input = false;
    
function updateTime() {
    var array_data = penampung_json_1.dat;
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
    const startDate = new Date(array_data[0]);
    startDate.setHours(startDate.getHours() - 7);
    const differenceInMilliseconds = now - startDate;
    var mode_usia_ayam =  array_data[1];
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    const waktu_online = now - waktu_thingspeak;
    waktu_online2 = Math.floor(waktu_online / 1000);

    document.getElementById('current-date').textContent = currentDate;
    document.getElementById('current-time').textContent = currentTime;

    usia_ayam = Math.ceil(differenceInDays);
    if(mode_usia_ayam == 3){
        document.getElementById('usia_ayam').textContent = 'Selesai Panen';
    }else{
        document.getElementById('usia_ayam').textContent = Math.ceil(differenceInDays) + ' hari';
    } 
    if(!default_input){
        setDefaultValue();
        default_input = true;
    }
    
}

function analisa_realtime(){
    var array_kipas_pusat = penampung_json_4.kpa;
    var trgtsh = array_kipas_pusat[2];
    var shmin = array_kipas_pusat[3];
    var shmax = array_kipas_pusat[4];
    hasil_analisa(trgtsh,shmin,shmax,160);
}

var ket;
function hasil_analisa(target_suhu,suhu_minimal,suhu_maksimal,target_heat_index){
    var array_suhu = penampung_json_1.shu;
    var array_kelembapan = penampung_json_1.klb;
    var array_heat_index = penampung_json_1.dhi;
    var sb_min = (target_suhu + suhu_minimal)/2;
    var sb_max = (target_suhu + suhu_maksimal)/2;
    var hib_min = 150;
    var hib_max = target_heat_index + 10;
    var suhu = array_suhu[0];
    var kelembapan = array_kelembapan[0];
    var heat_index = hpsnull(array_heat_index[0]/100);
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
    }else if(suhu>sb_max && suhu<=suhu_maksimal){
        document.getElementById('judul_analisa').textContent = 'Panas';
        ket = 2;
    }else if(suhu>suhu_maksimal){
        document.getElementById('judul_analisa').textContent = 'Terlalu Panas';
        ket = 3
    }else if(suhu<sb_min && suhu>=suhu_minimal){
        document.getElementById('judul_analisa').textContent = 'Dingin';
        ket = 4;
    }else if(suhu<suhu_minimal){
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
    //ket.innerHTML = kets; 
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

function kalkulator(){
    var calc_usia_ayam = document.getElementById('input_kalkulator_1').value;
    var calc_ayam_awal = document.getElementById('input_kalkulator_2').value;
    var calc_ayam_mati = document.getElementById('input_kalkulator_3').value;
    var calc_jumlah_pakan = document.getElementById('input_kalkulator_4').value;
    var calc_bobot_rata = document.getElementById('input_kalkulator_5').value;
    var calc_harga_kontrak_ayam = document.getElementById('input_kalkulator_6').value;
    var calc_harga_bibit = document.getElementById('input_kalkulator_7').value;
    var calc_harga_obat_dll = document.getElementById('input_kalkulator_8').value;
    var calc_harga_pakan_per_kilo = document.getElementById('input_kalkulator_9').value;

    var ayam_tersisa = calc_ayam_awal - calc_ayam_mati;
    var persen_ayam_hidup = (ayam_tersisa/calc_ayam_awal)*100;
    var jumlah_pakan = calc_jumlah_pakan * 50;
    var total_bobot = calc_bobot_rata * ayam_tersisa;
    var fcr = (jumlah_pakan/total_bobot).toFixed(2); 
    var ip = ((persen_ayam_hidup*calc_bobot_rata)/(fcr*calc_usia_ayam)*100).toFixed(0);
    var deplesi = (100 - persen_ayam_hidup).toFixed(1);
    var perkiraan_pendapatan = (calc_bobot_rata * ayam_tersisa * calc_harga_kontrak_ayam)-(calc_harga_bibit * calc_ayam_awal) - (calc_harga_obat_dll) - (calc_harga_pakan_per_kilo * jumlah_pakan);
    var perkiraan_kerugian_per_ekor = ((calc_bobot_rata * (ayam_tersisa + 1) * calc_harga_kontrak_ayam)-(calc_harga_bibit * calc_ayam_awal) - (calc_harga_obat_dll) - (calc_harga_pakan_per_kilo * jumlah_pakan))-perkiraan_pendapatan;
    var keterangan = '';
    if((fcr < 1)||(ip > 550)||(perkiraan_pendapatan > calc_ayam_awal*8000)||(deplesi > 100)||(perkiraan_kerugian_per_ekor < 0)){
        keterangan = 'Hasil perhitungan tidak realistis karena anda memasukkan input nilai yang asal.';
    }
    document.getElementById('output_kalkulator_fcr').innerHTML = fcr;
    document.getElementById('output_kalkulator_ip').innerHTML = ip;
    document.getElementById('output_kalkulator_deplesi').innerHTML = deplesi +'%';
    document.getElementById('output_kalkulator_perkiraan_pendapatan').innerHTML = formatRupiah(perkiraan_pendapatan);
    document.getElementById('output_kalkulator_kerugian_per_ekor').innerHTML = formatRupiah(perkiraan_kerugian_per_ekor);
    document.getElementById('output_kalkulator_keterangan').innerHTML = keterangan;
    
}

function setDefaultValue() {
    // Mengatur nilai default menggunakan JavaScript
    document.getElementById('input_kalkulator_1').value = usia_ayam;
    document.getElementById('input_kalkulator_2').value = 5000;
    document.getElementById('input_kalkulator_6').value = 19900;
    document.getElementById('input_kalkulator_7').value = 7700;
    document.getElementById('input_kalkulator_8').value = 2500000;
    document.getElementById('input_kalkulator_9').value = 9100;
    
}

function formatRupiah(angka) {
    return 'Rp.' + angka.toLocaleString('id-ID');
}

// Memanggil updateTime setiap detik
setInterval(wkt_on, 1000);

function wkt_on(){
    const now = new Date();
    const waktu_thingspeak = new Date(penampung_data_waktu);
    const waktu_online = Math.floor((now - waktu_thingspeak) / 1000);

    var onl = document.getElementById('ind_online');
    document.getElementById('data-container').innerHTML = waktu_online;            
    
    if(waktu_online<30){
        onl.style.backgroundColor = "rgb(59, 225, 89)";
    }else{
        onl.style.backgroundColor = "red";
    }
}
