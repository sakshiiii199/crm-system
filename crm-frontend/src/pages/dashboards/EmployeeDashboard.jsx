import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EmployeeDashboard() {
  const {id} = useParams();
  const [data, setData] = useState(null);
  const username = localStorage.getItem("username");  // <-- SAVE DURING LOGIN

  const loadData = async () => {
    const userEmail = localStorage.getItem("email");
    
    const res = await fetch(`http://localhost:8081/api/employee/dashboard/${userEmail}`);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadData();
  }, []);

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
          <p><b>Name:</b> {data.username}</p>
          <p><b>Email:</b> {data.userEmail}</p>
        </div>
      </main>
    </div>
  );
}