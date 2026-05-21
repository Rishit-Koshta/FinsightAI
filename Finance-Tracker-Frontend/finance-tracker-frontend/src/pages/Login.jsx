

import { useState, useContext } from "react";
import { login } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(form);
      const { accessToken, userId } = res.data;
      localStorage.setItem("token", accessToken);
      loginUser({ userId });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&family=Outfit:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .login-page {
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          background: #faf9f6;
          display: flex;
        }
        .dot-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(45,92,66,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        /* Left panel */
        .left-panel {
          width: 45%;
          background: #1a3a2a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.5rem 3rem;
          position: relative;
          overflow: hidden;
        }
        .left-panel::before {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          border: 1px solid rgba(168,213,184,0.1);
          top: -100px; right: -100px;
        }
        .left-panel::after {
          content: '';
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          border: 1px solid rgba(168,213,184,0.07);
          bottom: 80px; left: -80px;
        }
        .panel-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; color: #fff; z-index: 1;
          text-decoration: none;
        }
        .panel-logo-icon {
          width: 34px; height: 34px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(168,213,184,0.3);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .panel-body { z-index: 1; }
        .panel-body h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem; font-weight: 600;
          color: #fff; line-height: 1.2;
          margin-bottom: 1rem;
        }
        .panel-body h2 em { font-style: italic; font-weight: 400; color: #a8d5b8; }
        .panel-body p { font-size: 0.9rem; color: rgba(255,255,255,0.5); font-weight: 300; line-height: 1.7; }
        .panel-chips { display: flex; flex-direction: column; gap: 12px; z-index: 1; }
        .panel-chip {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(168,213,184,0.15);
          border-radius: 12px; padding: 0.85rem 1rem;
        }
        .chip-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(168,213,184,0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .chip-text { font-size: 0.82rem; color: rgba(255,255,255,0.7); font-weight: 300; }
        .chip-text strong { display: block; font-weight: 500; color: #fff; font-size: 0.85rem; margin-bottom: 1px; }

        /* Right panel */
        .right-panel {
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          position: relative; padding: 2rem;
        }
        .form-card {
          width: 100%; max-width: 400px;
          background: #fff;
          border: 1px solid #e8e4d9;
          border-radius: 20px;
          padding: 2.5rem 2.25rem;
          position: relative; z-index: 1;
        }
        .form-eyebrow {
          font-size: 0.72rem; font-weight: 500;
          color: #2d5c42; letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem; font-weight: 600;
          color: #1c1c1c; margin-bottom: 0.4rem;
        }
        .form-sub { font-size: 0.85rem; color: #7a7a7a; font-weight: 300; margin-bottom: 2rem; }
        .form-sub a { color: #2d5c42; text-decoration: none; font-weight: 400; }
        .field { margin-bottom: 1.1rem; }
        .field label { display: block; font-size: 0.8rem; font-weight: 500; color: #4a4a4a; margin-bottom: 6px; }
        .field-wrap { position: relative; }
        .field input {
          width: 100%; padding: 0.75rem 1rem;
          border: 1px solid #e8e4d9;
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem; color: #1c1c1c;
          background: #faf9f6;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .field input:focus { border-color: #3d7a58; background: #fff; }
        .field input::placeholder { color: #b4b2a9; }
        .pass-toggle {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; padding: 4px;
          color: #7a7a7a;
        }
        .forgot { display: block; text-align: right; font-size: 0.78rem; color: #2d5c42; text-decoration: none; margin-top: -0.5rem; margin-bottom: 1.5rem; }
        .btn-submit {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #1a3a2a; color: #fff;
          padding: 0.9rem; border-radius: 100px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem; font-weight: 500;
          border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-submit:hover:not(:disabled) { background: #2d5c42; transform: translateY(-1px); }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .error-box {
          display: flex; align-items: center; gap: 8px;
          background: #fff5f5; border: 1px solid #fecaca;
          border-radius: 10px; padding: 0.75rem 1rem;
          margin-top: 1rem;
          font-size: 0.82rem; color: #b91c1c;
        }
        .divider { display: flex; align-items: center; gap: 12px; margin: 1.25rem 0; }
        .divider span { font-size: 0.75rem; color: #b4b2a9; white-space: nowrap; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #e8e4d9; }
        .signup-row { text-align: center; font-size: 0.82rem; color: #7a7a7a; margin-top: 1.25rem; }
        .signup-row a { color: #2d5c42; font-weight: 500; text-decoration: none; }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="login-page">

        {/* Left decorative panel */}
        <div className="left-panel">
          <Link to="/" className="panel-logo">
            <div className="panel-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a8d5b8" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            Finsight AI
          </Link>

          <div className="panel-body">
            <h2>Your finances,<br /><em>finally clear</em></h2>
            <p>Join thousands who've taken control of their money with AI-driven insights.</p>
          </div>

          <div className="panel-chips">
            {[
              {
                icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
                title: "Smart analytics",
                desc: "Charts & spending breakdowns",
              },
              {
                icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
                title: "AI insights",
                desc: "Personalised financial advice",
              },
              {
                icon: <><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></>,
                title: "Budget control",
                desc: "Track goals & stay on target",
              },
            ].map((c, i) => (
              <div className="panel-chip" key={i}>
                <div className="chip-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a8d5b8" strokeWidth="1.8">{c.icon}</svg>
                </div>
                <div className="chip-text">
                  <strong>{c.title}</strong>
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form panel */}
        <div className="right-panel">
          <div className="dot-bg" />
          <div className="form-card">
            <p className="form-eyebrow">Welcome back</p>
            <h1 className="form-title">Sign in</h1>
            <p className="form-sub">
              New here?{" "}
              <Link to="/register">Create a free account</Link>
            </p>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="email">Email address</label>
                <div className="field-wrap">
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="field-wrap">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    style={{ paddingRight: "2.5rem" }}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <a href="/forgot-password" className="forgot">Forgot password?</a>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? <span className="spinner" /> : (
                  <>
                    Sign in
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              {error && (
                <div className="error-box">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}
            </form>

            <div className="signup-row">
              Don't have an account? <Link to="/register">Sign up free</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Login;