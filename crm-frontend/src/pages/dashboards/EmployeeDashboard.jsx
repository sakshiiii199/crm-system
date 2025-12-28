import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("issues");

  const loadData = async () => {
    const userEmail = localStorage.getItem("email");
    const res = await fetch(`http://localhost:8081/api/employee/dashboard/${userEmail}`);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:8081/api/employee/update-status/${id}/${status}`, { method: "POST" });
    loadData();
  };

  if (!data) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Employee Panel</h3>

        <button
          className={activeTab === "issues" ? "active" : ""}
          onClick={() => setActiveTab("issues")}
        >Assigned Issues</button>

        <button
          className={activeTab === "summary" ? "active" : ""}
          onClick={() => setActiveTab("summary")}
        >Work Summary</button>

        <button
          className={activeTab === "notifications" ? "active" : ""}
          onClick={() => setActiveTab("notifications")}
        >Notifications</button>

        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >Profile</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        <h2>Employee Dashboard</h2>

        {/* Tab Switcher */}
        {activeTab === "issues" && (
          <>
            <div className="cards">
              <div className="card">Assigned Issues<br />{data.assigned}</div>
              <div className="card">Completed<br />{data.completed}</div>
              <div className="card">Pending<br />{data.pending}</div>
            </div>

            <h3>Assigned Issues</h3>
            <table>
              <thead>
                <tr>
                  <th>Issue ID</th>
                  <th>Customer</th>
                  <th>Priority</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.issues.map(i => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.customerEmail}</td>
                    <td>{i.priority}</td>
                    <td>{i.deadline}</td>
                    <td>{i.status}</td>
                    <td>
                      {i.status !== "Resolved" && (
                        <button className="resolve" onClick={() => updateStatus(i.id, "Resolved")}>
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "summary" && (
          <>
            <h3>Work Summary</h3>
            <p>Total Assigned: {data.assigned}</p>
            <p>Completed: {data.completed}</p>
            <p>Pending: {data.pending}</p>
          </>
        )}

        {activeTab === "notifications" && (
          <>
            <h3>Notifications</h3>
            <ul>
              {data.notifications.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </>
        )}

        {activeTab === "profile" && (
          <>
            <h3>Profile</h3>
            <div className="profile-card">
              <p><b>Name:</b> {data.profile.name}</p>
              <p><b>Email:</b> {data.profile.email}</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}