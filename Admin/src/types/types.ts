export interface PaginationData {
  _page: number;
  _limit: number;
  _totalMovie: number;
  // Các thuộc tính khác của dữ liệu phân trang
}
export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role_admin: number;
  role_subscription: number;
  role_active: number;
  avatar: string;
}
export interface Movie {
  _id: string;
  backdrop_path: string;
  title: string;
  typeMovie: string | string[];
  role_movie: number;
}
export interface ModalComfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
}
