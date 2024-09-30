import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import {
  Admin,
  Dashboard,
  Transaction,
  Note,
  Inventory,
  Report,
  Setting,
  Chat,
  Employe,
} from "./components";

import { Login, Register } from "./AuthForms";
import { Provider } from "react-redux";
import store from "./store/store.js";
import ProtectedRoute from "./PrivateRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public routes like login */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected User routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="admin" element={<Admin />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="note" element={<Note />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="report" element={<Report />} />
        <Route path="setting" element={<Setting />} />
        <Route path="chat" element={<Chat />} />
        <Route path="employe" element={<Employe />} />
      </Route>

      {/* Admin-only routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
