// JavaScript Chang Nara Chimey Sanladys
// Dipasang di ketiga halaman dengan defer


// =====================================================
// 1. DAFTAR KEAHLIAN - HALAMAN BERANDA
// =====================================================

const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

async function muatKeahlian() {
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
    jumlahSkill.textContent =
      "Daftar keahlian gagal dimuat.";

    console.error("Gagal memuat keahlian:", error);
  }
}

if (daftarSkill && jumlahSkill) {
  muatKeahlian();
}


// =====================================================
// 2. TEMA GELAP - SEMUA HALAMAN
// =====================================================

const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  tombolTema.addEventListener("click", () => {

    document.body.classList.toggle("gelap");

    if (document.body.classList.contains("gelap")) {
      tombolTema.textContent = "Mode Terang";
    } else {
      tombolTema.textContent = "Mode Gelap";
    }

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

// Data proyek diambil dari proyek.json
let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");


// Membuat kartu proyek
function buatKartu(item) {

  return `
    <article class="kartu">

      <span class="label">${item.kategori}</span>

      <h3>${item.judul}</h3>

      <img
        src="${item.gambar}"
        alt="${item.alt}"
        width="280"
      >

      <p>${item.deskripsi}</p>

    </article>
  `;
}


// Menampilkan proyek
function tampilkanProyek(daftar) {

  if (!daftarProyek || !jumlahProyek) {
    return;
  }

  const semuaKartu = daftar.map((item) => {
    return buatKartu(item);
  });

  daftarProyek.innerHTML = semuaKartu.join("");

  jumlahProyek.textContent =
    `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}


// =====================================================
// MENGAMBIL DATA DARI proyek.json
// =====================================================

async function muatProyek() {

  try {

    jumlahProyek.textContent =
      "Memuat data proyek...";

    const response =
      await fetch("data/proyek.json");

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    proyek = await response.json();

    // Pastikan isi JSON berupa array
    if (!Array.isArray(proyek)) {
      throw new Error("Data proyek bukan array.");
    }

    tampilkanProyek(proyek);

  } catch (error) {

    jumlahProyek.textContent =
      "Data proyek gagal dimuat.";

    console.error(
      "Gagal memuat proyek:",
      error
    );

  }
}


// =====================================================
// FILTER PROYEK
// =====================================================

function pasangFilter(idTombol, kategori) {

  const tombol =
    document.querySelector(idTombol);

  if (!tombol) {
    return;
  }

  tombol.addEventListener("click", () => {

    // Ambil semua tombol filter
    const semuaTombol =
      document.querySelectorAll(".tombol-filter");

    // Hapus class aktif dari semua tombol
    semuaTombol.forEach((item) => {
      item.classList.remove("aktif");
    });

    // Tambahkan class aktif
    // ke tombol yang sedang diklik
    tombol.classList.add("aktif");


    // Jika memilih SEMUA
    if (kategori === "Semua") {

      tampilkanProyek(proyek);

      return;
    }


    // Filter berdasarkan kategori
    const hasilFilter =
      proyek.filter((item) => {

        return (
          item.kategori.trim().toLowerCase() ===
          kategori.trim().toLowerCase()
        );

      });


    // Tampilkan hasil filter
    tampilkanProyek(hasilFilter);

  });
}


// =====================================================
// MENJALANKAN PROYEK DAN FILTER
// =====================================================

if (daftarProyek && jumlahProyek) {

  // Ambil data proyek dari JSON
  muatProyek();

  // Pasang tombol filter
  pasangFilter("#filter-semua", "Semua");

  pasangFilter("#filter-html", "HTML");

  pasangFilter("#filter-css", "CSS");

  pasangFilter(
    "#filter-javascript",
    "JavaScript"
  );
}


// =====================================================
// 5. REPOSITORI GITHUB TERBARU
// =====================================================

const username = "chimeyrpl-create";

const alamatRepo =
  `https://api.github.com/users/${username}/repos`;

const pilihan =
  "?sort=updated&per_page=6";

const daftarRepo =
  document.querySelector("#daftar-repo");

const statusRepo =
  document.querySelector("#status-repo");


// Mengambil repositori GitHub
async function ambilRepo() {

  try {

    const response =
      await fetch(alamatRepo + pilihan);

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const repos =
      await response.json();

    daftarRepo.innerHTML = "";

    repos.forEach((repo) => {

      const item =
        document.createElement("li");

      const tautan =
        document.createElement("a");

      tautan.href =
        repo.html_url;

      tautan.target =
        "_blank";

      tautan.rel =
        "noopener noreferrer";

      tautan.textContent =
        repo.name;

      item.appendChild(tautan);

      daftarRepo.appendChild(item);

    });

    statusRepo.textContent =
      `${repos.length} repositori yang terakhir diperbarui:`;

  } catch (error) {

    statusRepo.textContent =
      "Repositori GitHub gagal dimuat.";

    console.error(
      "Gagal mengambil repositori:",
      error
    );

  }
}


// Jalankan GitHub API
if (daftarRepo && statusRepo) {
  ambilRepo();
}