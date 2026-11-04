// sidebar.js — sidebar & navigasi, sepenuhnya independen dari state sensor

export function toggleSidebar() {
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

export function navigate(event, url) {
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

// Wiring event listener (menggantikan onclick inline di HTML lama)
export function initSidebar() {
    const menuBtn = document.getElementById('menuBtn');
    const overlay = document.getElementById('overlay');
    if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (event) => navigate(event, link.href));
    });
}