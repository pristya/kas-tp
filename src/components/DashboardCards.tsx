import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { formatRupiah } from "../utils/formatters";

interface Props {
  totalIncome: number;
  totalExpense: number;
  finalBalance: number;
}

export default function DashboardCards({ totalIncome, totalExpense, finalBalance }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Total Penerimaan</p>
          <h3 className="text-xl font-bold text-emerald-600">{formatRupiah(totalIncome) || "Rp0"}</h3>
        </div>
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><ArrowDownCircle className="w-6 h-6" /></div>
      </div>
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Total Pengeluaran</p>
          <h3 className="text-xl font-bold text-rose-600">{formatRupiah(totalExpense) || "Rp0"}</h3>
        </div>
        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><ArrowUpCircle className="w-6 h-6" /></div>
      </div>
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Saldo Akhir</p>
          <h3 className="text-xl font-bold text-slate-900">{formatRupiah(finalBalance) || "Rp0"}</h3>
        </div>
        <div className="p-3 text-slate-900 bg-amber-200 rounded-xl"><Wallet className="w-6 h-6" /></div>
      </div>
    </div>
  );
}