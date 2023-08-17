import React, { useState } from "react";
import "./Seacrch.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getMovieSearch } from "../../redux/reducer/movieSlice";

const Search = () => {
  const [valueSearch, setValueSearch] = useState<string>(""); // Thay string bằng kiểu dữ liệu phù hợp

  const [newData, setNewData] = useState<any[]>([]); // Thay any[] bằng kiểu dữ liệu phù hợp với newData

  const dispatch = useDispatch();
  const imgURL = "https://mymoonlight.vercel.app/girl.png";

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setValueSearch(searchValue);

    try {
      const result = await dispatch(getMovieSearch(searchValue) as any).unwrap();
      setNewData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="sect-search">
      <div className="container">
        <div className="wrapper-footer-content">
          <h2 className="title-h2">
            Find your favourite movies, TV shows, people and more
          </h2>
          <input
            type="text"
            placeholder="Search.."
            onChange={handleSearch}
            value={valueSearch}
            className="input-search"
          />
          {valueSearch !== "" ? (
            newData?.length > 0 ? (
              <ul className="suggestions-list">
                {newData?.map((movie) => (
                  <li key={movie?.id} className="suggestion-item">
                    <Link to={`/detail/${movie?._id}`}>
                      <div className="search-movie-img">
                        <img
                          src={
                            "https://image.tmdb.org/t/p/" +
                            "original" +
                            movie?.poster
                          }
                          alt=""
                        />
                      </div>
                      <p className="title-movie">{movie?.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="not-found">
                <img src="/image/vector-magnifire-glass-icon.jpg" alt="" />
              </div>
            )
          ) : (
            <div className="banner-search">
              <img src={imgURL} alt="" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Search;
