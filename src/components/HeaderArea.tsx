import { Receipt, RotateCcw, Download } from "lucide-react";

interface Props {
  onReset: () => void;
  onDownload: () => void;
}

export default function HeaderArea({ onReset, onDownload }: Props) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-6 gap-4">
      
      {/* Judul & Logo */}
      <div className="flex items-center gap-2">
          <img src="logo tp.jpg" className="p-2.5 rounded-full w-20 "/>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kas Teman Pilah</h1>
          <p className="text-sm text-slate-500">Pencatatan Keuangan Terstruktur</p>
        </div>
      </div>
      
      {/* Action */}
      <div className="flex gap-3 w-full sm:w-auto">
        <button 
          onClick={onReset} 
          className="flex flex-1 sm:flex-none justify-center items-center gap-2 bg-rose-100 hover:bg-rose-200 text-rose-700 px-4 py-2.5 rounded-xl font-medium transition-all cursor-pointer text-sm"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        
        <button 
          onClick={onDownload} 
          className="flex flex-1 sm:flex-none justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-medium shadow-sm transition-all cursor-pointer text-sm"
        >
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

    </div>
  );
}