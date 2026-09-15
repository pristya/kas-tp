import { Transaction } from "@/types";

export const formatRupiah = (number: number) => {
    if (!number || number === 0) return "";
    return "Rp" + number.toLocaleString("id-ID");
  };

export const formatDatePrint = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
  };

export  const getPeriodText = (transactions: Transaction[]) => {
    if (transactions.length === 0) return "BELUM ADA TRANSAKSI";

    const dates = transactions.map((t) => new Date(t.date).getTime());
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

  const months = [
      "JANUARI",
      "FEBRUARI",
      "MARET",
      "APRIL",
      "MEI",
      "JUNI",
      "JULI",
      "AGUSTUS",
      "SEPTEMBER",
      "OKTOBER",
      "NOVEMBER",
      "DESEMBER",
    ];

    const minMonth = months[minDate.getMonth()];
    const maxMonth = months[maxDate.getMonth()];
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();

    if (minYear === maxYear) {
      if (minMonth === maxMonth) return `${minMonth} ${minYear}`;
      return `${minMonth} - ${maxMonth} ${minYear}`;
    }
    return `${minMonth} ${minYear} - ${maxMonth} ${maxYear}`;
}