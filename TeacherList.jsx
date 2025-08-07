import React, { useEffect, useState } from "react";
import getTeachers from "../connect/axios.js";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchTeachers = async () => {
    try {
      const res = await getTeachers(page, pageSize);
      const cleaned = res.data.map((t) => ({
        ...t,
        isActive: typeof t.isActive === "boolean" ? t.isActive : true,
      }));
      setTeachers(cleaned);
      setTotalPages(res.totalPages);
      setTotalItems(res.total || res.totalItems || 0);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách giáo viên:", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [page, pageSize]);

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách giáo viên</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
        >
          + Thêm giáo viên
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white w-full">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Mã</th>
              <th className="py-3 px-4 text-left font-semibold">Giáo viên</th>
              <th className="py-3 px-4 text-left font-semibold">Trình độ</th>
              <th className="py-3 px-4 text-left font-semibold">Bộ môn</th>
              <th className="py-3 px-4 text-left font-semibold">TT Công tác</th>
              <th className="py-3 px-4 text-left font-semibold">Địa chỉ</th>
              <th className="py-3 px-4 text-center font-semibold">Trạng thái</th>
              <th className="py-3 px-4 text-center font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((t, i) => {
                const firstDegree = t.degrees?.[0];
                const degreeStr = firstDegree
                  ? `Bậc: ${firstDegree.type}${firstDegree.major ? `\nChuyên ngành: ${firstDegree.major}` : ""}`
                  : "Chưa cập nhật";
                const positionStr = t.positions?.map((p) => p.name).join(", ") || "N/A";
                const positionTypeStr = t.positions?.map((p) => p.type).join(", ") || "N/A";
                return (
                  <tr key={t.code || i} className="hover:bg-blue-50 transition">
                    <td className="py-2 px-4 border-b text-center">{t.code || "Không có mã"}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.avatar || "https://via.placeholder.com/40"}
                          alt="avatar"
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{t.name || "Chưa nhập tên"}</div>
                          <div className="text-gray-500 text-xs">{t.email || "Không có email"}</div>
                          <div className="text-gray-500 text-xs">{t.phoneNumber || "Không có số điện thoại"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b whitespace-pre-wrap">{degreeStr}</td>
                    <td className="py-2 px-4 border-b">{positionStr}</td>
                    <td className="py-2 px-4 border-b">{positionTypeStr}</td>
                    <td className="py-2 px-4 border-b">{t.address || "Chưa cập nhật"}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {t.isActive ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          Đang công tác
                        </span>
                      ) : (
                        <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          Tạm nghỉ
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-1 rounded font-semibold shadow transition flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  Không có giáo viên nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end items-center mt-4 gap-6 min-h-[48px]">
        <span className="text-blue-700 font-semibold">Tổng: {totalItems}</span>
        <div className="flex items-center gap-2">
         
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            {'<'}
          </button>
        
          {totalPages > 0 ? (
            Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border rounded mx-0.5 ${p === page ? 'bg-blue-100 border-blue-500 text-blue-700 font-bold' : 'bg-white border-gray-300 text-gray-700'}`}
              >
                {p}
              </button>
            ))
          ) : (
            <button className="px-3 py-1 border rounded mx-0.5 bg-white border-gray-300 text-gray-400" disabled>1</button>
          )}
         
          <button
            disabled={page >= totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            {'>'}
          </button>
        </div>
        
        <select
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {[10, 20, 50, 100].map(size => (
            <option key={size} value={size}>{size} / trang</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TeacherList;
