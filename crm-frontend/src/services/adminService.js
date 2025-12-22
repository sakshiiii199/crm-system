const API = "http://localhost:8081/api/admin";

export const getAdminStats = async () => {
  const res = await fetch(`${API}/stats`);
  return res.json();
};

export const getEmployees = async () => {
  const res = await fetch(`${API}/employees`);
  return res.json();
};

export const getCustomers = async () => {
  const res = await fetch(`${API}/customers`);
  return res.json();
};
