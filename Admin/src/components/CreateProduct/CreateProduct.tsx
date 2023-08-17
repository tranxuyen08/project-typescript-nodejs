import React, { useState, ChangeEvent, FormEvent } from "react";
import "./CreateProduct.css";
// import BaseAxios from "../../api/axiosInstance";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseAxios from "../../api/axiosInstance";

interface Props {}

const CreateProduct: React.FC<Props> = (props) => {
  const [title, setTitle] = useState("");
  const [video, setTrailer] = useState("");
  const [overview, setOverview] = useState("");
  const [typeMovie, setTypes] = useState<string[]>([]);
  const [backdropPaths, setBackdropPaths] = useState<File[]>([]);
  const [posters, setPosters] = useState<File[]>([]);
  const [roleMovie, setRole] = useState("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTrailerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTrailer(event.target.value);
  };

  const handleOverviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOverview(event.target.value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    const newTypes = [...typeMovie];

    if (checked) {
      newTypes.push(value);
    } else {
      const index = newTypes.indexOf(value);
      if (index > -1) {
        newTypes.splice(index, 1);
      }
    }

    setTypes(newTypes);
  };

  const handleBackdropChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setBackdropPaths(Array.from(event.target.files));
    }
  };

  const handlePosterChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPosters(Array.from(event.target.files));
    }
  };

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("trailer", video);
    formData.append("overview", overview);
    formData.append("typeMovie", typeMovie.join(","));
    backdropPaths.forEach((file) => formData.append("backdrop_path", file));
    posters.forEach((file) => formData.append("poster", file));
    formData.append("role_movie", roleMovie);

    try {
      const response = await BaseAxios.post(
        `/api/v1/movie/add-movie`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // const newMovie = response.data;
      const newMovie = {}; // Replace with the actual response data
      console.log(12311, newMovie);
      setTitle("");
      setTrailer("");
      setOverview("");
      setTypes([]);
      setBackdropPaths([]);
      setPosters([]);
      setRole("");
      toast.success("Add new product successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("New movie created:", newMovie);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <div className="sect-create create-product-form-container">
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
        <div className="wrapper-content-add">
          <div className="wrapper-title">
            <span className="sperator"></span>
            <span className="title-page">Create product</span>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="trailer">Trailer Movie:</label>
              <input
                type="text"
                id="trailer"
                name="video"
                value={video}
                onChange={handleTrailerChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="overview">Overview:</label>
              <textarea
                id="overview"
                name="overview"
                value={overview}
                onChange={handleOverviewChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Movie Genre:</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="typeMovie"
                    value="action"
                    checked={typeMovie.includes("action")}
                    onChange={handleTypeChange}
                  />
                  Action
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="typeMovie"
                    value="adventure"
                    checked={typeMovie.includes("adventure")}
                    onChange={handleTypeChange}
                  />
                  Adventure
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="typeMovie"
                    value="comedy"
                    checked={typeMovie.includes("comedy")}
                    onChange={handleTypeChange}
                  />
                  Comedy
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="typeMovie"
                    value="drama"
                    checked={typeMovie.includes("drama")}
                    onChange={handleTypeChange}
                  />
                  Drama
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="backdrop">Backdrop:</label>
              <label className="upload-wrapper" htmlFor="backdrop">
                <AiOutlineCloudUpload />
                <p>Upload file here !</p>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="backdrop"
                name="backdrop_path"
                accept="image/jpeg, image/jpg, image/png"
                onChange={handleBackdropChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="poster">Poster:</label>
              <label className="upload-wrapper" htmlFor="poster">
                <AiOutlineCloudUpload />
                <p>Upload file here !</p>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="poster"
                name="poster"
                accept="image/jpeg, image/jpg, image/png"
                onChange={handlePosterChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Type movie:</label>
              <select
                id="role"
                name="role_movie"
                value={roleMovie}
                onChange={handleRoleChange}
                required
              >
                <option value="">Choose type movie</option>
                <option value="1">Free</option>
                <option value="2">No Free</option>
              </select>
            </div>

            <button type="submit" className="btn btn-create">
              Tạo sản phẩm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
