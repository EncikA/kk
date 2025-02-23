document.addEventListener("DOMContentLoaded", () => {
    const { jsPDF } = window.jspdf;

    const masaStart = document.getElementById("masaStart");
    const masaEnd = document.getElementById("masaEnd");
    const startTimeLabel = document.getElementById("startTime");
    const endTimeLabel = document.getElementById("endTime");

    function formatTime(value) {
        let hour = parseInt(value);
        let suffix = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:00 ${suffix}`;
    }

    masaStart.addEventListener("input", () => {
        startTimeLabel.textContent = formatTime(masaStart.value);
    });

    masaEnd.addEventListener("input", () => {
        endTimeLabel.textContent = formatTime(masaEnd.value);
    });

    document.getElementById("generatePDF").addEventListener("click", () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text("Borang Laporan Aktiviti Kokurikulum", 105, 15, null, null, "center");

        const namaPelapor = document.getElementById("namaPelapor").value;
        const namaAktiviti = document.getElementById("namaAktiviti").value;
        let tarikhAktiviti = document.getElementById("tarikhAktiviti").value;
        const hari = document.getElementById("hari").value;
        const jumlahMurid = document.getElementById("jumlahMurid").value;

        // Convert date format to dd/mm/yyyy
        const dateParts = tarikhAktiviti.split("-");
        if (dateParts.length === 3) {
            tarikhAktiviti = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        }

        const masaStartText = startTimeLabel.textContent;
        const masaEndText = endTimeLabel.textContent;

        let y = 30; // Starting y position for text
        const lineSpacing = 8;

        doc.text(`Nama Pelapor: ${namaPelapor}`, 20, y);
        y += lineSpacing;
        doc.text(`Nama Aktiviti: ${namaAktiviti}`, 20, y);
        y += lineSpacing;
        doc.text(`Tarikh Aktiviti: ${tarikhAktiviti}`, 20, y);
        y += lineSpacing;
        doc.text(`Hari: ${hari}`, 20, y);
        y += lineSpacing;
        doc.text(`Masa Aktiviti: ${masaStartText} hingga ${masaEndText}`, 20, y);
        y += lineSpacing;
        doc.text(`Jumlah Kehadiran Murid: ${jumlahMurid}`, 20, y);

        doc.text("© 2025 by Mohamad Adri bin Maili, SK Stalon", 105, 280, null, null, "center");

        doc.save("Laporan_Kokurikulum.pdf");
    });
});
