import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-indigo-700 text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-500">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem label="Overview" />
          <NavItem label="Issue Management" />
          <NavItem label="Employees" />
          <NavItem label="Customers" />
          <NavItem label="Reports" />
          <NavItem label="Settings" />
        </nav>

        <div className="p-4 border-t border-indigo-500">
          <button className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <span className="text-gray-600">Welcome, Admin 👋</span>
        </div>

        {/* OVERVIEW STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Stat title="Total Customers" value="1,250" />
          <Stat title="Total Employees" value="45" />
          <Stat title="Total Issues" value="320" />
          <Stat title="Resolved Issues" value="280" />
        </div>

        {/* ISSUE MANAGEMENT */}
        <Section title="Issue Management">
          <Table
            headers={["Issue ID", "Customer", "Priority", "Status", "Assigned To"]}
            rows={[
              ["#101", "John", "High", "Open", "—"],
              ["#102", "Sara", "Medium", "In Progress", "Alex"],
              ["#103", "Mike", "Low", "Resolved", "Emma"],
            ]}
          />
        </Section>

        {/* EMPLOYEE MANAGEMENT */}
        <Section title="Employee Management">
          <Table
            headers={["Employee", "Role", "Issues Solved", "Status"]}
            rows={[
              ["Alex", "Support", "120", "Active"],
              ["Emma", "Support", "95", "Active"],
              ["Ryan", "Tech", "60", "Inactive"],
            ]}
          />
        </Section>

        {/* CUSTOMER MANAGEMENT */}
        <Section title="Customer Management">
          <Table
            headers={["Customer", "Email", "Issues Raised", "Status"]}
            rows={[
              ["John", "john@gmail.com", "5", "Active"],
              ["Sara", "sara@gmail.com", "3", "Active"],
              ["Mike", "mike@gmail.com", "1", "Inactive"],
            ]}
          />
        </Section>

        {/* REPORTS */}
        <Section title="Reports & Analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReportCard title="Daily Issues" value="24" />
            <ReportCard title="Monthly Issues" value="420" />
            <ReportCard title="Top Employee" value="Alex" />
          </div>
        </Section>

        {/* SETTINGS */}
        <Section title="System Settings">
          <div className="flex flex-wrap gap-4">
            <button className="btn">Change Roles</button>
            <button className="btn">Reset Passwords</button>
            <button className="btn">Manage Permissions</button>
          </div>
        </Section>

      </main>
    </div>
  );
}

/* COMPONENTS */

function NavItem({ label }) {
  return (
    <div className="px-4 py-2 rounded-lg hover:bg-indigo-600 cursor-pointer">
      {label}
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-2 text-left text-sm font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReportCard({ title, value }) {
  return (
    <div className="bg-indigo-600 text-white p-6 rounded-xl">
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
