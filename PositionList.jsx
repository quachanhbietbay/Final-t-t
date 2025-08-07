
import React, { useEffect, useState } from "react";
import ins from "../connect/axios.js";

const PositionList = () => {
  const [positions, setPositions] = useState([]);

  const fetchPositions = async () => {
    const res = await ins.get("/teacher-positions");
    setPositions(res.data);
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-bold text-gray-700">Vị trí công tác</div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-semibold transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Tạo
          </button>
          <button onClick={fetchPositions} className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded shadow font-semibold transition">
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
            </tr>
          </thead>
          <tbody>
            {positions.length > 0 ? (
              positions.map((pos, idx) => (
                <tr key={pos._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">{idx + 1}</td>
                  <td className="py-2 px-4 border-b text-center">{pos.code || "-"}</td>
                  <td className="py-2 px-4 border-b">{pos.name}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Hoạt động</span>
                  </td>
                  <td className="py-2 px-4 border-b">{pos.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">Không có dữ liệu.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionList;
