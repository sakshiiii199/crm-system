import { Link } from "react-router-dom";
import crmImage from "../assets/crm-signup.png";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-200 px-4">

      {/* CARD */}
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">

        {/* LEFT FORM */}
        <div className="w-full lg:w-1/2 p-10 sm:p-14 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Create your Account
          </h2>

          <p className="text-gray-500 mb-8 text-sm">
            Fill in the details to get started
          </p>

          {/* USERNAME */}
          <label className="text-sm text-gray-600 mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            className="mb-5 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* EMAIL */}
          <label className="text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="mb-5 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* PASSWORD */}
          <label className="text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="Create Password"
            className="mb-5 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* CONFIRM PASSWORD */}
          <label className="text-sm text-gray-600 mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="mb-6 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* BUTTON */}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
            SIGN UP
          </button>

          {/* FOOTER */}
          <p className="text-sm text-gray-600 mt-6">
            Already have an account?
            <Link to="/" className="text-indigo-600 font-semibold ml-1">
              Sign in
            </Link>
          </p>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative w-full lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center py-16 lg:py-0">

          {/* BIG CURVE */}
          <div className="absolute right-[-140px] w-[500px] h-[500px] bg-indigo-500 rounded-full opacity-40"></div>

          {/* IMAGE */}
          <img
            src={crmImage}
            alt="Signup Illustration"
            className="relative w-72 sm:w-96 lg:w-[420px]"
          />
        </div>

      </div>
    </div>
  );
}
