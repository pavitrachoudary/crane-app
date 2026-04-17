import { useEffect, useState } from "react";
import axios from "axios";

function Earnings() {
  const [earnings, setEarnings] = useState([]);
  const [cranes, setCranes] = useState([]);
  const [form, setForm] = useState({
    crane: "",
    income: "",
    expenses: "",
    description: ""
  });

  // fetch cranes
  const fetchCranes = async () => {
    const res = await axios.get("http://localhost:5000/api/cranes");
    setCranes(res.data);
  };

  // fetch earnings
  const fetchEarnings = async () => {
    const res = await axios.get("http://localhost:5000/api/earnings");
    setEarnings(res.data);
  };

  // add earning
  const addEarning = async () => {
    if (!form.crane) return;
    await axios.post("http://localhost:5000/api/earnings", form);
    setForm({ crane: "", income: "", expenses: "", description: "" });
    fetchEarnings();
  };

  useEffect(() => {
    fetchCranes();
    fetchEarnings();
  }, []);

  return (
    <div className="min-h-screen bg-yellow-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
          💰 Crane Finance
        </h1>

        {/* Form */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <select
            className="border p-2 rounded"
            value={form.crane}
            onChange={(e) =>
              setForm({ ...form, crane: e.target.value })
            }
          >
            <option value="">Select Crane</option>
            {cranes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.craneNumber}
              </option>
            ))}
          </select>

          <input
            placeholder="Income"
            className="border p-2 rounded"
            value={form.income}
            onChange={(e) =>
              setForm({ ...form, income: e.target.value })
            }
          />

          <input
            placeholder="Expenses"
            className="border p-2 rounded"
            value={form.expenses}
            onChange={(e) =>
              setForm({ ...form, expenses: e.target.value })
            }
          />

          <input
            placeholder="Description"
            className="border p-2 rounded"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <button
          onClick={addEarning}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
        >
          Add Entry
        </button>

        {/* List */}
        <div className="mt-6 space-y-3">
          {earnings.map((e) => (
            <div key={e._id} className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="font-semibold">
                🚜 {e.crane?.craneNumber}
              </p>
              <p>💰 Income: ₹ {e.income}</p>
              <p>💸 Expenses: ₹ {e.expenses}</p>
              <p className="font-bold text-green-600">
                📈 Profit: ₹ {e.income - e.expenses}
              </p>
              <p className="text-sm text-gray-600">{e.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Earnings;