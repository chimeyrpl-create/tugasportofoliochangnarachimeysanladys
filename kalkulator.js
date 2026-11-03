function hitungNilai() {
    let tugas = document.getElementById("tugas").value;
    let pts = document.getElementById("pts").value;
    let pas = document.getElementById("pas").value;

    if (tugas === "" || pts === "" || pas === "") {
        alert("Silakan isi semua nilai!");
        return;
    }

    tugas = Number(tugas);
    pts = Number(pts);
    pas = Number(pas);

    if (
        tugas < 0 || tugas > 100 ||
        pts < 0 || pts > 100 ||
        pas < 0 || pas > 100
    ) {
        alert("Nilai harus antara 0 sampai 100!");
        return;
    }

    // Bobot: Tugas 30%, UTS 30%, UAS 40% (ubah sesuai kebutuhan)
    let nilaiAkhir = (tugas * 0.3) + (pts * 0.3) + (pas * 0.4);

    let grade;
    if (nilaiAkhir >= 85) {
        grade = "A";
    } else if (nilaiAkhir >= 75) {
        grade = "B";
    } else if (nilaiAkhir >= 60) {
        grade = "C";
    } else if (nilaiAkhir >= 50) {
        grade = "D";
    } else {
        grade = "E";
    }

    document.getElementById("hasil").innerHTML =
        "Nilai akhir: <strong>" + nilaiAkhir.toFixed(2) + "</strong>" +
        " | Grade: <strong>" + grade + "</strong>";
}