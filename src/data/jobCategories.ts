export const JOB_CATEGORIES = [
  "Quản trị",
  "Chiến lược",
  "Pháp lý",
  "Tài chính",
  "Vận hành",
  "Nhân sự",
  "Kinh doanh",
  "Truyền thông",
  "Công nghệ",
  "Đào tạo",
  "An ninh",
  "Hải sản",
  "Bất động sản",
  "Cà phê",
  "Trò chơi trực tuyến",
  "Cửa hàng trò chơi",
] as const;

export const JOB_CATEGORY_FILTERS = ["Tất cả", ...JOB_CATEGORIES] as const;
