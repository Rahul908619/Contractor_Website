import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white pb-32 pt-10 px-6 shadow-md rounded-b-[40px]">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Admin Dashboard</h1>
            <p className="text-blue-100 opacity-80">Manage your business at a glance</p>
          </div>
          <button onClick={() => { localStorage.removeItem("token"); window.location.href="/" }} className="bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-xl backdrop-blur-md transition-colors text-sm font-semibold shadow-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto -mt-20 px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          <Link to="/gallery" className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all transform hover:-translate-y-2 border border-gray-100 group flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Gallery</h2>
            <p className="text-gray-500 text-sm leading-relaxed">Upload and manage site images and videos.</p>
          </Link>

          <Link to="/services" className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all transform hover:-translate-y-2 border border-gray-100 group flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Services</h2>
            <p className="text-gray-500 text-sm leading-relaxed">Update the contractor services you offer.</p>
          </Link>

          <Link to="/enquiries" className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all transform hover:-translate-y-2 border border-gray-100 group flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Enquiries</h2>
            <p className="text-gray-500 text-sm leading-relaxed">View messages and requests from clients.</p>
          </Link>

          <Link to="/price" className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all transform hover:-translate-y-2 border border-gray-100 group flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-white transition-all shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Manage Prices</h2>
            <p className="text-gray-500 text-sm leading-relaxed">Update pricing PDF for your users.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
