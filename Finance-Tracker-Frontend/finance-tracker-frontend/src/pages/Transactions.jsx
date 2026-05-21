

import { useState, useEffect, useContext } from "react";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getBudget,
  createBudget,
} from "../api/api";
import { AuthContext } from "../context/AuthContext";

function Transactions() {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [budget, setBudget] = useState(0);
  const [inputBudget, setInputBudget] = useState("");

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "EXPENSE",
    category: "FOOD",
    date: "",
    note: "",
  });

  useEffect(() => {
    if (!user) return;
    loadTransactions();
    loadBudget();
  }, [user]);

  const loadTransactions = async () => {
    const res = await getTransactions(user.userId);
    setData(res.data);
  };

  const loadBudget = async () => {
    const res = await getBudget(user.userId);
    setBudget(res.data?.monthlyLimit || 0);
  };

  const handleSaveBudget = async () => {
    await createBudget({
      userId: user.userId,
      monthlyLimit: Number(inputBudget),
    });

    setBudget(Number(inputBudget));
    setInputBudget("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateTransaction(editingId, {
        ...form,
        userId: user.userId,
      });
      setEditingId(null);
    } else {
      await createTransaction({
        ...form,
        userId: user.userId,
      });
    }

    setForm({
      title: "",
      amount: "",
      type: "EXPENSE",
      category: "FOOD",
      date: "",
      note: "",
    });

    loadTransactions();
  };

  const handleEdit = (t) => {
    setEditingId(t.id);
    setForm({
      title: t.title,
      amount: t.amount,
      type: t.type,
      category: t.category,
      date: t.date,
      note: t.note || "",
    });
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    loadTransactions();
  };

  const totalExpense = data
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const percentage = budget
    ? Math.min((totalExpense / budget) * 100, 100)
    : 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔥 HEADER */}
      <h2 className="text-3xl font-bold mb-6">Transactions</h2>

      {/* 🔥 BUDGET CARD */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6">

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-500 text-sm">Monthly Budget</p>
            <p className="text-2xl font-bold">₹{budget}</p>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Set budget"
              value={inputBudget}
              onChange={(e) => setInputBudget(e.target.value)}
              className="border px-3 py-1 rounded-lg"
            />
            <button
              onClick={handleSaveBudget}
              className="bg-green-600 text-white px-4 py-1 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>

        {/* 🔥 PROGRESS BAR */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${
              percentage > 100
                ? "bg-red-500"
                : percentage > 80
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-sm mt-2 text-gray-600">
          ₹{totalExpense} spent of ₹{budget}
        </p>

      </div>

      {/* 🔥 FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 mb-8 bg-white p-6 rounded-2xl shadow"
      >

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded-lg"
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="border p-2 rounded-lg"
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded-lg"
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 rounded-lg"
        >
          <option value="FOOD">Food</option>
          <option value="RENT">Rent</option>
          <option value="SALARY">Salary</option>
          <option value="SHOPPING">Shopping</option>
          <option value="ENTERTAINMENT">Entertainment</option>
          <option value="TRAVEL">Travel</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 rounded-lg"
        />

        <input
          placeholder="Note"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="border p-2 rounded-lg col-span-2"
        />

        <button className="bg-green-600 text-white py-2 rounded-lg col-span-2">
          {editingId ? "Update Transaction" : "Add Transaction"}
        </button>

      </form>

      {/* 🔥 TRANSACTION LIST */}
      <div className="space-y-4">
        {data.map((t) => (
          <div
            key={t.id}
            className="bg-white p-4 rounded-2xl shadow flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <p className="font-semibold text-lg">{t.title}</p>

              <p className="text-sm text-gray-500">
                ₹{t.amount} • {t.category}
              </p>

              {t.note && (
                <p className="text-xs text-gray-400">{t.note}</p>
              )}
            </div>

            <div className="flex items-center gap-4">

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  t.type === "INCOME"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {t.type}
              </span>

              <button
                onClick={() => handleEdit(t)}
                className="text-blue-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(t.id)}
                className="text-red-500"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Transactions;