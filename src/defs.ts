export interface User {
  loading: boolean;
  isSignedIn: boolean;
  uid: string | null;
  email: string | null;
  theme: "light" | "dark";
  signOut: () => void;
}

export type TransactionTypes = "withdrawl" | "deposit";

export interface Transaction {
  id: string;
  type: TransactionTypes;
  amount: number;
}
