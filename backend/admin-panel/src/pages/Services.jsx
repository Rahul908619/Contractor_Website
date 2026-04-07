import { useState, useEffect } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function Services() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/services");
      setServices(res.data.data || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const createService = async () => {
    if (!title || !description || !file) return alert("Please fill all details");
    setAdding(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.post("/services", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Service Added Successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      fetchServices();
    } catch (err) {
      alert("Error adding service");
    } finally {
      setAdding(false);
    }
  };

  const deleteService = async (id) => {
    if(!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`/services/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchServices();
    } catch (err) {
      alert("Error deleting service");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 flex flex-col font-sans">
      <Navbar title="Manage Services" />
      
      <div className="flex-1 p-4 sm:p-6 max-w-6xl mx-auto w-full mt-2 lg:mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Add Service Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 lg:col-span-1 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Add New Service</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-800"
                  placeholder="e.g., Residential Construction"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-gray-800 min-h-[120px] resize-y"
                  placeholder="Explain what this service provides..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Image</label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-6 text-center hover:bg-emerald-50 transition-colors relative cursor-pointer group bg-emerald-50/30">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files[0])} />
                  <svg className="mx-auto h-10 w-10 text-emerald-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <p className="mt-3 text-sm text-emerald-600 font-semibold truncate px-2">{file ? file.name : "Choose an image"}</p>
                </div>
              </div>

              <button
                onClick={createService}
                disabled={adding || !title || !description || !file}
                className="w-full py-4 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
              >
                {adding ? (
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                )}
                {adding ? "Adding..." : "Publish Service"}
              </button>
            </div>
          </div>

          {/* List Services Area */}
          <div className="lg:col-span-2">
             <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 min-h-[500px]">
                <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Current Services</h2>
                
                {loading ? (
                    <div className="flex justify-center p-16"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>
                ) : services.length === 0 ? (
                    <div className="text-center py-20 flex flex-col items-center justify-center">
                       <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4 shadow-inner">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                       </div>
                       <h3 className="text-lg font-bold text-gray-700">No services yet</h3>
                       <p className="text-gray-500 mt-1 max-w-sm">Create your first service using the form on the left to display it to your customers.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {services.map((s, idx) => (
                        <div key={s._id || idx} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group flex flex-col bg-white">
                           <div className="h-48 overflow-hidden relative bg-gray-50">
                             {s.image ? (
                               <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"/>
                             ) : (
                               <div className="w-full h-full flex items-center justify-center text-gray-400">No Image provided</div>
                             )}
                           </div>
                           <div className="p-5 flex-1 flex flex-col pt-4">
                             <h3 className="font-bold text-xl text-gray-900 mb-2">{s.title}</h3>
                             <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed flex-1">{s.description}</p>
                             
                             <button
                               onClick={() => deleteService(s._id)}
                               className="w-full py-2.5 bg-gray-50 hover:bg-red-500 text-gray-600 hover:text-white font-semibold rounded-xl transition-colors border border-gray-100 hover:border-red-500 flex items-center justify-center gap-2 group/btn"
                             >
                               <svg className="w-4 h-4 text-red-500 group-hover/btn:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                               Remove Service
                             </button>
                           </div>
                        </div>
                      ))}
                    </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
