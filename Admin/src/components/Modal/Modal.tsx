import React, { useState, useEffect } from "react";
import "./Modal.css";
import { AiOutlineCloudUpload, AiOutlineCloseCircle } from "react-icons/ai";
import BaseAxios from "../../api/axiosInstance";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  editData: any; // Update the type according to your data structure
  handleUpdateSuccess: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  editData,
  handleUpdateSuccess,
}) => {
  const [title, setTitle] = useState<string>("");
  const [video, setTrailer] = useState<string>("");
  const [overview, setOverview] = useState<string>("");
  const [typeMovie, setTypes] = useState<string[]>([]);
  const [backdropPaths, setBackdropPaths] = useState<File[]>([]);
  const [posters, setPosters] = useState<File[]>([]);
  const [roleMovie, setRole] = useState<string>("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setTrailer(editData.video || "");
      setOverview(editData.overview || "");
      setTypes(editData.types || []);
      setRole(editData.role_movie || "");
    }
  }, [editData]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTrailerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrailer(event.target.value);
  };

  const handleOverviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOverview(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleBackdropChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setBackdropPaths(Array.from(event.target.files));
    }
  };

  const handlePosterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPosters(Array.from(event.target.files));
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("trailer", video);
    formData.append("overview", overview);
    formData.append("typeMovie", typeMovie.join(","));
    for (let i = 0; i < backdropPaths.length; i++) {
      formData.append("backdrop_path", backdropPaths[i]);
    }
    for (let i = 0; i < posters.length; i++) {
      formData.append("poster", posters[i]);
    }
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

      const newMovie = response.data;
      console.log("New movie created:", newMovie);

      // Reset form values
      setTitle("");
      setTrailer("");
      setOverview("");
      setTypes([]);
      setBackdropPaths([]);
      setPosters([]);
      setRole("");

      // Close the modal
      handleClose();
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await BaseAxios.patch(`/api/v1/movie/${editData?._id}`, {
        title,
        video,
        overview,
        typeMovie,
        backdrop_paths: backdropPaths,
        posters,
        role_movie: roleMovie,
      });
      handleUpdateSuccess();
      handleClose();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <section className="sect-modal">
      <div className="wrapper-modal">
        <div className="wrapper-form">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="bkg-form"
          >
            <button className="btn-close" onClick={handleClose}>
              <AiOutlineCloseCircle className="close" />
            </button>
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
                <p>Upload file here!</p>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="poster"
                name="poster"
                accept="image/jpeg, image/jpg, image/png"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="poster">Poster:</label>
              <label className="upload-wrapper" htmlFor="poster">
                <AiOutlineCloudUpload />
                <p>Upload file here!</p>
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

            <div className="form-group center">
              <button
                onClick={handleUpdate}
                type="button"
                className="btn btn-edit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Modal;
