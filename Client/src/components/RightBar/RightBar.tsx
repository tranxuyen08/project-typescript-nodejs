import React, { useEffect, useState } from "react";
import "./RightBar.css";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getAll } from "../../redux/reducer/movieSlice";

const RightBar: React.FC = () => {
  // const dispatch = useDispatch();
  // const movies = useSelector((state) => state?.movie.data?.data);
  const [isLoad, setIsLoad] = useState(true);

  const handleGetTrending = async () => {
    try {
      // await dispatch(getAll());
      setIsLoad(false);
      // console.log(movies);
    } catch (err) {
      setIsLoad(false);
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetTrending();
  }, []);

  return (
    <section className="sect-right-bar">
      <div className="container">
        <div className="wrapper-right-bar">
          <div className="search">
            <input
              className="input-search"
              type="text"
              placeholder="Search..."
            />
          </div>
          {/* <ul className="list-hagtag">
            <li className="item-hagtag">
              <Link to="/drama">
                <span>Drama</span>
              </Link>
            </li>
            <li className="item-hagtag">
              <Link to="/trending">
                <span>Trending</span>
              </Link>
            </li>
            <li className="item-hagtag">
              <Link to="/drama">
                <span>Family</span>
              </Link>
            </li>
            <li className="item-hagtag">
              <Link to="/drama">
                <span>Familyzzzz</span>
              </Link>
            </li>
          </ul> */}
          <div className="trending">
            <h3 className="title-h3">Trending</h3>
            <Link to="/trending" className="trending-movie">
              <div className="trending-img">
                <img
                  src="https://image.tmdb.org/t/p/w154/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
                  alt=""
                />
              </div>
              <div className="trending-info">
                <div className="trending-title">
                  <h4 className="title-h4">Avengers: Infinity War</h4>
                  <p>2023-04-17</p>
                  <p className="ratting">
                    8.2{" "}
                    <span>
                      <AiFillStar className="icon-ratting" />
                    </span>
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/trending" className="trending-movie">
              <div className="trending-img">
                <img
                  src="https://image.tmdb.org/t/p/w154/qW4crfED8mpNDadSmMdi7ZDzhXF.jpg"
                  alt=""
                />
              </div>
              <div className="trending-info">
                <div className="trending-title">
                  <h4 className="title-h4">Knights of the Zodiac</h4>
                  <p>2023-04-17</p>
                  <p className="ratting">
                    6.6{" "}
                    <span>
                      <AiFillStar className="icon-ratting" />
                    </span>
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/see-more">
              <button className="btn btn-see-more">See More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightBar;
