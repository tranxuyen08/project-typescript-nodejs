import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineSend } from "react-icons/ai";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import "./PlayingMovie.css";
import BaseAxios from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PlayingMovie: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>();
  const [width, setWidth] = useState<string>("560");
  const [height, setHeight] = useState<string>("315");
  const [isCheckFavorite, setIsCheckFavorite] = useState<boolean>(false);
  const [comment, setComment] = useState<any[]>([]);
  const [inputComment, setInputComment] = useState<string>("");
  const [isCheckCmt, setIsCheckCmt] = useState<boolean>(false);

  const fetchMovie = async () => {
    try {
      const response = await BaseAxios.get(`/api/v1/movie/${params?.id}`);
      setMovie(response.data.data);
      setWidth("560");
      setHeight("315");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheckFavorite = async () => {
    try {
      const response = await BaseAxios.get(`/api/v1/favorite`);
      const favorites = response.data;
      const isFavorite = favorites?.some(
        (favorite: any) => favorite?.idMovie === params?.id
      );
      setIsCheckFavorite(isFavorite);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleGetComment = async () => {
    try {
      const id = params.id;
      const res = await BaseAxios.get(`/api/v1/comments/${id}`);
      const dataComments = res.data.data;
      setComment(dataComments);
    } catch (errors) {
      console.error(errors);
    }
  };

  useEffect(() => {
    handleGetComment();
  }, [isCheckCmt]);

  useEffect(() => {
    fetchMovie();
    handleCheckFavorite();
    handleGetComment();
  }, []);

  // const handleFullScreen = () => {
  //   const videoElement = document.getElementById("movie-video");

  //   if (videoElement?.requestFullscreen) {
  //     videoElement.requestFullscreen();
  //   } else if (videoElement?.mozRequestFullScreen) {
  //     videoElement.mozRequestFullScreen();
  //   } else if (videoElement?.webkitRequestFullscreen) {
  //     videoElement.webkitRequestFullscreen();
  //   } else if (videoElement?.msRequestFullscreen) {
  //     videoElement.msRequestFullscreen();
  //   }
  // };

  const handleFavorite = async (id: string) => {
    const requestData = {
      idMovie: id,
    };
    try {
      if (isCheckFavorite) {
        await BaseAxios.post(`/api/v1/favorite`, requestData);
        setIsCheckFavorite(!isCheckFavorite);
        toast.success("Bỏ yêu thích thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Yêu thích thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        await BaseAxios.post(`/api/v1/favorite`, requestData);
        setIsCheckFavorite(!isCheckFavorite);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputComment !== "") {
      try {
        const requestBody = {
          idMovie: params.id,
          titleComment: inputComment,
        };
        console.log("requestBody",requestBody)
        await BaseAxios.post("/api/v1/comments", requestBody);
        setIsCheckCmt(!isCheckCmt);
        setInputComment("");
      } catch (error) {
        console.error("Lỗi khi gửi bình luận:", error);
      }
    }
  };
  return (
    <section className="playing-movie">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="container-middle">
        <div className="wrapper-playing">
          <div className="wrapper-video">
            <iframe
              id="movie-video"
              width={width}
              height={height}
              src={movie?.video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          {/* <button
             onClick={handleFullScreen}
            className="btn btn-full-screen"
          >
            Full Screen
          </button> */}
          <div className="title-movie">
            <h2>{movie?.title}</h2>
          </div>
          <div className="action">
            <div className="ratting">
              <p>{movie?.vote_average}</p>
              <AiFillStar className="icon-ratting" />
            </div>
            <p onClick={() => handleFavorite(movie?._id)}>
              {isCheckFavorite ? (
                <MdFavorite className="icon-favorite" />
              ) : (
                <MdOutlineFavoriteBorder className="icon-favorite" />
              )}
            </p>
          </div>
          <div className="over-view">
            <h3 className="title-h3">Overview:</h3>
            <p className="">{movie?.overview}</p>
          </div>

          <div className="comment">
            <div className="content-comment">
              <h3 className="">Comments:</h3>
              {comment?.length > 0 && (
                <ul id="comment-list">
                  {comment &&
                    comment?.map((item) => {
                      return (
                        <li className="item-content" key={item?._id}>
                          <div className="cmt-content">
                            <p className="cmt-content-text">
                              {item?.titleComment}
                            </p>
                          </div>
                          <div className="user-cmt">
                            <div className="avatar">
                              <img src={item?.idUser?.avatar.slice(1)} alt="" />
                              <p className="user-name">
                                {item?.idUser?.firstName +
                                  item?.idUser?.lastName}
                              </p>
                            </div>
                            <div className="like-wrapper">
                              <BiSolidLike className="like-icon" />
                              <span className="num-like">5</span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              )}
              <form className="comment-form" onSubmit={handleComment}>
                <input
                  type="text"
                  value={inputComment}
                  onChange={(e) => setInputComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button type="submit" className="btn btn-submit">
                  <AiOutlineSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayingMovie;
