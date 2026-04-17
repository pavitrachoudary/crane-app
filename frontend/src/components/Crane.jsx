import { useEffect, useState } from "react";
import axios from "axios";

function Crane() {
  const [cranes, setCranes] = useState([]);
  const [form, setForm] = useState({ craneNumber: "", model: "" });

  // fetch cranes
  const fetchCranes = async () => {
    const res = await axios.get("http://localhost:5000/api/cranes");
    setCranes(res.data);
  };

  // add crane
  const addCrane = async () => {
    if (!form.craneNumber) return;
    await axios.post("http://localhost:5000/api/cranes", form);
    setForm({ craneNumber: "", model: "" });
    fetchCranes();
  };

  useEffect(() => {
    fetchCranes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🚜 Crane Management
        </h1>

        {/* Form */}
        <div className="flex gap-2 mb-6">
          <input
            className="border p-2 rounded w-full"
            placeholder="Crane Number"
            value={form.craneNumber}
            onChange={(e) =>
              setForm({ ...form, craneNumber: e.target.value })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Model"
            value={form.model}
            onChange={(e) =>
              setForm({ ...form, model: e.target.value })
            }
          />

          <button
            onClick={addCrane}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {cranes.map((c) => (
            <div
              key={c._id}
              className="p-4 bg-gray-100 rounded-lg shadow flex justify-between"
            >
              <div>
                <p className="font-semibold">{c.craneNumber}</p>
                <p className="text-sm text-gray-600">{c.model}</p>
              </div>
              <span className="text-green-600 font-medium">
                {c.status}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Crane;