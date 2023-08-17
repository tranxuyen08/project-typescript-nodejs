
import BaseAxios from "./axiosInstance"

export class Admin {
  static getUser(){
    const url ='/api/v1/users'
    return BaseAxios.get(url)
  }
  static getMovie(){
    const url ='/api/v1/movie'
    return BaseAxios.get(url)
  }
  static deleteMovie(params : any){
    const url =`/api/v1/movie/${params.id}`
    return BaseAxios.delete(url,params)
  }
  static login(data: any) {
    const url = '/api/v1/users/login'
    return BaseAxios.post(url, data)
  }
  // static updateUser(params : any){
  //   const url =`/api/v1/users/${params.id}`
  //   return BaseAxios.patch(url,params)
  // }
}