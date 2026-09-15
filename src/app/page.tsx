"use client";

import React, { useState, useEffect } from "react";
import { Transaction } from "../types";
import { generatePDF } from "../utils/pdfExport";
import DashboardCards from "@/components/DashboardCards";
import DataTable from "@/components/DataTable";
import InputForm from "@/components/InputForm";
import HeaderArea from "@/components/HeaderArea";

export default function Kasku() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem("kas_teman_pilah");
    if (savedData) setTransactions(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("kas_teman_pilah", JSON.stringify(transactions));
    }
  }, [transactions, isClient]);

  const handleAdd = (newTx: Transaction) => {
    const updatedTx = [...transactions, newTx].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setTransactions(updatedTx);
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };


  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus SEMUA data transaksi?")) {
      setTransactions([]);
      localStorage.removeItem("kas_teman_pilah");
    }
  };

  const totalIncome = transactions.filter((tx) => tx.type === "IN").reduce((acc, tx) => acc + tx.amount, 0);
  const totalExpense = transactions.filter((tx) => tx.type === "OUT").reduce((acc, tx) => acc + tx.amount, 0);
  const finalBalance = totalIncome - totalExpense;

  if (!isClient) return null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <HeaderArea 
          onReset={handleReset} 
          onDownload={() => generatePDF(transactions, totalIncome, totalExpense, finalBalance)} 
        />
        <DashboardCards totalIncome={totalIncome} totalExpense={totalExpense} finalBalance={finalBalance} />
        <InputForm onAdd={handleAdd} />
        <DataTable transactions={transactions} onDelete={handleDelete} />
      </div>
    </main>
  );
}