import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-indigo-700 text-white flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-500">
          CRM Dashboard
        </div>

        <nav className="flex-1 p-4 space-y-3">
          <NavItem to="/dashboard" label="Dashboard" active />
          <NavItem to="/customers" label="Customers" />
          <NavItem to="/leads" label="Leads" />
          <NavItem to="/reports" label="Reports" />
          <NavItem to="/settings" label="Settings" />
        </nav>

        <div className="p-4 border-t border-indigo-500">
          <button className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 hidden sm:block">
              Hello, User 👋
            </span>
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center">
              U
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value="1,245" />
          <StatCard title="New Leads" value="320" />
          <StatCard title="Sales" value="₹58K" />
          <StatCard title="Growth" value="+18%" />
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* RECENT ACTIVITY */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">
              Recent Activity
            </h2>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>✔ New customer registered</li>
              <li>✔ Lead converted to customer</li>
              <li>✔ Monthly sales report generated</li>
              <li>✔ Password updated successfully</li>
            </ul>
          </div>

          {/* PROFILE */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-4">
              Profile
            </h2>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full text-white flex items-center justify-center text-2xl font-bold">
                U
              </div>

              <h3 className="mt-3 font-semibold">
                CRM User
              </h3>
              <p className="text-sm text-gray-500">
                admin@crm.com
              </p>

              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                View Profile
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

/* NAV ITEM */
function NavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`block px-4 py-2 rounded-lg ${
        active
          ? "bg-indigo-600"
          : "hover:bg-indigo-600"
      }`}
    >
      {label}
    </Link>
  );
}

/* STAT CARD */
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-2">
        {value}
      </h2>
    </div>
  );
}
