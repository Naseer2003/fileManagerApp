// src/pages/CreatePage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../config/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const CreatePage: React.FC = () => {
  const [folderName, setFolderName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const uploadAll = async () => {
    if (!folderName.trim()) return toast.error("Folder name required");
    setUploading(true);

    try {
      // 1. Upload each local file to Cloudinary via your route
      for (const file of files) {
        const form = new FormData();
        form.append("file", file); // MUST match multer field name
        form.append("folder", folderName);
        await api.post("/files/upload", form);
      }

      toast.success("Folder & files uploaded!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg shadow space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Create Folder & Upload Files
        </h1>

        {/* Folder name */}
        <input
          type="text"
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-200"
        />

        {/* Drag-n-drop */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400">
            Drop files here or{" "}
            <label className="text-blue-600 underline cursor-pointer">
              browse
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) =>
                  setFiles((prev) => [...prev, ...Array.from(e.target.files!)])
                }
              />
            </label>
          </p>
        </div>

        {/* file list */}
        {files.length > 0 && (
          <ul className="text-sm text-gray-600 dark:text-gray-300">
            {files.map((f, i) => (
              <li key={i} className="flex justify-between">
                {f.name}
                <button onClick={() => removeFile(i)} className="text-red-500">
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={uploadAll}
            disabled={uploading}
            className="flex-1 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "Create & Upload"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreatePage;