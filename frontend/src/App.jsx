import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/signUp";
import Home from "./components/home";
import Login from "./pages/auth/login";
import Sidebar from "./components/sideBar";
import RightPanel from "./components/rightPanel";
import Notification from "./components/notification";
import Profile from "./components/Profie.jsx";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./utils/loadSpinner.jsx";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/checkAuth",{
          method: "GET",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Sidebar />}
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <Notification /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
}

export default App;
