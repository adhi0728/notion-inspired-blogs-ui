
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Book, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Posts", path: "/admin/posts", icon: Book },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-card border-r fixed left-0 top-0 z-30 flex flex-col transition-width duration-300", 
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center h-16 border-b px-4">
        {!isCollapsed && <h2 className="font-bold text-xl flex-1">Admin</h2>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-muted transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
                end={item.path === "/admin"}
              >
                <item.icon size={20} className={cn("flex-shrink-0", isCollapsed ? "mx-auto" : "mr-3")} />
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary"></div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
            </div>
          </div>
        )}
        {isCollapsed && <div className="w-8 h-8 rounded-full bg-primary mx-auto"></div>}
      </div>
    </aside>
  );
};
