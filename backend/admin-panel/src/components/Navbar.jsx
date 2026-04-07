import { Link } from "react-router-dom";

export default function Navbar({ title }) {
  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="w-10 h-10 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
        <div>
          <button onClick={() => { localStorage.removeItem("token"); window.location.href="/" }} className="text-red-500 hover:text-red-600 text-sm font-semibold transition-colors">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
