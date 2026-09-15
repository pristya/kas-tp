import { Trash2 } from "lucide-react";
import { Transaction } from "../types";
import { formatRupiah, formatDatePrint } from "../utils/formatters";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function DataTable({ transactions, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-4 px-4 font-semibold text-xs text-slate-600 uppercase">Tanggal</th>
              <th className="py-4 px-4 font-semibold text-xs text-slate-600 uppercase">Uraian</th>
              <th className="py-4 px-4 font-semibold text-xs text-slate-600 uppercase text-center w-24">Qty</th>
              <th className="py-4 px-4 font-semibold text-xs text-slate-600 uppercase text-right">Penerimaan</th>
              <th className="py-4 px-4 font-semibold text-xs text-slate-600 uppercase text-right">Pengeluaran</th>
              <th className="py-4 px-4 font-semibold text-xs text-slate-600 uppercase text-center w-16">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">Belum ada transaksi tercatat.</td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 align-top whitespace-nowrap">{formatDatePrint(tx.date)}</td>
                  <td className="py-3.5 px-4 align-top">{tx.description}</td>
                  <td className="py-3.5 px-4 text-center align-top">{tx.qty || "-"}</td>
                  <td className="py-3.5 px-4 text-right align-top text-emerald-600 font-medium">{tx.type === "IN" ? formatRupiah(tx.amount) : ""}</td>
                  <td className="py-3.5 px-4 text-right align-top text-rose-600 font-medium">{tx.type === "OUT" ? formatRupiah(tx.amount) : ""}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button onClick={() => onDelete(tx.id)} className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}