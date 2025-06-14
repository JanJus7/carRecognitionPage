import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function PhotoForm({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFile(null);
    onUpload();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="file-input file:border file:border-blue-500 file:rounded file:px-2 file:py-1"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faArrowUpFromBracket} />
        <span>Upload</span>
      </button>
    </form>
  );
}
