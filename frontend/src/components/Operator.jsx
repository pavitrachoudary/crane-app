import { useEffect, useState } from "react";
import axios from "axios";

function Operator() {
  const [operators, setOperators] = useState([]);
  const [cranes, setCranes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    salary: "",
    assignedCrane: ""
  });

  // fetch cranes
  const fetchCranes = async () => {
    const res = await axios.get("http://localhost:5000/api/cranes");
    setCranes(res.data);
  };

  // fetch operators
  const fetchOperators = async () => {
    const res = await axios.get("http://localhost:5000/api/operators");
    setOperators(res.data);
  };

  // add operator
  const addOperator = async () => {
    if (!form.name) return;
    await axios.post("http://localhost:5000/api/operators", form);
    setForm({ name: "", phone: "", salary: "", assignedCrane: "" });
    fetchOperators();
  };

  useEffect(() => {
    fetchCranes();
    fetchOperators();
  }, []);

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">

        <h1 className="text-2xl font-bold mb-4 text-green-600">
          👷 Operator Management
        </h1>

        {/* Form */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <input
            placeholder="Name"
            className="border p-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Phone"
            className="border p-2"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            placeholder="Salary"
            className="border p-2"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />

          {/* Crane Dropdown */}
          <select
            className="border p-2"
            value={form.assignedCrane}
            onChange={(e) =>
              setForm({ ...form, assignedCrane: e.target.value })
            }
          >
            <option value="">Select Crane</option>
            {cranes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.craneNumber}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={addOperator}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Operator
        </button>

        {/* List */}
        <div className="mt-4 space-y-2">
          {operators.map((op) => (
            <div key={op._id} className="p-3 bg-gray-100 rounded">
              <p className="font-bold">{op.name}</p>
              <p>{op.phone}</p>
              <p>₹ {op.salary}</p>
              <p className="text-sm text-gray-600">
                Crane: {op.assignedCrane?.craneNumber}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Operator;