import axios from "axios"

export class MovieAPI {
  static getAllMovie(paginate : number) {
    const url = 'http://localhost:8000/api/v1/movie';
    const params = {
      page: paginate,
      limit: 10,
    };
    return axios.get(url, { params: params });
  }
  static getMovieShowSlide() {
    const url = 'http://localhost:8000/api/v1/movie/popular'
    return axios.get(url)
  }
  static getMovieRate() {
    const url = 'http://localhost:8000/api/v1/movie/rate'
    return axios.get(url)
  }
  static getMovieSearch(params : string) {
    const url = `http://localhost:8000/api/v1/movie/search?searchTerm=${params}`
    console.log(params);
    return axios.get(url)
  }
}