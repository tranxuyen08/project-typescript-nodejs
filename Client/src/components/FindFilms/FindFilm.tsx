import React, { useEffect, useState } from "react";
import "./FindFilm.css";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
// import { getAll } from "../../redux/reducer/movieSlice";
import { useDispatch, useSelector } from "react-redux";
// import Pagination from "../Pagination/Pagination";
import querystring from "query-string";
import BaseAxios from "../../api/axiosClient";
import { getAll } from "../../redux/reducer/movieSlice";
// import { IMovie } from "../../types/types";
import LoadingComponent from "../Loading";
import Pagination from "../Pagination/Pagination";
import { RootState } from "../../redux/store/store";

// interface IMovieState {
//   data: IMovie[]; // Sửa lại dữ liệu của IMovieState để phù hợp với Redux store
//   pagination: any; // Thay any bằng kiểu dữ liệu phù hợp
// }

const FindFilm: React.FC = () => {
  const dispatch = useDispatch();
  // const movies = useSelector((state: any) => state?.movie.data?.data); // Thay any bằng kiểu dữ liệu phù hợp
  const pagination = useSelector((state: RootState) => state.movies.pagination); // Thay any bằng kiểu dữ liệu phù hợp
  // const movieState = useSelector((state: any) => state.movie) as IMovieState
  const [dataMovie, setDataMovie] = useState<Array<any>>([]); // Thay any[] bằng kiểu dữ liệu phù hợp
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const handleGetAPI = async (params: number) => {
    try {
      await dispatch(getAll(params) as any).unwrap();
      setIsLoad(false);
    } catch (err) {
      setIsLoad(false);
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetAPI(1);
  }, []);

  const [filter, setFilter] = useState({
    _limit: 10,
    _page: 1,
  });

  const handleOnPageChange = (page: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      _page: page,
    }));
  };

  useEffect(() => {
    const handleFilter = async () => {
      try {
        const queryString = querystring.stringify(filter);
        const response = await BaseAxios.get(`/api/v1/movie?${queryString}`);
        setDataMovie(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    handleFilter();
  }, [filter]);

  return (
    <section className="find-film">
      {isLoad && <LoadingComponent />}
      <div className="wrapper-find-film">
        <h2 className="title-h2">FIND FILMS THAT BEST FIT YOU</h2>
        <ul className="list-card">
          {dataMovie &&
            dataMovie?.map((item) => {
              // const imgURL =
              //   "https://image.tmdb.org/t/p/" + "original" + item?.poster;
              return (
                <li key={item?._id} className="item-card">
                  <Link to={`/detail/${item?._id}`} className="card-link">
                    <div className="card-img">
                      <img
                        src={
                          item?.poster.includes("http://")
                            ? item?.poster
                            : `https://image.tmdb.org/t/p/original${item?.poster}`
                        }
                        alt="product"
                      />
                    </div>
                    <p>{item?.title}</p>
                  </Link>
                  <p className="ratting ratting-card">
                    {item?.vote_average}
                    <span>
                      <AiFillStar className="icon-ratting" />
                    </span>
                  </p>
                </li>
              );
            })}
        </ul>
        {pagination?._page && (
          <Pagination
            pagination={pagination}
            onPageChange={handleOnPageChange}
          />
        )}
      </div>
    </section>
  );
};

export default FindFilm;
