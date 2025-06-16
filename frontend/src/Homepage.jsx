import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Discover cars with CarX</h1>
      <p className="text-lg mb-6">Upload photo and get a result!</p>
      <div className="flex gap-4">
        <Link to="/login" className="bg-white text-blue-600 font-bold px-6 py-2 rounded hover:bg-gray-200 transition">Log In</Link>
        <Link to="/register" className="bg-blue-500 text-white font-bold px-6 py-2 rounded hover:bg-blue-600 transition">Sign Up</Link>
      </div>
    </div>
  );
}
