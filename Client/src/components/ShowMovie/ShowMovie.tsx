import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./ShowMovie.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import {
  getMovieRate,
  getMovieShowSlide,
} from "../../redux/reducer/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { IMovie } from "../../types/types";

export default function ShowMovie() {
  const dispatch = useDispatch();
  const movies = useSelector((state : RootState) => state.movies.data);
  const [toprate, setToprate] = useState([]);
  const handleGetMovie = async () => {
    try {
      await dispatch(getMovieShowSlide() as any);
      const data = await dispatch(getMovieRate() as any);
      setToprate(data.payload.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetMovie();
  }, []);
  return (
    <>
      <div className="type-movie">Popular</div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {movies.length !== 0 && movies?.map((item) => {
          const imgURL =
            "https://image.tmdb.org/t/p/" + "original" + item.poster;
          return (
            <SwiperSlide key={item?._id}>
              <Link to={`/detail/${item?._id}`}>
                <img src={imgURL} />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="type-movie">Top Rate</div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {toprate?.map((item: IMovie) => {
          const imgURL =
            "https://image.tmdb.org/t/p/" + "original" + item.poster;
          return (
            <SwiperSlide key={item?._id}>
              <Link to={`/detail/${item?._id}`}>
                <img src={imgURL} alt="" />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
