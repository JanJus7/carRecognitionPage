import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getPhotos } from "../api/photos";

export default function PhotoList({ refreshTrigger }) {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fetchPhotos = async () => {
    try {
      const data = await getPhotos();
      setPhotos(data);
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
              src={`/uploads/${photo.filename}`}
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
            src={`/uploads/${selectedPhoto}`}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
