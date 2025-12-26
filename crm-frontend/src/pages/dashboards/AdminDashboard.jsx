import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [active, setActive] = useState("overview");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8081/api/admin/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  // --- ASSIGN ISSUE FUNCTION ---
  const assignIssue = async (issueId, username) => {
    const res= await fetch(
      `http://localhost:8081/api/admin/assign/${issueId}/${username}`,
      { method: "POST" }
    );
    alert("Issue Assigned!");
    loadDashboard();
  };

  if (!data) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Admin Panel</h3>
        <button className={active === "overview" ? "active" : ""} onClick={() => setActive("overview")}>Overview</button>
        <button className={active === "issues" ? "active" : ""} onClick={() => setActive("issues")}>Issue Management</button>
        <button className={active === "employees" ? "active" : ""} onClick={() => setActive("employees")}>Employees</button>
        <button className={active === "customers" ? "active" : ""} onClick={() => setActive("customers")}>Customers</button>
        <button className={active === "reports" ? "active" : ""} onClick={() => setActive("reports")}>Reports</button>
        <button className={active === "settings" ? "active" : ""} onClick={() => setActive("settings")}>Settings</button>
      </aside>

      {/* Main Content */}
      <main className="content">
        <h2>Admin Dashboard</h2>

        {/* Top Cards */}
        <div className="cards">
          <div className="card">Total Customers<br /><b>{data.totalCustomers}</b></div>
          <div className="card">Total Employees<br /><b>{data.totalEmployees}</b></div>
          <div className="card">Total Issues<br /><b>{data.totalIssues}</b></div>
          <div className="card">Resolved Issues<br /><b>{data.resolvedIssues}</b></div>
        </div>

        {/* ISSUE TABLE */}
        {active === "issues" || active === "overview" ? (
          <>
            <h3>Issue Management</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th><th>Customer</th><th>Priority</th><th>Status</th><th>Assigned To</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.issues.map((i) => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.customerEmail}</td>
                    <td>{i.priority || "HIGH"}</td>
                    <td>{i.status}</td>
                    <td>{i.assignedEmployee || "—"}</td>
                    <td>
                      <select
                        onChange={(e) => assignIssue(i.id, e.target.value)}
                      >
                        <option value="select">Assign</option>
                        {data.employees
                          .filter((e) => e.role === "EMPLOYEE")
                          .map((e) => (
                            <option key={e.id} value={e.username}>
                              {e.username}
                            </option>
                          ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}

        {/* EMPLOYEE TABLE */}
        {active === "employees" || active === "overview" ? (
          <>
            <h3>Employee Management</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th><th>Role</th><th>Issues Solved</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.employees.map((e) => (
                  <tr key={e.id}>
                    <td>{e.username}</td>
                    <td>{e.role}</td>
                    <td>{e.issuesSolved}</td>
                    <td>{e.status || "Active"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
      </main>
    </div>
  );
}