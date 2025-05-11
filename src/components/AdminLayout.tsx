
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-16 md:ml-64">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
