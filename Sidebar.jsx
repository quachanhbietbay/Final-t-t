import React from "react";
import { NavLink } from "react-router-dom";

const menu = [
  { label: "Thống kê", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17a1 1 0 001 1h1a1 1 0 001-1V7a1 1 0 00-1-1h-1a1 1 0 00-1 1v10z" /></svg>
  ), to: "#" },
  { label: "Lớp học", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4 0h4" /></svg>
  ), to: "#" },
  { label: "Học sinh", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ), to: "#" },
  { label: "Giáo viên", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 13.477V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-5.523a12.083 12.083 0 012.84-2.899L12 14z" /></svg>
  ), to: "/teachers" },
  { label: "Dữ liệu", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4 0h4" /></svg>
  ), to: "#" },
  { label: "Vị trí công tác", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243m0 0A8 8 0 1112 20a8 8 0 01-5.657-2.343z" /></svg>
  ), to: "/positions" },
];

const Sidebar = () => (
  <aside className="h-screen w-60 bg-white border-r shadow-sm flex flex-col py-6 px-3">
    <div className="mb-8 text-xl font-bold text-gray-700 tracking-wide px-2">Quản lý</div>
    <nav className="flex-1">
      <ul className="space-y-2">
        {menu.map((item, idx) => (
          <li key={item.label}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center w-full gap-3 px-4 py-2 rounded-lg transition font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 ${isActive ? 'bg-blue-100 text-blue-700 font-bold' : ''}`
              }
              end
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;