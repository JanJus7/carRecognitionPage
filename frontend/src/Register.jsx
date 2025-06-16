import { useState } from "react";
import { register } from "./api/auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      setMsg("Registered successfully, go back to login.");
    } catch {
      setMsg("Error registering.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
            <input className="border p-2 rounded" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {msg && <p>{msg}</p>}
            <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Sign Up</button>
        </form>
    </div>
  );
}
