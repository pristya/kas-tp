import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Transaction } from "../types";

interface Props {
  onAdd: (tx: Transaction) => void;
}

export default function InputForm({ onAdd }: Props) {
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [qty, setQty] = useState<string>("");
  const [type, setType] = useState<"IN" | "OUT">("IN");
  const [amountInput, setAmountInput] = useState<string>("");

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setAmountInput(
      rawValue === "" ? "" : Number(rawValue).toLocaleString("id-ID"),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amountInput || !date) return;
    const rawAmount = Number(amountInput.replace(/\./g, ""));
    if (isNaN(rawAmount) || rawAmount <= 0) return;

    onAdd({
      id: Date.now().toString(),
      date,
      description,
      qty,
      type,
      amount: rawAmount,
    });

    setDescription("");
    setQty("");
    setAmountInput("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end"
      >
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Tanggal
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Jenis
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "IN" | "OUT")}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="IN">Penerimaan</option>
            <option value="OUT">Pengeluaran</option>
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Uraian / Keterangan
          </label>
          <input
            type="text"
            placeholder="Cth: Jual EE besar"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Jml Barang
          </label>
          <input
            type="text"
            placeholder="Cth: 1 btl"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Nominal (Rp)
          </label>
          <input
            type="text"
            placeholder="0"
            value={amountInput}
            onChange={handleAmountChange}
            required
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-6 flex justify-end mt-2">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Tambah Data
          </button>
        </div>
      </form>
    </div>
  );
}
