import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function Enquiries() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/enquiry", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res => {
      setData(res.data.data || res.data || []);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar title="Enquiries" />
      <div className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full mt-4 sm:mt-6">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-tight">Client Enquiries</h2>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                </div>
                <p className="text-gray-500 font-medium text-lg">No enquiries found.</p>
              </div>
            ) : (
              data.map((item, index) => (
                <div key={item._id || index} className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-500 to-indigo-500 transform origin-top scale-y-50 group-hover:scale-y-100 transition-transform duration-300"></div>
                  
                  <div className="flex justify-between items-start mb-4 pl-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pl-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      {item.phone}
                    </div>
                  </div>

                  <div className="flex gap-3 mb-5 pl-2">
                    <a href={`https://wa.me/${item.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#059669] font-semibold rounded-xl transition-colors border border-[#10B981]/20 shadow-sm hover:shadow active:-translate-y-px">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 21.144A9.957 9.957 0 016 19.34L2 22l2.748-3.83A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM12 4C7.589 4 4 7.589 4 12c0 1.77.575 3.411 1.554 4.757l-1.22 1.7L6.11 17.29a7.962 7.962 0 005.89 2.71c4.411 0 8-3.589 8-8s-3.589-8-8-8zm4.412 10.748c-.22.11-.643.344-.947.464-.326.116-.62.158-.871.189-.481.05-1.127-.197-1.802-.601-1.114-.666-2.072-1.637-2.73-2.76-.328-.561-.503-1.077-.492-1.52.01-.444.137-.768.326-1.037.155-.221.365-.398.544-.398.17 0 .341.01.511.02.2.012.392.03.545.419.165.419.467 1.155.513 1.25.045.093.076.223.016.364-.061.14-.092.233-.182.351-.092.118-.198.249-.275.34-.145.174-.316.356-.134.664.183.308.825 1.34 1.764 2.167.876.772 1.848 1.053 2.14 1.184.22.1.488.08.68-.063.18-.135.433-.532.553-.715.119-.184.238-.152.438-.073z"></path></svg>
                      WhatsApp
                    </a>
                    <a href={`tel:${item.phone}`} className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-xl transition-colors border border-blue-200 shadow-sm hover:shadow active:-translate-y-px">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      Call
                    </a>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-2xl text-gray-700 text-sm font-medium leading-relaxed border border-gray-100 ml-2 shadow-inner">
                    "{item.message}"
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
