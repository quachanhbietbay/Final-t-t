import React, { useState, useEffect } from 'react';
import { createTeacher, updateTeacher, getPositions } from '../connect/axios.js';

const TeacherForm = ({ teacher, onClose, onSave, isEdit = false }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    teacherPositionsId: [],
    degrees: [{
      type: '',
      school: '',
      major: '',
      year: '',
      isGraduated: false
    }]
  });
  const [availablePositions, setAvailablePositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadPositions();
    if (isEdit && teacher) {
      setFormData({
        code: teacher.code || '',
        name: teacher.name || '',
        email: teacher.email || '',
        phoneNumber: teacher.phoneNumber || '',
        address: teacher.address || '',
        teacherPositionsId: teacher.teacherPositionsId || [],
        degrees: teacher.degrees && teacher.degrees.length > 0 ? teacher.degrees : [{
          type: '',
          school: '',
          major: '',
          year: '',
          isGraduated: false
        }]
      });
    }
  }, [teacher, isEdit]);

  const loadPositions = async () => {
    try {
      const positions = await getPositions();
      setAvailablePositions(positions);
    } catch (error) {
      console.error('Error loading positions:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.code.trim()) {
      newErrors.code = 'Mã giáo viên là bắt buộc';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tên giáo viên là bắt buộc';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePositionChange = (positionId, isChecked) => {
    setFormData(prev => ({
      ...prev,
      teacherPositionsId: isChecked 
        ? [...prev.teacherPositionsId, positionId]
        : prev.teacherPositionsId.filter(id => id !== positionId)
    }));
  };

  const handleDegreeChange = (index, field, value) => {
    const newDegrees = [...formData.degrees];
    newDegrees[index] = {
      ...newDegrees[index],
      [field]: field === 'isGraduated' ? value : value
    };
    setFormData(prev => ({
      ...prev,
      degrees: newDegrees
    }));
  };

  const addDegree = () => {
    setFormData(prev => ({
      ...prev,
      degrees: [...prev.degrees, {
        type: '',
        school: '',
        major: '',
        year: '',
        isGraduated: false
      }]
    }));
  };

  const removeDegree = (index) => {
    if (formData.degrees.length > 1) {
      setFormData(prev => ({
        ...prev,
        degrees: prev.degrees.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Filter out empty degrees
      const filteredData = {
        ...formData,
        degrees: formData.degrees.filter(degree => 
          degree.type.trim() || degree.school.trim() || degree.major.trim()
        )
      };

      let result;
      if (isEdit) {
        result = await updateTeacher(teacher._id, filteredData);
      } else {
        result = await createTeacher(filteredData);
      }
      
      onSave(result);
      onClose();
    } catch (error) {
      console.error('Error saving teacher:', error);
      if (error.response?.data?.message) {
        if (error.response.data.message.includes('code')) {
          setErrors({ code: 'Mã giáo viên đã tồn tại' });
        } else if (error.response.data.message.includes('email')) {
          setErrors({ email: 'Email đã tồn tại' });
        } else {
          setErrors({ general: error.response.data.message });
        }
      } else {
        setErrors({ general: 'Có lỗi xảy ra, vui lòng thử lại' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {isEdit ? 'Chỉnh sửa giáo viên' : 'Thêm giáo viên mới'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Mã giáo viên *
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.code ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập mã giáo viên"
                disabled={loading}
              />
              {errors.code && (
                <p className="mt-1 text-sm text-red-600">{errors.code}</p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Tên giáo viên *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập tên giáo viên"
                disabled={loading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập email"
                disabled={loading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số điện thoại"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập địa chỉ"
              disabled={loading}
            />
          </div>

          {/* Positions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vị trí công tác
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {availablePositions.map(position => (
                <label key={position._id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.teacherPositionsId.includes(position._id)}
                    onChange={(e) => handlePositionChange(position._id, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <span className="text-sm text-gray-700">{position.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Degrees */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Trình độ học vấn
              </label>
              <button
                type="button"
                onClick={addDegree}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                disabled={loading}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Thêm bằng cấp
              </button>
            </div>
            
            {formData.degrees.map((degree, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Bằng cấp {index + 1}</h4>
                  {formData.degrees.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDegree(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                      disabled={loading}
                    >
                      Xóa
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Loại bằng</label>
                    <select
                      value={degree.type}
                      onChange={(e) => handleDegreeChange(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    >
                      <option value="">Chọn loại bằng</option>
                      <option value="Cử nhân">Cử nhân</option>
                      <option value="Thạc sĩ">Thạc sĩ</option>
                      <option value="Tiến sĩ">Tiến sĩ</option>
                      <option value="Cao đẳng">Cao đẳng</option>
                      <option value="Trung cấp">Trung cấp</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Trường</label>
                    <input
                      type="text"
                      value={degree.school}
                      onChange={(e) => handleDegreeChange(index, 'school', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tên trường"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Chuyên ngành</label>
                    <input
                      type="text"
                      value={degree.major}
                      onChange={(e) => handleDegreeChange(index, 'major', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Chuyên ngành"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Năm tốt nghiệp</label>
                    <input
                      type="number"
                      value={degree.year}
                      onChange={(e) => handleDegreeChange(index, 'year', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Năm"
                      min="1950"
                      max="2030"
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={degree.isGraduated}
                      onChange={(e) => handleDegreeChange(index, 'isGraduated', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-700">Đã tốt nghiệp</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Đang lưu...
                </>
              ) : (
                isEdit ? 'Cập nhật' : 'Thêm mới'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherForm;