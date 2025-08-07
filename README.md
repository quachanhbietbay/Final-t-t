# Hệ thống Quản lý Giáo viên

Ứng dụng web quản lý giáo viên và vị trí công tác được xây dựng với React và Node.js.

## Tính năng

### 🧑‍🏫 Quản lý Giáo viên
- ✅ Xem danh sách giáo viên với phân trang
- ✅ Thêm giáo viên mới
- ✅ Chỉnh sửa thông tin giáo viên
- ✅ Xóa giáo viên
- ✅ Quản lý trình độ học vấn
- ✅ Gán vị trí công tác cho giáo viên

### 📍 Quản lý Vị trí Công tác
- ✅ Xem danh sách vị trí công tác
- ✅ Thêm vị trí công tác mới
- ✅ Chỉnh sửa vị trí công tác
- ✅ Xóa vị trí công tác

### 🎨 Giao diện
- ✅ Responsive design với Tailwind CSS
- ✅ Sidebar navigation
- ✅ Modal forms cho thêm/sửa
- ✅ Loading states và error handling
- ✅ Confirmation dialogs cho xóa

## Cấu trúc thư mục

```
/workspace
├── components/           # React components
│   ├── TeacherList.jsx  # Danh sách giáo viên
│   ├── TeacherForm.jsx  # Form thêm/sửa giáo viên
│   ├── PositionList.jsx # Danh sách vị trí
│   ├── PositionForm.jsx # Form thêm/sửa vị trí
│   └── Sidebar.jsx      # Navigation sidebar
├── connect/             # API connection
│   └── axios.js         # Axios instance và API calls
├── App.jsx              # Main app component
├── main.jsx             # Entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
└── README.md            # Documentation
```

## Cài đặt và Chạy ứng dụng

### Frontend (React + Vite)

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Chạy development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

### Backend API

Đảm bảo backend API đang chạy trên `http://localhost:3000/api` với các endpoints:

#### Teacher API
- `GET /api/teachers?page=1&limit=10` - Lấy danh sách giáo viên
- `POST /api/teachers` - Tạo giáo viên mới
- `PUT /api/teachers/:id` - Cập nhật giáo viên
- `DELETE /api/teachers/:id` - Xóa giáo viên

#### Position API
- `GET /api/teacher-positions` - Lấy danh sách vị trí
- `POST /api/teacher-positions` - Tạo vị trí mới
- `PUT /api/teacher-positions/:id` - Cập nhật vị trí
- `DELETE /api/teacher-positions/:id` - Xóa vị trí

## Cấu hình

### API Base URL
Thay đổi URL backend trong `/connect/axios.js`:
```javascript
const baseURL = 'http://localhost:3000/api';
```

### Database Models

#### Teacher Schema
```javascript
{
  code: String,        // Mã giáo viên
  name: String,        // Tên giáo viên
  email: String,       // Email
  phoneNumber: String, // Số điện thoại
  address: String,     // Địa chỉ
  teacherPositionsId: [ObjectId], // Vị trí công tác
  degrees: [{          // Trình độ học vấn
    type: String,      // Loại bằng
    school: String,    // Trường
    major: String,     // Chuyên ngành
    year: Number,      // Năm tốt nghiệp
    isGraduated: Boolean
  }]
}
```

#### Position Schema
```javascript
{
  code: String,        // Mã vị trí
  name: String,        // Tên vị trí
  description: String  // Mô tả
}
```

## Công nghệ sử dụng

### Frontend
- **React 18** - UI Library
- **React Router DOM** - Routing
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## Tính năng nổi bật

1. **Form validation** - Kiểm tra dữ liệu đầu vào
2. **Error handling** - Xử lý lỗi từ API
3. **Loading states** - Hiển thị trạng thái loading
4. **Confirmation dialogs** - Xác nhận trước khi xóa
5. **Responsive design** - Tối ưu cho mobile và desktop
6. **Multiple degrees** - Quản lý nhiều bằng cấp cho mỗi giáo viên
7. **Position assignment** - Gán nhiều vị trí cho giáo viên

## Hướng dẫn sử dụng

### 1. Quản lý Giáo viên
- Truy cập menu "Giáo viên" để xem danh sách
- Click "Thêm giáo viên" để tạo mới
- Click "Sửa" để chỉnh sửa thông tin
- Click "Xóa" để xóa giáo viên (có xác nhận)

### 2. Quản lý Vị trí Công tác
- Truy cập menu "Vị trí công tác" để xem danh sách
- Click "Tạo" để thêm vị trí mới
- Click "Sửa" để chỉnh sửa vị trí
- Click "Xóa" để xóa vị trí (có xác nhận)

### 3. Phân trang
- Sử dụng các nút số trang để điều hướng
- Thay đổi số lượng item/trang qua dropdown

## Troubleshooting

### Lỗi kết nối API
- Kiểm tra backend có đang chạy không
- Kiểm tra URL trong `connect/axios.js`
- Kiểm tra CORS settings

### Lỗi validation
- Đảm bảo nhập đủ thông tin bắt buộc
- Kiểm tra format email đúng
- Đảm bảo mã không trùng lặp

## License

MIT License