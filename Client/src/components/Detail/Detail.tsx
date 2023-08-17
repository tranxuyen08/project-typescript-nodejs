import React, { useEffect, useState } from "react";
import "./Detail.css";
import { BsFillPlayFill } from "react-icons/bs";
// import { AiOutlineSend } from "react-icons/ai";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import BaseAxios from "../../api/axiosClient";
import { Link, useParams } from "react-router-dom";
import { IComment, IMovie } from "../../types/types";
import FadingBox from "../Model/Model";


const Detail: React.FC = () => {
  const params = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const [movie, setMovie] = useState<IMovie | undefined>();
  const [imgPosterURL, setImgPosterUrl] = useState<string | undefined>();
  const [imgBackImgURL, setImgBackImgURL] = useState<string | undefined>();
  const [linkWatching, setLinkWatching] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState("overview");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [value, setValue] = useState<number>(0);


  const handleWatchingClick = () => {
    if (movie?.role_movie === 1) {
      setLinkWatching(`/playing-movie/${movie?._id}`);
    } else if (movie?.role_movie === 2) {
      const accessTokenUser = localStorage.getItem("accessToken") || null;
      const userLogin =
        JSON.parse(localStorage.getItem("userLogin") as string) || null;

      if (accessTokenUser && userLogin.role_subscription === 1) {
        setIsModelOpen(true);
      } else {
        setLinkWatching(`/playing-movie/${movie?._id}`);
      }
    }
  };

  const fetchMovie = async () => {
    try {
      const res = await BaseAxios.get(`/api/v1/movie/${params?.id}`);
      const movieData: IMovie = res.data.data;
      setMovie(movieData);
      setImgPosterUrl(
        "https://image.tmdb.org/t/p/" + "original" + movieData?.poster
      );
      setImgBackImgURL(
        "https://image.tmdb.org/t/p/" + "original" + movieData?.backdrop_path
      );
      setValue(movieData.vote_average);
    } catch (error) {
      console.error(11111111, error);
    }
  };

  const handleGetComment = async () => {
    const id = params.id;
    try {
      const res = await BaseAxios.get(`/api/v1/comments/${id}`);
      const dataComments = res.data.data;
      setComments(dataComments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovie();
    handleGetComment();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <section className="sect-detail">
      <div className="wrapper-middle">
        <div className="poster-movie">
          <div className="poster-movie-content">
            <div className="poster">
              <img src={imgBackImgURL} alt="" />
            </div>
            <div className="action-detail">
              <div>
                <div className="image-movie">
                  <img src={imgPosterURL} alt="" />
                </div>
                <h3 className="title-movie">{movie?.title}</h3>
                <Link
                  to={linkWatching || ""}
                  className="btn btn-watch"
                  onClick={handleWatchingClick}
                >
                  <BsFillPlayFill />
                  Watching
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="content-movie">
          <div className="content-movie-middle">
            <div className="tab-links">
              <Link
                to=""
                className={activeTab === "overview" ? "activeDetail" : ""}
                onClick={() => handleTabChange("overview")}
              >
                Overview
              </Link>
              <Link
                to=""
                className={activeTab === "vote" ? "activeDetail" : ""}
                onClick={() => handleTabChange("vote")}
              >
                Vote
              </Link>
              <Link
                to=""
                className={activeTab === "comment" ? "activeDetail" : ""}
                onClick={() => handleTabChange("comment")}
              >
                Comment
              </Link>
            </div>
            {activeTab === "overview" && (
              <div>
                <p className="text-ratting">Story</p>
                <span>{movie?.overview}</span>
                <div className="detail">
                  <p className="text-ratting">Detail</p>
                  <p className="detail-content">
                    Status:{" "}
                    <span className="status">
                      {movie?.role_movie == 1 ? "Free" : "NO FREE"}
                    </span>
                  </p>
                  <p className="detail-content">
                    Release Date:{" "}
                    <span>{movie?.release_date.split("T")[0]}</span>
                  </p>
                  <p className="detail-content">
                    Language: <span>English</span>
                  </p>
                  <p className="detail-content">
                    Ep Length: <span>1h20p</span>
                  </p>
                </div>
              </div>
            )}
            {activeTab === "vote" && (
              <div>
                <div className="content-movie-left">
                  <div style={{ width: 50, height: 50 }}>
                    <p className="text-ratting">Ratting</p>
                    <CircularProgressbar value={value * 10} />
                    <p className="text-ratting">{value * 10}%</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "comment" && (
              <div>
                <p className="text-ratting">Comment</p>
                <div className="wrapper-comment">
                  {comments?.map((comment) => (
                    <div className="show-comment">
                      <div className="user">
                        <div className="wrapper-img">
                          <img
                            src={comment?.idUser?.avatar.slice(1)}
                            alt="User Avatar"
                          />
                        </div>
                        <p className="name-comment">
                          {comment?.idUser?.firstName +
                            comment?.idUser?.lastName}
                        </p>
                      </div>
                      <div className="wrapper-comment-content">
                        <p>{comment?.titleComment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="content-movie-right">
            <p className="text-ratting">Trailler</p>
            <div className="img-trailler">
              <iframe
                className="trailler"
                src={movie?.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="movie-genre">
              {movie?.typeMovie.map((item, index) => {
                return (
                  <p className="detail-content" key={index}>
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isModelOpen && <FadingBox setIsModelOpen={setIsModelOpen} />}{" "}
      {/* Pass setIsModelOpen as a prop */}
    </section>
  );
};

export default Detail;
