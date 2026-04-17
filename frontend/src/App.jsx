import { useState } from "react";
import Crane from "./components/Crane";
import Operator from "./components/Operator";
import Earnings from "./components/Earnings";

function App() {
  const [page, setPage] = useState("crane");

  return (
    <div>
      {/* Navbar */}
      <div className="flex gap-4 p-4 bg-gray-800 text-white">
        <button onClick={() => setPage("crane")}>Cranes</button>
        <button onClick={() => setPage("operator")}>Operators</button>
        <button onClick={() => setPage("earnings")}>Finance</button>
      </div>

      {page === "crane" && <Crane />}
      {page === "operator" && <Operator />}
      {page === "earnings" && <Earnings />}
    </div>
  );
}

export default App;