import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotFound from "./pages/NotFound";
import DirectorDashboard from "./pages/dashboard/DirectorDashboard";
import DepartmentHeadDashboard from "./pages/dashboard/DepartmentHeadDashboard";
import TeamLeadDashboard from "./pages/dashboard/TeamLeadDashboard";
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import HrDashboard from "./pages/dashboard/HrDashboard";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gioi-thieu" element={<About />} />
        </Route>
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/quen-mat-khau" element={<ForgotPassword />} />
        <Route path="/dashboard/director" element={<DirectorDashboard />} />
        <Route path="/dashboard/department-head" element={<DepartmentHeadDashboard />} />
        <Route path="/dashboard/team-lead" element={<TeamLeadDashboard />} />
        <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
        <Route path="/dashboard/hr" element={<HrDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
