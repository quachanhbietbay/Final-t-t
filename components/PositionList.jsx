
import React, { useEffect, useState } from "react";
import { getPositions, deletePosition } from "../connect/axios.js";
import PositionForm from "./PositionForm.jsx";

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPositions = async () => {
    setLoading(true);
    try {
      const res = await getPositions();
      setPositions(res);
    } catch (error) {
      console.error("Error fetching positions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleCreatePosition = () => {
    setEditingPosition(null);
    setShowForm(true);
  };

  const handleEditPosition = (position) => {
    setEditingPosition(position);
    setShowForm(true);
  };

  const handleDeletePosition = async (positionId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vị trí này?")) {
      try {
        await deletePosition(positionId);
        fetchPositions();
      } catch (error) {
        console.error("Error deleting position:", error);
        alert("Có lỗi xảy ra khi xóa vị trí");
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPosition(null);
  };

  const handleSavePosition = () => {
    fetchPositions();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-bold text-gray-700">Vị trí công tác</div>
        <div className="flex gap-2">
          <button 
            onClick={handleCreatePosition}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-semibold transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Tạo
          </button>
          <button 
            onClick={fetchPositions} 
            disabled={loading}
            className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded shadow font-semibold transition disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M5 9a7 7 0 0114 0c0 3.866-3.134 7-7 7a7 7 0 01-7-7z" /></svg>
            Làm mới
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-purple-100 text-gray-700">
              <th className="py-3 px-4 text-center font-semibold">STT</th>
              <th className="py-3 px-4 text-center font-semibold">Mã</th>
              <th className="py-3 px-4 text-left font-semibold">Tên</th>
              <th className="py-3 px-4 text-center font-semibold">Trạng thái</th>
              <th className="py-3 px-4 text-left font-semibold">Mô tả</th>
              <th className="py-3 px-4 text-center font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Đang tải...
                  </div>
                </td>
              </tr>
            ) : positions.length > 0 ? (
              positions.map((pos, idx) => (
                <tr key={pos._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">{idx + 1}</td>
                  <td className="py-2 px-4 border-b text-center">{pos.code || "-"}</td>
                  <td className="py-2 px-4 border-b">{pos.name}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Hoạt động</span>
                  </td>
                  <td className="py-2 px-4 border-b">{pos.description || "-"}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEditPosition(pos)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-semibold transition"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeletePosition(pos._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold transition"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">Không có dữ liệu.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <PositionForm
          position={editingPosition}
          onClose={handleCloseForm}
          onSave={handleSavePosition}
          isEdit={!!editingPosition}
        />
      )}
    </div>
  );
};

export default PositionList;
