import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Transaction } from "../types";
import { formatRupiah, formatDatePrint, getPeriodText } from "./formatters";

export const generatePDF = (
  transactions: Transaction[], 
  totalIncome: number, 
  totalExpense: number, 
  finalBalance: number
) => {
  const doc = new jsPDF();
  const periodText = getPeriodText(transactions);

  doc.setFontSize(27);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("LAPORAN KAS", 105, 20, { align: "center" });

  doc.setFontSize(21);
  doc.setTextColor(5, 150, 105);
  doc.text("TEMAN PILAH", 105, 29, { align: "center" });

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`PERIODE ${periodText}`, 105, 36, { align: "center" });

  const tableRows = transactions.map((tx) => [
    formatDatePrint(tx.date),
    tx.description,
    tx.qty || "-",
    tx.type === "IN" ? formatRupiah(tx.amount) : "",
    tx.type === "OUT" ? formatRupiah(tx.amount) : "",
  ]);

  autoTable(doc, {
    startY: 42,
    head: [["Tanggal", "Uraian", "Qty", "Penerimaan", "Pengeluaran"]],
    body: tableRows,
    foot: [
      ["", "", "", formatRupiah(totalIncome), formatRupiah(totalExpense)],
      [
        formatDatePrint(new Date().toISOString().split("T")[0]),
        "SALDO AKHIR", "",
        finalBalance < 0 ? formatRupiah(Math.abs(finalBalance)) : "",
        finalBalance >= 0 ? formatRupiah(finalBalance) : "",
      ],
    ],
    showHead: "firstPage",
    showFoot: "lastPage",
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 3, font: "helvetica" },
    headStyles: { fillColor: [248, 250, 252], textColor: [71, 85, 105], fontStyle: "bold", halign: "center" },
    columnStyles: {
      0: { cellWidth: 25, halign: "left" },
      1: { cellWidth: "auto", halign: "left" },
      2: { cellWidth: 15, halign: "center" },
      3: { cellWidth: 35, halign: "right", textColor: [4, 120, 87] },
      4: { cellWidth: 35, halign: "right", textColor: [190, 18, 60] },
    },
    didParseCell: function (data) {
      if (data.section === "foot") {
        if (data.row.index === 0) {
          data.cell.styles.fillColor = [241, 245, 249];
          data.cell.styles.textColor = [15, 23, 42];
        }
        if (data.row.index === 1) {
          data.cell.styles.fillColor = [15, 23, 42];
          data.cell.styles.textColor = [255, 255, 255];
          if (data.column.index === 1) data.cell.styles.textColor = [52, 211, 153];
        }
      }
    },
  });

  doc.save(`Laporan_Kas_${periodText.replace(/\s/g, "_")}.pdf`);
};