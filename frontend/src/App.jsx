import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/protectedRoutes";
import Register from "./pages/Register";
import AdminUsers from "./pages/AdminUsers";
import AdminProjects from "./pages/AdminProjects";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import AdminClients from "./pages/AdminClients";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Reports />
              </ProtectedRoute>
            }
          />

<Route path="/settings" element={
  <ProtectedRoute allowedRoles={['admin', 'client', 'user']}>
    <Settings />
  </ProtectedRoute>
} />

          <Route
            path="/admin/clients"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminClients />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
