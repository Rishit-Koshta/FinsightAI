import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <h1>Finance Tracker</h1>

      {user && (
        <div className="flex gap-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/ai">AI</Link>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;