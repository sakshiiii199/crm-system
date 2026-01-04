import { useEffect, useState } from "react";
import "./EmployeeDashboard.css";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function EmployeeDashboard() {
  const [active, setActive] = useState("dashboard");
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  const loadData = async () => {
    const email = localStorage.getItem("email");
    const res = await fetch(`http://localhost:8081/api/employee/dashboard/${email}`);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:8081/api/employee/update-status/${id}/${status}`, {
      method: "POST",
    });
    loadData();
  };

  if (!data) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  // Filter
  const filtered = data.issues.filter(i =>
    Object.values(i).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "priority") return a.priority.localeCompare(b.priority);
    if (sortType === "deadline") return (a.deadline || "").localeCompare(b.deadline || "");
    return 0;
  });

  const chartData = [
    { name: "Assigned", count: data.assigned },
    { name: "Completed", count: data.completed },
    { name: "Pending", count: data.pending },
  ];

  return (
    <div className="employee-container">
      {/* SIDEBAR */}
      <aside className="emp-sidebar">
        <h3>Employee Panel</h3>
        <button onClick={() => setActive("dashboard")}>Dashboard</button>
        <button onClick={() => setActive("issues")}>Assigned Issues</button>
        <button onClick={() => setActive("notifications")}>Notifications</button>
        <button onClick={() => setActive("profile")}>Profile</button>
      </aside>

      {/* CONTENT */}
      <main className="emp-content">

        {active === "dashboard" && (
          <>
            <h2>Dashboard Overview</h2>

            {/* CARDS */}
            <div className="emp-cards">
              <div className="emp-card">Assigned<br />{data.assigned}</div>
              <div className="emp-card">Completed<br />{data.completed}</div>
              <div className="emp-card">Pending<br />{data.pending}</div>
            </div>

            {/* BAR CHART */}
            <div className="chart-box">
              <h3>Work Summary</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#2a5298" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* ASSIGNED ISSUES */}
        {active === "issues" && (
          <>
            <h2>Assigned Issues</h2>

            <div className="toolbar">
              <input
                type="text"
                placeholder="Search issue..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-box"
              />

              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="sort-box"
              >
                <option value="">Sort By</option>
                <option value="priority">Priority</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>

            <table className="emp-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Priority</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sorted.map(i => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.customerEmail}</td>
                    <td>{i.priority}</td>
                    <td>{i.deadline}</td>
                    <td>{i.status}</td>
                    <td>
                      {i.status !== "Resolved" && (
                        <button
                          className="resolve-btn"
                          onClick={() => updateStatus(i.id, "Resolved")}
                        >
                          Resolve
                        </button>
                      )}

                      {i.status !== "In Progress" && (
                        <button
                          className="progress-btn"
                          onClick={() => updateStatus(i.id, "In Progress")}
                        >
                          In-Progress
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* NOTIFICATIONS */}
        {active === "notifications" && (
          <>
            <h2>Notifications</h2>
            <ul className="notif-list">
              {data.notifications.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </>
        )}

        {/* PROFILE */}
        {active === "profile" && (
          <>
            <h2>Profile</h2>
            <div className="profile-card">
              <p><b>Name:</b> {data.profile.name}</p>
              <p><b>Email:</b> {data.profile.email}</p>
              <p><b>Role:</b> {data.profile.role}</p>
            </div>
          </>
        )}

      </main>
    </div>
  );
}