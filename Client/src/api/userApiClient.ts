import axios from "axios"
import BaseAxios from "./axiosClient"


export class UserAPI {
  static login(params : any) {
    const url = 'http://localhost:8000/api/v1/users/login'
    return axios.post(url,params, { withCredentials: true })
  }
  static register(params :any){
    const url = '/api/v1/users/register'
    return BaseAxios.post(url,params)
  }
  static update(params : any){
    const url ='/api/v1/users/update'
    return BaseAxios.patch(url,params)
  }
  static favorite(params : any) {
    const url = '/api/v1/favorite'
    return axios.post(url,params)
  }
}