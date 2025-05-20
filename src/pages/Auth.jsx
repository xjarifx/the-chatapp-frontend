import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Auth({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (username.trim() && password.trim()) {
      try {
        const res = await fetch(`${API_BASE_URL}/users/auth/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username.trim(),
            password: password.trim(),
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          navigate("/room");
        } else {
          alert(data.message || "Authentication failed.");
        }
      } catch (err) {
        alert("Server error: " + err.message);
      }
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="bg-base-200 flex h-screen items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            Enter Username & Password
          </h2>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered mt-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="card-actions mt-4 flex-col">
            <button className="btn btn-primary w-full" onClick={handleAuth}>
              Enter Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
