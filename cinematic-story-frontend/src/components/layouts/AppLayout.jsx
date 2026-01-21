import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col">

      {/* HEADER */}
      <Header
        onToggleSidebar={() => setCollapsed(prev => !prev)}
        onMobileMenu={() => setMobileOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">

        {/* MOBILE SIDEBAR */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative w-64">
              <Sidebar
                collapsed={false}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
          </div>
        )}

        {/* DESKTOP SIDEBAR */}
        <aside
          className={`hidden md:block transition-all duration-300
                     ${collapsed ? "w-16" : "w-64"}`}
        >
          <Sidebar
  collapsed={collapsed}
  onToggle={() => setCollapsed(prev => !prev)}
/>

        </aside>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
