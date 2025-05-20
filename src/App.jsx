import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Room from "./pages/Room";
import Chat from "./pages/Chat";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<Auth setUser={setUser} />} />
      <Route
        path="/room"
        element={
          user ? (
            <Room user={user} setRoom={setRoom} setUser={setUser} />
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route
        path="/chat"
        element={
          user && room ? (
            <Chat user={user} room={room} setRoom={setRoom} />
          ) : (
            <Navigate to="/room" />
          )
        }
      />
    </Routes>
  );
}
