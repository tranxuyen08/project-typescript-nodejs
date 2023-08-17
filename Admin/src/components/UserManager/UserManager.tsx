// import React from "react";
import "./UserManager.css";
import BaseAxios from "../../api/axiosInstance.ts";
import { useState, useEffect } from "react";
import LoadingComponent from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserData } from "../../types/types.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/index.ts";

const Users = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(true); // lần đầu mount component thì luôn để true để chờ useEffect gọi api về
  const loginAdminData = useSelector((state: RootState) => state.admin);
  console.log("login", loginAdminData);
  const handleGetUser = async () => {
    try {
      const response = await BaseAxios.get("/api/v1/users");
      const managerUser = response.data.users;
      setData(managerUser);
      //set loading false khi nhận dữ liệu
      setIsLoad(false);
      console.log(data);
    } catch (error) {
      //cũng set loading false khi call api thất bại
      setIsLoad(false);
      console.error("Error:", error);
    }
  };

  const handleUpdateRoleUser = async (id: string) => {
    //trước khi gọi api ,thì set Loading true
    // setIsLoad(true);
    try {
      const response = await BaseAxios.get(`/api/v1/users/${id}`);
      const updatedUser = response.data.user;
      console.log(updatedUser);
      if (!updatedUser) {
        console.error("User not found");
        return;
      }

      const newRoleActive = updatedUser.role_active === 1 ? 2 : 1;
      updatedUser.role_active = newRoleActive;

      const patchResponse = await BaseAxios.patch(
        `/api/v1/users/update/${id}`,
        updatedUser
      );
      toast.success("Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleGetUser();
      //Khi call thành công thì set loading false
      // setIsLoad(false);
      if (patchResponse.data.success) {
        setIsLoading(!isLoading);
      } else {
        console.error("Failed to update user role");
      }
    } catch (error) {
      //khi call thất bại thì cũng set loading false
      // setIsLoad(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, [isLoading]);

  return (
    <div className="content-user">
      {isLoad && <LoadingComponent />}

      <div className="table-content">
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
        <div className="wrapper-title">
          <span className="sperator"></span>
          <span className="title-page">Quản Lý Người Dùng</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>ID Người Dùng</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status Account</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                // Kiểm tra nếu không phải admin, hiển thị người dùng
                if (item.role_admin !== 2) {
                  return (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item._id}</td>
                      <td>{item.email}</td>
                      <td>{item.role_admin === 1 ? "User" : "Admin"}</td>
                      <td>
                        <button
                          onClick={() => handleUpdateRoleUser(item._id)}
                          className="btn btn-update-user"
                        >
                          {item?.role_active === 1 ? (
                            <>
                              Active <span className="active-dot green"></span>
                            </>
                          ) : (
                            <>
                              Banned <span className="active-dot red"></span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return null; // Ẩn admin
                }
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
