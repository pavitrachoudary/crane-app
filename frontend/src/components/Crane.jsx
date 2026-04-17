import { useEffect, useState } from "react";
import axios from "axios";

function Crane() {
  const [cranes, setCranes] = useState([]);
  const [form, setForm] = useState({
    craneNumber: "",
    model: ""
  });

  const API = "https://crane-backend-q5xk.onrender.com";

  const fetchCranes = async () => {
    try {
      const res = await axios.get(`${API}/api/cranes`);
      setCranes(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      setCranes([]);
    }
  };

  const addCrane = async () => {
    if (!form.craneNumber) return;

    try {
      await axios.post(`${API}/api/cranes`, form);
      setForm({ craneNumber: "", model: "" });
      fetchCranes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCranes();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🚜 Crane Management</h1>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Crane Number"
          value={form.craneNumber}
          onChange={(e) =>
            setForm({ ...form, craneNumber: e.target.value })
          }
        />

        <input
          placeholder="Model"
          value={form.model}
          onChange={(e) =>
            setForm({ ...form, model: e.target.value })
          }
        />

        <button onClick={addCrane}>Add</button>
      </div>

      <div>
        {Array.isArray(cranes) &&
          cranes.map((c) => (
            <div key={c._id}>
              {c.craneNumber} - {c.model}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Crane;