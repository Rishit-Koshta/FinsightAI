

import { Link } from "react-router-dom";

function Landing() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#faf9f6", color: "#1c1c1c", minHeight: "100vh" }}>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.25rem 3rem",
        background: "rgba(250,249,246,0.95)",
        borderBottom: "1px solid #e8e4d9",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#131313" }}>
          <div style={{
            width: 34, height: 34, background: "#1a3a2a", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a8d5b8" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          Finsight AI
        </div>

        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#features" style={{ color: "#4a4a4a", fontSize: "0.875rem", textDecoration: "none" }}>Features</a>
          <a href="#pricing" style={{ color: "#4a4a4a", fontSize: "0.875rem", textDecoration: "none" }}>Pricing</a>
          <a href="#about" style={{ color: "#4a4a4a", fontSize: "0.875rem", textDecoration: "none" }}>About</a>
          <Link to="/login" style={{
            background: "#418c66", color: "#fff",
            padding: "0.5rem 1.25rem", borderRadius: 100,
            fontSize: "0.82rem", fontWeight: 500, textDecoration: "none",
          }}>
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden", padding: "5rem 3rem 3rem" }}>
        {/* Dot background */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(45,92,66,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#e8f4ee", border: "1px solid #b8ddc8",
            padding: "0.35rem 1rem", borderRadius: 100,
            fontSize: "0.72rem", fontWeight: 500, color: "#69a785",
            letterSpacing: "0.08em", textTransform: "uppercase",
            marginBottom: "1.75rem",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3d7a58", display: "inline-block" }} />
            AI-Powered Finance
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
            fontWeight: 600, lineHeight: 1.1,
            maxWidth: 680, marginBottom: "1.25rem",
          }}>
            Manage money with{" "}
            <em style={{ color: "#000000", fontStyle: "italic", fontWeight: 400 }}>intelligence</em>
          </h1>

          <p style={{
            fontSize: "1rem", fontWeight: 300, color: "#4a4a4a",
            lineHeight: 1.75, maxWidth: 480, marginBottom: "2.5rem",
          }}>
            Track income, expenses and budgets — then let AI surface the insights that help you spend smarter and save more.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: "3.5rem" }}>
            <Link to="/register" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#44bc80", color: "#fff",
              padding: "0.9rem 2rem", borderRadius: 100,
              fontSize: "0.9rem", fontWeight: 500, textDecoration: "none",
            }}>
              Get started free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link to="#" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#55a77e",
              padding: "0.9rem 1.75rem", borderRadius: 100,
              fontSize: "0.9rem", fontWeight: 400, textDecoration: "none",
              border: "1.5px solid #53c586",
            }}>
              See how it works
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div style={{
        display: "flex", justifyContent: "center",
        background: "#2d664a", borderRadius: 16,
        margin: "0 3rem 3rem", overflow: "hidden",
      }}>
        {[
          { num: "₹2.4M", label: "Tracked monthly" },
          { num: "12K+", label: "Active users" },
          { num: "98%", label: "Accuracy rate" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, maxWidth: 200, padding: "1.5rem", textAlign: "center",
            borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", color: "#fff", marginBottom: 4 }}>
              {s.num}
            </div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div id="features" style={{
        display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 16, padding: "0 3rem 2rem",
      }}>
        {[
          {
            icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
            title: "Smart analytics",
            desc: "Visualize spending with interactive charts, monthly summaries, and category breakdowns that reveal where your money really goes.",
            chips: ["Charts", "Trends", "Reports"],
          },
          {
            icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
            title: "AI insights",
            desc: "Our AI learns your financial patterns and delivers personalised suggestions — from saving opportunities to subscriptions you've forgotten.",
            chips: ["Predictions", "Alerts"],
          },
          {
            icon: <><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></>,
            title: "Budget control",
            desc: "Set monthly budgets per category, track income vs. expenses in real time, and maintain a clear view of your balance at all times.",
            chips: ["Goals", "Limits", "Balance"],
          },
        ].map((f, i) => (
          <div key={i} style={{
            background: "#fff", border: "1px solid #e8e4d9",
            borderRadius: 16, padding: "1.75rem 1.5rem",
          }}>
            <div style={{
              width: 42, height: 42, background: "#e8f4ee",
              borderRadius: 10, display: "flex", alignItems: "center",
              justifyContent: "center", marginBottom: "1rem",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#369966" strokeWidth="1.8">
                {f.icon}
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.6rem" }}>
              {f.title}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#4a4a4a", lineHeight: 1.65, fontWeight: 300 }}>
              {f.desc}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "1rem" }}>
              {f.chips.map((c) => (
                <span key={c} style={{
                  fontSize: "0.68rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500,
                  background: "#e8f4ee", color: "#369966",
                  padding: "3px 10px", borderRadius: 100,
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.25rem 3rem",
        borderTop: "1px solid #e8e4d9",
        background: "#fff",
      }}>
        <span style={{ fontSize: "0.75rem", color: "#7a7a7a" }}>© 2026 Aurum Finance. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a key={l} href="#" style={{ fontSize: "0.75rem", color: "#7a7a7a", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Landing;