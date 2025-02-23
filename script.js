document.addEventListener("DOMContentLoaded", () => {
    const { jsPDF } = window.jspdf;

    document.getElementById("generatePDF").addEventListener("click", () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text("Borang Laporan Aktiviti Kokurikulum", 105, 15, null, null, "center");

        const namaPelapor = document.getElementById("namaPelapor").value;
        const namaAktiviti = document.getElementById("namaAktiviti").value;
        let tarikhAktiviti = document.getElementById("tarikhAktiviti").value;
        const hari = document.getElementById("hari").value;
        const jumlahMurid = document.getElementById("jumlahMurid").value;
        const masaMula = document.getElementById("masaMula").value;
        const masaTamat = document.getElementById("masaTamat").value;

        // Convert date format to dd/mm/yyyy
        const dateParts = tarikhAktiviti.split("-");
        if (dateParts.length === 3) {
            tarikhAktiviti = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        }

        let y = 30;
        const lineSpacing = 8;

        doc.text(`Nama Pelapor: ${namaPelapor}`, 20, y);
        y += lineSpacing;
        doc.text(`Nama Aktiviti: ${namaAktiviti}`, 20, y);
        y += lineSpacing;
        doc.text(`Tarikh Aktiviti: ${tarikhAktiviti}`, 20, y);
        y += lineSpacing;
        doc.text(`Hari: ${hari}`, 20, y);
        y += lineSpacing;
        doc.text(`Masa Aktiviti: ${masaMula} hingga ${masaTamat}`, 20, y);
        y += lineSpacing;
        doc.text(`Jumlah Kehadiran Murid: ${jumlahMurid}`, 20, y);
        y += lineSpacing;

        // Load and add images
        const imageUploads = document.querySelectorAll(".image-upload");
        let imageY = y + 10;
        let imageX = 20;

        const addImageToPDF = (index) => {
            if (index >= imageUploads.length) {
                doc.text("© 2025 by Mohamad Adri bin Maili, SK Stalon", 105, 280, null, null, "center");
                doc.save("Laporan_Kokurikulum.pdf");
                return;
            }

            const file = imageUploads[index].files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    doc.addImage(e.target.result, "JPEG", imageX, imageY, 50, 30);
                    imageX += 55;
                    if (imageX > 150) {
                        imageX = 20;
                        imageY += 40;
                    }
                    addImageToPDF(index + 1);
                };
                reader.readAsDataURL(file);
            } else {
                addImageToPDF(index + 1);
            }
        };

        addImageToPDF(0);
    });
});
