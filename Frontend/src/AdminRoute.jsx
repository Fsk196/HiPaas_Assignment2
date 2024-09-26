import ProtectedRoute from "./PrivateRoute";

const AdminRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>;
};

export default AdminRoute;
