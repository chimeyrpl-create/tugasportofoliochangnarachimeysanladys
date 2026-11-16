// JavaScript Chang Nara Chimey Sanladys
// Dipasang di ketiga halaman dengan defer


// =====================================================
// 1. DAFTAR KEAHLIAN - HALAMAN BERANDA
// =====================================================

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
  if (!daftarSkill || !jumlahSkill) return;

  try {
    const response = await fetch("data/keahlian.json");

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const skills = await response.json();

    daftarSkill.innerHTML = "";

    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });

    jumlahSkill.textContent =
      `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;

  } catch (error) {
    jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    console.error("Gagal memuat keahlian:", error);
  }
}

muatKeahlian();


// =====================================================
// 2. TEMA GELAP - SEMUA HALAMAN
// =====================================================

const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");

    tombolTema.textContent =
      document.body.classList.contains("gelap")
        ? "Mode Terang"
        : "Mode Gelap";
  });
}


// =====================================================
// 3. PENGHITUNG KARAKTER - HALAMAN KONTAK
// =====================================================

const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent =
      `${kotakPesan.value.length}/300 karakter`;
  });
}


// =====================================================
// 4. DAFTAR PROYEK DAN FILTER
// =====================================================

let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <img src="${item.gambar}" alt="${item.alt}" width="280">
      <p>${item.deskripsi}</p>
    </article>
  `;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek || !jumlahProyek) return;

  daftarProyek.innerHTML =
    daftar.map((item) => buatKartu(item)).join("");

  jumlahProyek.textContent =
    `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

async function muatProyek() {
  if (!daftarProyek || !jumlahProyek) return;

  try {
    jumlahProyek.textContent = "Memuat data proyek...";

    const response = await fetch("data/proyek.json");

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    proyek = await response.json();

    if (!Array.isArray(proyek)) {
      throw new Error("Data proyek bukan array.");
    }

    tampilkanProyek(proyek);

  } catch (error) {
    jumlahProyek.textContent = "Data proyek gagal dimuat.";
    console.error("Gagal memuat proyek:", error);
  }
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);

  if (!tombol) return;

  tombol.addEventListener("click", () => {
    const semuaTombol =
      document.querySelectorAll(".tombol-filter");

    semuaTombol.forEach((item) => {
      item.classList.remove("aktif");
    });

    tombol.classList.add("aktif");

    if (kategori === "Semua") {
      tampilkanProyek(proyek);
      return;
    }

    const hasilFilter = proyek.filter((item) =>
      item.kategori.trim().toLowerCase() ===
      kategori.trim().toLowerCase()
    );

    tampilkanProyek(hasilFilter);
  });
}

if (daftarProyek && jumlahProyek) {
  muatProyek();

  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-html", "HTML");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-javascript", "JavaScript");
}


// =====================================================
// 5. REPOSITORI GITHUB TERBARU
// =====================================================

const username = "chimeyrpl-create";

const alamatRepo =
  `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

async function ambilRepo() {
  if (!daftarRepo || !statusRepo) return;

  try {
    statusRepo.textContent = "Memuat repositori GitHub...";

    const response = await fetch(alamatRepo);

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      statusRepo.textContent =
        "Belum ada repositori yang ditemukan.";

      daftarRepo.innerHTML = "";
      return;
    }

    daftarRepo.innerHTML = "";

    repos.forEach((repo) => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");

      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.rel = "noopener noreferrer";
      tautan.textContent = repo.name;

      item.appendChild(tautan);
      daftarRepo.appendChild(item);
    });

    statusRepo.textContent =
      `${repos.length} repositori GitHub terbaru berhasil dimuat.`;

  } catch (error) {
    statusRepo.textContent =
      "Repositori GitHub gagal dimuat. Silakan coba lagi.";

    daftarRepo.innerHTML = "";

    console.error("Gagal mengambil repositori:", error);
  }
}

ambilRepo();


// =====================================================
// SELESAI
// =====================================================