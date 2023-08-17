import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin } from "../../api/adminApiClient";
// import { RootState } from '../store';

interface AdminState {
  // Define the structure of your admin state here
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role_admin: number;
  role_subscription: number;
  role_active: number;
  avatar: string;
}

let adminState: AdminState  = localStorage.getItem("adminLogin") ? JSON.parse(localStorage.getItem("adminLogin") as any) : { } ;

export const managerUsers = createAsyncThunk("managerUsers", async () => {
  const res = await Admin.getUser();
  return res;
});

export const managerMovie = createAsyncThunk("managerMovie", async () => {
  const res = await Admin.getMovie();
  return res;
});

export const deleteMovie = createAsyncThunk(
  "deleteMovie",
  async (id: string) => {
    const res = await Admin.deleteMovie(id);
    return res;
  }
);

export const loginAdmin = createAsyncThunk("login", async (payload: any) => {
  const res = await Admin.login(payload);
  const roleAdmin = res.data.data.role_admin;
  if (roleAdmin === 2) {
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("userLogin", JSON.stringify(res.data.data));
  }
  return res.data.data;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: adminState,
  reducers: {},
  extraReducers: (builder : any) => {
    builder
      .addCase(managerUsers.fulfilled, (state : any, action : PayloadAction<any>) => {
        state = action.payload
      })
      .addCase(managerMovie.fulfilled, (state : any, action : PayloadAction<any>) => {
        state =  action.payload;
      })
      .addCase(deleteMovie.fulfilled, (state : any, action : PayloadAction<any>) => {
        state =  action.payload;
      })
      .addCase(loginAdmin.fulfilled, (state : any, action : PayloadAction< any>) => {
        state = action.payload;
      });
  },
});
const {reducer } = adminSlice;
export default reducer;