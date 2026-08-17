import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";

import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerRequirements from "./pages/CustomerRequirements";
import BookMilk from "./pages/BookMilk";
import CustomerHistory from "./pages/CustomerHistory";
import CustomerProfile from "./pages/CustomerProfile";
import EditProfile from "./pages/EditProfile";
import CustomerSupport from "./pages/CustomerSupport";

import TeamLogin from "./pages/TeamLogin";
import Team from "./pages/Team";

export default function App() {
  return (
    <Routes>
      {/* ================= HOME ================= */}

      <Route
        path="/"
        element={<Home />}
      />

      {/* ================= CUSTOMER ================= */}

      <Route
        path="/customer/login"
        element={<CustomerLogin />}
      />

      <Route
        path="/customer/register"
        element={<CustomerRegister />}
      />

      <Route
        path="/customer/dashboard"
        element={<CustomerDashboard />}
      />

      <Route
        path="/customer/requirements"
        element={<CustomerRequirements />}
      />

      <Route
        path="/customer/book-milk"
        element={<BookMilk />}
      />

      <Route
        path="/customer/history"
        element={<CustomerHistory />}
      />

      <Route
        path="/customer/profile"
        element={<CustomerProfile />}
      />

      <Route
        path="/customer/profile/edit"
        element={<EditProfile />}
      />

      <Route
        path="/customer/support"
        element={<CustomerSupport />}
      />

      {/* ================= FPO TEAM ================= */}

      <Route
        path="/team/login"
        element={<TeamLogin />}
      />

      <Route
        path="/team/dashboard"
        element={<Team />}
      />

      <Route
        path="/team"
        element={
          <Navigate
            to="/team/login"
            replace
          />
        }
      />

      {/* ================= FALLBACK ================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}