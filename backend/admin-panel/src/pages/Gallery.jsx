import { useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function Gallery() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file || !title) return alert("Please fill all details");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      await axios.post("/gallery/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Uploaded successfully!");
      setFile(null);
      setTitle("");
    } catch (err) {
      alert("Error uploading media");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar title="Manage Gallery" />
      <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full mt-4 sm:mt-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Upload Media</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800 font-medium"
                placeholder="E.g., Site construction progress"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Media File</label>
              <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center hover:bg-blue-50 transition-colors relative cursor-pointer group bg-blue-50/30">
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files[0])} />
                <svg className="mx-auto h-12 w-12 text-blue-400 group-hover:text-blue-600 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div className="mt-4 text-sm leading-6 text-gray-600 flex justify-center items-center">
                  <span className="font-semibold text-blue-600 hover:text-blue-500 truncate max-w-[200px]">
                    {file ? file.name : "Select a file"}
                  </span>
                </div>
                {!file && <p className="text-xs leading-5 text-gray-500 mt-2">PNG, JPG, MP4 support</p>}
              </div>
            </div>

            <button
              onClick={upload}
              disabled={loading || !file || !title}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : "Upload Media"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
