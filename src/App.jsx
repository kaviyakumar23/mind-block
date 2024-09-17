import React, { useEffect, useState } from "react";
import { Landing } from "./components/landing/Landing";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";

function App() {
  const { isSignedIn, user } = useUser();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
