import React from "react";
import { Landing } from "./components/landing/Landing";
import { useUser } from "@clerk/clerk-react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";

function ProtectedRoute({ children }) {
  const { isSignedIn } = useUser();

  return isSignedIn ? children : <Navigate to="/" />;
}

function App() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {isSignedIn && navigate("/dashboard")}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
