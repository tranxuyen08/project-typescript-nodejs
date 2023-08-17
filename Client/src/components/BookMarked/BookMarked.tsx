import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import "./BookMarked.css";
import { FavoriteMovie } from "../../types/types";
import BaseAxios from "../../api/axiosClient";
import LoadingComponent from "../Loading";

const BookMarked: React.FC = () => {
  const [dataFavorite, setDataFavorite] = useState<FavoriteMovie[]>([]);
  const [reloadData, setReloadData] = useState<boolean>(false);
  const [isLoad, setisLoad] = useState<boolean>(true);
  const handleGetFavorite = async () => {
    try {
      setisLoad(false);
      const response = await BaseAxios.get("/api/v1/favorite");
      const favoriteMovies: FavoriteMovie[] = response.data.favoriteMovies;
      setDataFavorite(favoriteMovies);
    } catch (error) {
      setisLoad(true);
      console.error("Error:", error);
      console.log(error);
    }
  };

  const handleDeleteFavorite = async (id: string) => {
    try {
      setisLoad(false)
      await BaseAxios.delete(`/api/v1/favorite/${id}`);
      setReloadData(!reloadData);
    } catch (error) {
      setisLoad(true)
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetFavorite();
  }, [reloadData]);

  return (
    <section className="bookmarked profile">
      {isLoad && <LoadingComponent />}
      <div className="container-middle">
        <div className="wrapper-bookmarked">
          <div className="header-bookmarked">
            <h2 className="title-h2">My Favorite Films</h2>
          </div>
          <div className="wrapper-list-card">
            <ul className="list-card">
              {dataFavorite.length === 0 ? (
                <div className="img-notfound">
                  <img src="/image/an-empty-stage-with-blue-curtain-vector (1).jpg" alt="" />
                </div>
              ) : (
                dataFavorite.map((item) => {
                  const imgURL =
                    "https://image.tmdb.org/t/p/original" +
                    item?.idMovie?.poster;
                  return (
                    <li key={item?.idMovie?._id} className="item-card">
                      <Link
                        to={`/detail/${item?.idMovie?._id}`}
                        className="card-link"
                      >
                        <div className="card-img">
                          <img src={imgURL} alt="" />
                        </div>
                        <p>{item?.idMovie?.title}</p>
                      </Link>
                      <div className="delete">
                        <p
                          className="btn-delete-fvr"
                          onClick={() =>
                            handleDeleteFavorite(item?.idMovie?._id)
                          }
                        >
                          <TiDeleteOutline />
                        </p>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookMarked;
