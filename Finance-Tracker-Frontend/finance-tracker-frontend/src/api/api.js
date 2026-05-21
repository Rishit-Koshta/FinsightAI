import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// AUTH
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

//budget
export const createBudget = (data) =>
  API.post("/api/budgets", data);

// TRANSACTIONS
export const getTransactions = (userId) =>
  API.get(`/api/transactions/user/${userId}`);

export const createTransaction = (data) =>
  API.post("/api/transactions", data);

// ANALYTICS
export const getMonthlySummary = (userId, year, month) =>
  API.get(`/api/analytics/monthly-summary`, {
    params: { userId, year, month },
  });

  // ✅ GET budget
export const getBudget = (userId) =>
  API.get(`/api/budgets/user/${userId}`);



  //delete transaction
  export const deleteTransaction = (id) =>
  API.delete(`/api/transactions/${id}`);

  //update transaction
  // UPDATE
export const updateTransaction = (id, data) =>
  API.put(`/api/transactions/${id}`, data);

  export const getDailyTrend = (userId, year, month) =>
  API.get("/api/analytics/daily-expense-trend", {
    params: { userId, year, month },
  });

  export const getCategoryExpense = (userId, year, month) =>
  API.get("/api/analytics/category-expense", {
    params: { userId, year, month },
  });

// AI
export const askAI = (data) => API.post("/api/ai/ask", data);

// INSIGHTS

export const getPrediction = (userId) =>
  API.get("/api/insights/prediction", {
    params: { userId },
  });