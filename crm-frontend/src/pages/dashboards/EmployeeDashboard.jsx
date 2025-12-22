export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-indigo-700 text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-500">
          Employee Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem label="Assigned Issues" />
          <NavItem label="Work Summary" />
          <NavItem label="Notifications" />
          <NavItem label="Profile" />
        </nav>

        <div className="p-4 border-t border-indigo-500">
          <button className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Employee Dashboard</h1>
          <span className="text-gray-600">Hello, Alex 👋</span>
        </div>

        {/* WORK SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Stat title="Assigned Issues" value="12" />
          <Stat title="Completed" value="7" />
          <Stat title="Pending" value="5" />
        </div>

        {/* ASSIGNED ISSUES */}
        <Section title="Assigned Issues">
          <Table
            headers={["Issue ID", "Customer", "Priority", "Deadline", "Status"]}
            rows={[
              ["#201", "John", "High", "20 Dec", "Open"],
              ["#202", "Sara", "Medium", "22 Dec", "In Progress"],
              ["#203", "Mike", "Low", "25 Dec", "Resolved"],
            ]}
          />
        </Section>

        {/* NOTIFICATIONS */}
        <Section title="Notifications">
          <ul className="space-y-2 text-sm text-gray-600">
            <li>🔔 Issue #201 assigned</li>
            <li>🔔 Issue #199 marked resolved</li>
            <li>🔔 Deadline approaching</li>
          </ul>
        </Section>

        {/* PROFILE */}
        <Section title="Profile">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
              A
            </div>
            <div>
              <p className="font-semibold">Alex Johnson</p>
              <p className="text-sm text-gray-500">alex@crm.com</p>
            </div>
          </div>
          <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg">
            Change Password
          </button>
        </Section>

      </main>
    </div>
  );
}

/* REUSED COMPONENTS */

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
