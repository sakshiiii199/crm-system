import "./EmployeeDashboard.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EmployeeDashboard() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const loadData = async () => {
    const email = localStorage.getItem("email");
    const res = await fetch(`http://localhost:8081/api/employee/dashboard/${email}`);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (issueId, status) => {
    await fetch(`http://localhost:8081/api/employee/update-status/${issueId}/${status}`, {
      method: "POST"
    });
    loadData();   // refresh UI after update
  };

  if (!data) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Employee Panel</h3>
        <button>Assigned Issues</button>
        <button>Work Summary</button>
        <button>Notifications</button>
        <button>Profile</button>
      </aside>

      <main className="content">
        <h2>Employee Dashboard</h2>

        {/* STATS */}
        <div className="cards">
          <div className="card">Assigned Issues<br />{data.assigned}</div>
          <div className="card">Completed<br />{data.completed}</div>
          <div className="card">Pending<br />{data.pending}</div>
        </div>

        {/* ASSIGNED ISSUES */}
        <h3>Assigned Issues</h3>
        <table>
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Customer</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>   {/* <-- FIXED */}
            </tr>
          </thead>

          <tbody>
            {data.issues.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.customerEmail}</td>
                <td>{i.priority}</td>
                <td>{i.deadline}</td>
                <td>{i.status}</td>
                <td>
                  {i.status !== "Resolved" && (
                    <button
                    className="status-btn resolve"
                      
                      onClick={() => updateStatus(i.id, "Resolved")}
                    >
                      Resolve
                    </button>
                  )}

                  {i.status !== "In Progress" && (
                    <button
                    className="status-btn progress"
                      
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

        {/* NOTIFICATIONS */}
        <h3>Notifications</h3>
        <ul>
          {data.notifications.map((n, i) => <li key={i}>{n}</li>)}
        </ul>

        {/* PROFILE */}
        <h3>Profile</h3>
        <div className="profile-card">
          <p><b>Name:</b> {data.profile.name}</p>
          <p><b>Email:</b> {data.profile.email}</p>
        </div>
      </main>
    </div>
  );
}