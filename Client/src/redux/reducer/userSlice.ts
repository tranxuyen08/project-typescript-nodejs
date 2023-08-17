import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserAPI } from "../../api/userApiClient";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role_admin: number;
  role_subscription: number;
  role_active: number;
  avatar: string;
}
let initialState: IUser = localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem('userLogin') as any) : {};

export const login = createAsyncThunk('login', async (payload : any) => {
  const res = await UserAPI.login(payload);
  const roleActive = res.data.data.role_active;

  if (roleActive === 1) {
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('userLogin', JSON.stringify(res.data.data));
  }
  return res;
});

// Thunk để đăng ký
export const register = createAsyncThunk('register', async (payload : object) => {
  const res = await UserAPI.register(payload);
  return res;
});

// Thunk để cập nhật thông tin người dùng
export const updateUser = createAsyncThunk('update', async (payload) => {
  const res = await UserAPI.update(payload);
  return res;
});

// Thunk để thêm vào danh sách yêu thích
export const favorite = createAsyncThunk('favorite', async (payload) => {
  const res = await UserAPI.favorite(payload);
  return res;
});

const userSlice  = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder : any) => {
    builder
      .addCase(login.fulfilled, (state : any, action : PayloadAction<any>) => {
        state = action.payload
      })
      .addCase(register.fulfilled, (state : any, action : PayloadAction<any>) => {
        state =  action.payload;
      })
      .addCase(updateUser.fulfilled, (state : any, action : PayloadAction<any>) => {
        state =  action.payload;
      })
      .addCase(favorite.fulfilled, (state : any, action : PayloadAction< any>) => {
        state = action.payload;
      });
  },
})
const {reducer} = userSlice
export default reducer