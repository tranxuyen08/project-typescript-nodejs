import React, { useState, useEffect, ChangeEvent } from "react";
import { AiFillEdit, AiOutlineCloudUpload } from "react-icons/ai";
import { BsSave2 } from "react-icons/bs";
import "./Profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseAxios from "../../api/axiosClient";
const Profile: React.FC = () => {
  const userLogin: any = localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin") as any) : {};
  const [firstName, setFirstName] = useState<string>(userLogin?.firstName);
  const [lastName, setLastName] = useState<string>(userLogin?.lastName);
  const [originalFirstName, setOriginalFirstName] = useState<string>(
    userLogin?.firstName
  );
  const [originalLastName, setOriginalLastName] = useState<string>(
    userLogin?.lastName
  );
  const [isEditingFirstName, setIsEditingFirstName] = useState<boolean>(
    false
  );
  const [isEditingLastName, setIsEditingLastName] = useState<boolean>(
    false
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadKey, setUploadKey] = useState<number>(0);

  useEffect(() => {
    setOriginalFirstName(userLogin?.firstName);
    setOriginalLastName(userLogin?.lastName);
  }, [userLogin]);

  const handleEditFirstName = () => {
    setIsEditingFirstName(!isEditingFirstName);
    if (!isEditingFirstName) {
      setFirstName(originalFirstName);
    }
  };

  const handleEditLastName = () => {
    setIsEditingLastName(!isEditingLastName);
    if (!isEditingLastName) {
      setLastName(originalLastName);
    }
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    if (name === "firstName") {
      setFirstName(e.target.value);
    } else if (name === "lastName") {
      setLastName(e.target.value);
    }
  };

  const handleSaveFirstName = () => {
    setIsEditingFirstName(false);
    saveProfileData();
  };

  const handleSaveLastName = () => {
    setIsEditingLastName(false);
    saveProfileData();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!selectedImage) {
        console.log("No image selected");
        return;
      }
      const formData = new FormData();
      console.log(formData)
      formData.append("avatar", selectedImage);
      const response = await BaseAxios.post(
        `/api/v1/users/upload-one/${userLogin._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const newUser = response.data?.data;
        localStorage.setItem("userLogin", JSON.stringify(newUser));
        setUploadKey(uploadKey + 1);
      } else {
        console.log("Error uploading image");
      }
    } catch (error) {
      // console.error("Error uploading image:", error);
      console.log(1111,error)
    }
  };

  const saveProfileData = () => {
    const UserLogin: any = localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin") as any) : {};
    BaseAxios.patch(`/api/v1/users/update/${UserLogin._id}`, {
      firstName: firstName,
      lastName: lastName,
    })
      .then((response) => {
        if (response.status === 200) {
          const newUser = response.data?.data;
          localStorage.setItem("userLogin", JSON.stringify(newUser));
          toast.success("Profile Updated Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setUploadKey(uploadKey + 1);
        } else {
          console.log("Error updating profile");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  useEffect(() => {
    const updatedUser: any =
    localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")as any) : {};
    setFirstName(updatedUser?.firstName);
    setLastName(updatedUser?.lastName);
  }, [uploadKey]);
  return (
    <section className="profile">
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
        <div className="wrapper-profile">
          <h2 className="title-h2-profile">Account Setting</h2>
          <div className="content">
            <div className="content-left">
              <div className="wrapper-content-left">
                <div className="user-infor">
                  <h3 className="title-h3-profile">User Information</h3>
                  <p className="title-text">
                    Here you can edit public information about your account. If
                    you signed in with Google or Facebook, you can't change your
                    email and password
                  </p>
                </div>
                <div className="user-infor">
                  <h3 className="title-h3-profile">Email</h3>
                  <div>
                    <input
                      className="change-input"
                      type="email"
                      name="email"
                      value={userLogin?.email}
                      readOnly
                    />
                    <button className="btn btn-edit">
                      {/* <BiRightArrow /> */}
                    </button>
                  </div>
                </div>
                <div className="user-infor">
                  <h3 className="title-h3-profile">Last Name</h3>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      className={`change-input ${
                        isEditingLastName ? "editable" : ""
                      }`}
                      onChange={(e) => handleChangeName(e, "lastName")}
                      readOnly={!isEditingLastName}
                    />
                    <button
                      className="btn btn-edit"
                      onClick={
                        isEditingLastName
                          ? handleSaveLastName
                          : handleEditLastName
                      }
                    >
                      {isEditingLastName ? <BsSave2 /> : <AiFillEdit />}
                    </button>
                  </div>
                </div>
                <div className="user-infor">
                  <h3 className="title-h3-profile">First Name</h3>
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      className={`change-input ${
                        isEditingFirstName ? "editable" : ""
                      }`}
                      onChange={(e) => handleChangeName(e, "firstName")}
                      readOnly={!isEditingFirstName}
                    />
                    <button
                      className="btn btn-edit"
                      onClick={
                        isEditingFirstName
                          ? handleSaveFirstName
                          : handleEditFirstName
                      }
                    >
                      {isEditingFirstName ? <BsSave2 /> : <AiFillEdit />}
                    </button>
                  </div>
                </div>
                <div className="user-infor">
                  <h3 className="title-h3-profile">Password</h3>
                  <div>
                    <input
                      className="change-input"
                      type="password"
                      name="email"
                      value={userLogin?.password}
                      placeholder="New Password"
                      readOnly
                    />
                    <button className="btn btn-edit">
                    </button>
                  </div>
                </div>
                <button className="btn btn-delete">Delete Account</button>
              </div>
            </div>
            <div className="content-right">
              <div className="wrapper-content-right">
                <h3 className="title-h3-profile">Profile Photo</h3>
                <div className="content-photo">
                  <div className="avatar-profile">
                    <img src={userLogin?.avatar} alt="" />
                  </div>

                  <label htmlFor="file" className="btn btn-upload">
                    <AiOutlineCloudUpload className="icon-upload" />
                    <p>Upload Image</p>
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="images"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <button
                    className="btn btn-upload"
                    onClick={handleUploadImage}
                  >
                    {" "}
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
