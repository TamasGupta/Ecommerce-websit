// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  // Adjust logic based on your actual "isAdmin" flag
  const isAdmin = user?.role === "admin";

//   if (!user || !isAdmin) {
//     return <Navigate to="/login" replace />;
//   }

  return children;
};

export default ProtectedRoute;
