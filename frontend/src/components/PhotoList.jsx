import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function PhotoList({ refreshTrigger }) {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/photos");
      setPhotos(res.data);
    } catch (err) {
      console.error("Błąd pobierania zdjęć:", err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [refreshTrigger]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex gap-2 w-max">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={`http://localhost:5000/uploads/${photo.filename}`}
              alt={photo.filename}
              className="w-16 h-16 object-cover rounded cursor-pointer border hover:opacity-80"
              onClick={() => setSelectedPhoto(photo.filename)}
            />
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-red-500"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <img
            src={`http://localhost:5000/uploads/${selectedPhoto}`}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
