
import { Link } from "react-router-dom";
import crmImage from "../assets/crm-login.png";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-200 px-4">

      {/* CARD */}
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">

        {/* LEFT FORM */}
        <div className="w-full lg:w-1/2 p-10 sm:p-14 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign In to your Account
          </h2>

          <p className="text-gray-500 mb-8 text-sm">
            Enter your email & password
          </p>

          {/* EMAIL */}
          <label className="text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="mb-5 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* PASSWORD */}
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-gray-600">Password</label>
            <span className="text-xs text-indigo-600 cursor-pointer">
              Forgot password?
            </span>
          </div>

          <input
            type="password"
            placeholder="Enter Password"
            className="mb-4 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* REMEMBER */}
          <div className="flex items-center mb-6">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Remember me</span>
          </div>

          {/* BUTTON */}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
            SIGN IN
          </button>

          {/* FOOTER */}
          <p className="text-sm text-gray-600 mt-6">
            Not registered yet?
            <Link to="/signup" className="text-indigo-600 font-semibold ml-1">
              Create an account
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
            alt="CRM Illustration"
            className="relative w-72 sm:w-96 lg:w-[420px]"
          />
        </div>

      </div>
    </div>
  );
}
