import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./expenseData";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });
  const [expenses, setExpenses] = useLocalStorage('expenses',expenseData);
  const [editingRowId, setEditingRowId] = useState("");

  // const [localData,setLocalData] = useLocalStorage()

  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          expense={expense}
          setExpense={setExpense}
          setEditingRowId={setEditingRowId}
          editingRowId={editingRowId}
        />
        <ExpenseTable
          expenses={expenses}
          setExpense={setExpense}
          setEditingRowId={setEditingRowId}
          setExpenses={setExpenses}
        />
      </div>
    </main>
  );
}

export default App;
