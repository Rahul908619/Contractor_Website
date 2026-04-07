import { useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function Price() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadPDF = async () => {
    if (!file) return alert("Please select a PDF file");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/prices/upload-pdf", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Prices Updated from PDF Successfully!");
      setFile(null);
    } catch (err) {
      alert("Error uploading PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar title="Manage Prices" />
      <div className="flex-1 p-4 sm:p-6 max-w-3xl mx-auto w-full mt-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gradient-to-tr from-yellow-100 to-amber-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Upload Price PDF</h2>
          <p className="text-gray-500 mb-8 max-w-sm">Upload the latest pricing PDF document here. This will automatically update your site prices.</p>
          
          <div className="w-full max-w-md">
            <div className="border-2 border-dashed border-yellow-200 rounded-2xl p-8 text-center hover:bg-yellow-50 transition-colors relative cursor-pointer group bg-yellow-50/30 mb-6">
              <input type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files[0])} />
              <svg className="mx-auto h-12 w-12 text-yellow-400 group-hover:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="mt-4 text-sm font-semibold text-yellow-600 truncate px-4">{file ? file.name : "Select PDF Document"}</p>
              {!file && <p className="text-xs text-gray-400 mt-2">Only .pdf format supported</p>}
            </div>

            <button
              onClick={uploadPDF}
              disabled={loading || !file}
              className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-white font-bold rounded-xl shadow-lg hover:shadow-yellow-500/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 flex justify-center items-center gap-2 text-lg"
            >
              {loading ? (
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
              ) : "Upload & Sync Prices"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
