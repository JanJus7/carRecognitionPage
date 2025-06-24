import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { uploadPhoto } from "../api/photos";

export default function PhotoForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = await uploadPhoto(file);
      setPrediction(data.prediction);
      setFile(null);
      onUpload();
    } catch (err) {
      console.error("Upload error:", err);
      setPrediction(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
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

      {prediction && (
        <div className="bg-gray-100 border mt-4 p-3 rounded shadow text-center w-full">
          <p className="font-semibold text-lg">This is:</p>
          <p className="text-blue-600 text-xl mt-1">
            {prediction.label}
          </p>
          <p className="text-gray-600 text-sm">
            Probability: {(prediction.confidence * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </form>
  );
}
