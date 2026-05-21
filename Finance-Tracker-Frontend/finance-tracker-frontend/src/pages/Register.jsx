

import { useState } from "react";
import { register } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#faf9f6]">

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 bg-[#1a3a2a] text-white p-10 flex-col justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold">
          <div className="w-9 h-9 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
            <ArrowRight size={18} className="text-green-300" />
          </div>
          Finsight AI
        </Link>

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-serif leading-tight">
            Build smarter,<br />
            <span className="italic text-green-300">financial habits</span>
          </h1>

          <p className="mt-4 text-gray-300 text-sm">
            Take control of your money with AI-powered insights and tracking.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-center gap-3">
            <User size={16} /> Smart profile tracking
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} /> Secure account system
          </div>
          <div className="flex items-center gap-3">
            <Lock size={16} /> Data privacy & protection
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 justify-center items-center p-6">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-2xl border shadow-sm"
        >
          <p className="text-xs uppercase text-green-700 font-medium mb-1">
            Get started
          </p>

          <h2 className="text-2xl font-semibold mb-2">Create account</h2>

          <p className="text-sm text-gray-500 mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-medium">
              Sign in
            </Link>
          </p>

          {/* NAME */}
          <div className="relative mb-3">
            <User size={16} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg border bg-gray-50 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* EMAIL */}
          <div className="relative mb-3">
            <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-lg border bg-gray-50 focus:outline-none focus:border-green-700"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-4">
            <Lock size={16} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 rounded-lg border bg-gray-50 focus:outline-none focus:border-green-700"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3.5 text-gray-400"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="text-red-500 text-sm mb-3">{error}</div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#1a3a2a] text-white py-3 rounded-full hover:bg-[#2d5c42] transition"
          >
            {loading ? "Creating..." : "Create account"}
            {!loading && <ArrowRight size={16} />}
          </button>

          <p className="text-xs text-gray-400 mt-4 text-center">
            By signing up, you agree to our terms & privacy policy.
          </p>
        </form>

      </div>
    </div>
  );
}

export default Register;