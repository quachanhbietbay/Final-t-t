import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TeacherList from "./components/TeacherList.jsx";
import PositionList from "./components/PositionList.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/positions" element={<PositionList />} />
            <Route path="*" element={<Navigate to="/teachers" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
