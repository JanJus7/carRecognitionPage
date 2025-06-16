import { useState } from "react";
import { login } from "./api/auth";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch {
      setErr("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
            <input className="border p-2 rounded" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {err && <p className="text-red-500">{err}</p>}
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Log In</button>
        </form>
    </div>
  );
}
