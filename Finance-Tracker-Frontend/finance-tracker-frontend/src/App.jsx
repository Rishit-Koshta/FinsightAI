import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./component/Sidebar";
import ProtectedRoute from "./component/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AIChat from "./pages/AIChat";
import Landing from "./pages/Landing";

function Layout() {
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/" ||
  location.pathname === "/login" ||   // ✅ ADD THIS
  location.pathname === "/register";

  return (
    <div className="flex min-h-screen bg-gray-100">

  {!hideSidebar && <Sidebar />}

      {/* Main Content */}
      
      <div className={`${!hideSidebar ? "flex-1 p-6 ml-64" : ""} w-full`}>
        <Routes>

          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai"
            element={
              <ProtectedRoute>
                <AIChat />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;