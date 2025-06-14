import { useState } from "react";
import Navbar from "./components/Navbar";
import PhotoForm from "./components/PhotoForm";
import PhotoList from "./components/PhotoList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center min-h-screen px-4">
        <div className="flex flex-col items-center gap-6 w-full max-w-xl mt-16">
          <div className="bg-white border border-blue-500 rounded-lg shadow-md p-6 w-full max-w-xl">
            <PhotoForm onUpload={triggerRefresh} />
          </div>

          <div className="bg-white border border-blue-500 rounded-lg shadow-md p-6 w-full max-w-xl">
            <PhotoList refreshTrigger={refresh} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
