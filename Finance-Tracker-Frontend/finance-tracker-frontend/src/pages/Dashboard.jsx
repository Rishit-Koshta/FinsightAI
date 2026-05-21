
import { useEffect, useState, useContext } from "react";
import {
  getMonthlySummary,
  getDailyTrend,
  getCategoryExpense,
  getPrediction,
} from "../api/api";
import { AuthContext } from "../context/AuthContext";

import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&family=Outfit:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .db-root {
    font-family: 'Outfit', sans-serif;
    background: #faf9f6;
    min-height: 100vh;
    display: flex;
  }

  /* Sidebar */
  .sidebar {
    width: 220px;
    background: #1a3a2a;
    display: flex;
    flex-direction: column;
    padding: 1.75rem 1.25rem;
    position: sticky;
    top: 0;
    height: 100vh;
    flex-shrink: 0;
  }
  .sidebar-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; color: #fff;
    text-decoration: none;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .sidebar-logo-icon {
    width: 32px; height: 32px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(168,213,184,0.3);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 0.65rem 0.85rem;
    border-radius: 10px;
    font-size: 0.85rem; font-weight: 400;
    color: rgba(255,255,255,0.55);
    cursor: pointer;
    transition: all 0.15s;
    text-decoration: none;
    border: none; background: none; width: 100%; text-align: left;
  }
  .nav-item:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85); }
  .nav-item.active { background: rgba(168,213,184,0.12); color: #a8d5b8; }
  .nav-item svg { flex-shrink: 0; }
  .sidebar-footer {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 1.25rem;
  }
  .user-pill {
    display: flex; align-items: center; gap: 10px;
  }
  .user-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(168,213,184,0.15);
    border: 1px solid rgba(168,213,184,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 500; color: #a8d5b8;
  }
  .user-name { font-size: 0.8rem; color: rgba(255,255,255,0.6); }

  /* Main */
  .main {
    flex: 1;
    padding: 2rem 2.5rem;
    overflow-y: auto;
  }
  .topbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 2rem;
  }
  .topbar-left h1 {
    font-family: 'Playfair Display', serif;
    font-size: 1.7rem; font-weight: 600; color: #1c1c1c;
    margin-bottom: 2px;
  }
  .topbar-left p { font-size: 0.82rem; color: #7a7a7a; font-weight: 300; }
  .month-badge {
    display: flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid #e8e4d9;
    border-radius: 10px; padding: 0.5rem 1rem;
    font-size: 0.82rem; color: #4a4a4a; font-weight: 400;
  }

  /* Stat cards */
  .stat-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; margin-bottom: 1.75rem; }
  .stat-card {
    background: #fff;
    border: 1px solid #e8e4d9;
    border-radius: 16px;
    padding: 1.4rem 1.5rem;
    display: flex; flex-direction: column; gap: 10px;
    transition: border-color 0.2s;
  }
  .stat-card:hover { border-color: #b8ddc8; }
  .stat-top { display: flex; align-items: center; justify-content: space-between; }
  .stat-label { font-size: 0.78rem; font-weight: 500; color: #7a7a7a; letter-spacing: 0.04em; text-transform: uppercase; }
  .stat-icon {
    width: 34px; height: 34px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
  }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 600; color: #1c1c1c; }
  .stat-sub { font-size: 0.75rem; color: #7a7a7a; font-weight: 300; }
  .stat-pill {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 0.7rem; font-weight: 500;
    padding: 2px 8px; border-radius: 100px;
  }

  /* Charts grid */
  .charts-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px; margin-bottom: 1.75rem; }
  .chart-card {
    background: #fff;
    border: 1px solid #e8e4d9;
    border-radius: 16px;
    padding: 1.5rem;
  }
  .chart-card.full { grid-column: 1 / -1; }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
  .card-title { font-size: 0.95rem; font-weight: 500; color: #1c1c1c; }
  .card-sub { font-size: 0.75rem; color: #7a7a7a; margin-top: 2px; }
  .card-badge {
    font-size: 0.68rem; font-weight: 500;
    padding: 3px 10px; border-radius: 100px;
    background: #e8f4ee; color: #2d5c42;
    letter-spacing: 0.05em; text-transform: uppercase;
  }

  /* AI Insight */
  .insight-card {
    background: #1a3a2a;
    border-radius: 16px;
    padding: 1.5rem;
    display: flex; gap: 1.25rem; align-items: flex-start;
  }
  .insight-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(168,213,184,0.12);
    border: 1px solid rgba(168,213,184,0.2);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .insight-label { font-size: 0.7rem; font-weight: 500; color: #a8d5b8; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; }
  .insight-text { font-size: 0.88rem; color: rgba(255,255,255,0.75); font-weight: 300; line-height: 1.7; }

  /* Loading / empty */
  .loading-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #faf9f6; font-family: 'Outfit', sans-serif;
  }
  .loading-inner { text-align: center; }
  .loading-spinner {
    width: 36px; height: 36px;
    border: 3px solid #e8e4d9;
    border-top-color: #1a3a2a;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-size: 0.9rem; color: #7a7a7a; font-weight: 300; }

  /* Legend dots */
  .legend-row { display: flex; gap: 16px; }
  .legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: #4a4a4a; }
  .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#fff", border: "1px solid #e8e4d9", borderRadius: 10, padding: "8px 14px", fontSize: "0.8rem", color: "#1c1c1c", fontFamily: "'Outfit', sans-serif" }}>
        {label && <p style={{ color: "#7a7a7a", marginBottom: 4, fontSize: "0.72rem" }}>{label}</p>}
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontWeight: 500 }}>₹{p.value?.toLocaleString()}</p>
        ))}
      </div>
    );
  }
  return null;
};

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [prediction, setPrediction] = useState("");

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const formattedMonthYear = now.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // ✅ Dynamic greeting
  const hour = now.getHours();
  let greeting = "Hello";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  useEffect(() => {
    if (!user) return;
    
    async function fetchData() {
      try {
        const summaryRes = await getMonthlySummary(user.userId, year, month);
        setSummary(summaryRes.data);

        const trendRes = await getDailyTrend(user.userId, year, month);
        // setTrendData(trendRes.data.map((item) => ({ day: item.day, expense: item.amount })));
        setTrendData(
  trendRes.data.map((item) => ({
    day: new Date(item.date).getDate(), // ✅ extract day
    expense: item.amount,
  }))
);

        const categoryRes = await getCategoryExpense(user.userId, year, month);
        setCategoryData(categoryRes.data.map((item) => ({ name: item.category, value: item.amount })));

        const predictionRes = await getPrediction(user.userId);
        setPrediction(predictionRes.data);
      } catch (err) {
        console.error("Dashboard Error:", err);
      }
    }
    fetchData();
  }, [user]);

  if (!user || !summary) {
    return (
      <>
        <style>{styles}</style>
        <div className="loading-wrap">
          <div className="loading-inner">
            <div className="loading-spinner" />
            <p className="loading-text">{!user ? "Please sign in to continue." : "Loading your dashboard..."}</p>
          </div>
        </div>
      </>
    );
  }

  const pieData = [
    { name: "Income", value: summary.income },
    { name: "Expense", value: summary.expense },
  ];

  const CATEGORY_COLORS = ["#1a3a2a", "#2d5c42", "#3d7a58", "#5a9e78", "#a8d5b8", "#c8e8d8"];
  const PIE_COLORS = ["#3d7a58", "#f87171"];

  const savingsRate = summary.income > 0
    ? Math.round(((summary.income - summary.expense) / summary.income) * 100)
    : 0;

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <>
      <style>{styles}</style>
      <div className="db-root">


        {/* Main content */}
        <main className="main">

          {/* Topbar */}
          <div className="topbar">
            <div className="topbar-left">
              <h1>{greeting}</h1>
              <p>Here's your financial overview for {formattedMonthYear}</p>
            </div>
            <div className="month-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a7a7a" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formattedMonthYear}
            </div>
          </div>

          {/* Stat cards */}
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-label">Income</span>
                <div className="stat-icon" style={{ background: "#e8f4ee" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d5c42" strokeWidth="2">
                    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                  </svg>
                </div>
              </div>
              <div className="stat-value" style={{ color: "#1a3a2a" }}>₹{summary.income?.toLocaleString()}</div>
              <div className="stat-sub">Total income this month</div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-label">Expenses</span>
                <div className="stat-icon" style={{ background: "#fff5f5" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                  </svg>
                </div>
              </div>
              <div className="stat-value" style={{ color: "#c53030" }}>₹{summary.expense?.toLocaleString()}</div>
              <div className="stat-sub">Total spent this month</div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span className="stat-label">Balance</span>
                <div className="stat-icon" style={{ background: "#eff6ff" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
              </div>
              <div className="stat-value" style={{ color: "#1d4ed8" }}>₹{summary.balance?.toLocaleString()}</div>
              <div className="stat-sub">
                <span className="stat-pill" style={{ background: savingsRate >= 0 ? "#e8f4ee" : "#fff5f5", color: savingsRate >= 0 ? "#2d5c42" : "#c53030" }}>
                  {savingsRate >= 0 ? "▲" : "▼"} {Math.abs(savingsRate)}% savings rate
                </span>
              </div>
            </div>
          </div>

          {/* Charts row */}
          <div className="charts-grid">

            {/* Daily trend */}
            <div className="chart-card">
              <div className="card-header">
                <div>
                  <p className="card-title">Daily expense trend</p>
                  <p className="card-sub">March 2026</p>
                </div>
                <span className="card-badge">Line</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#7a7a7a", fontFamily: "Outfit" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#7a7a7a", fontFamily: "Outfit" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="expense" stroke="#1a3a2a" strokeWidth={2} dot={{ fill: "#1a3a2a", r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Income vs Expense donut */}
            <div className="chart-card">
              <div className="card-header">
                <div>
                  <p className="card-title">Income vs expense</p>
                  <p className="card-sub">This month at a glance</p>
                </div>
                <span className="card-badge">Donut</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="legend-row">
                  <div className="legend-item"><span className="legend-dot" style={{ background: PIE_COLORS[0] }} />Income</div>
                  <div className="legend-item"><span className="legend-dot" style={{ background: PIE_COLORS[1] }} />Expense</div>
                </div>
              </div>
            </div>

            {/* Category breakdown — full width bar chart */}
            <div className="chart-card full">
              <div className="card-header">
                <div>
                  <p className="card-title">Category breakdown</p>
                  <p className="card-sub">Spending by category this month</p>
                </div>
                <span className="card-badge">Bar</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={categoryData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#7a7a7a", fontFamily: "Outfit" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#7a7a7a", fontFamily: "Outfit" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insight */}
          <div className="insight-card">
            <div className="insight-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a8d5b8" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <p className="insight-label">AI Insight</p>
              <p className="insight-text">{prediction || "Analysing your spending patterns..."}</p>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

export default Dashboard;

