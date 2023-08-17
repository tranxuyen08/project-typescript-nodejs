import { ReactNode } from "react";

export interface DefaultLayoutProps {
  children: ReactNode;
}
export interface LoginLayoutProps {
  children: ReactNode;
}

export interface UserLogin {
  lastName: string;
  avatar: string;
}

export interface LayoutProfileProps {
  children: ReactNode;
}
export interface FavoriteMovie {
  _id: string;
  idMovie: {
    _id: string;
    poster: string;
    title: string;
  };
}
export interface PaginationData {
  _page: number;
  _limit: number;
  _totalMovie: number;
  // Các thuộc tính khác của dữ liệu phân trang
}
export interface IMovie {
  _id: string
  title: string
  vote_average: number
  release_date: string
  overview: string
  video: string
  typeMovie: Array<string>
  backdrop_path: string
  poster: string
  role_movie: number,
  popularity: number,
}

export interface IComment {
  titleComment: string;
  idUser: {
    avatar: string;
    firstName: string;
    lastName: string;
  };
}
export interface FadingBoxProps {
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// export interface IMovie {
//   _id: string;
//   title: string;
//   poster: string;
//   backdrop_path: string;
//   vote_average: number;
//   role_movie: number;
//   release_date: string;
//   video: string;
//   typeMovie: string[];
// }