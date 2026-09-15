export interface Transaction {
  id: string;
  date: string;
  description: string;
  qty: string;
  type: "IN" | "OUT";
  amount: number;
}