import axios, { AxiosInstance } from 'axios'

//To-Do
const baseURL = 'https://url-shortener-server-api.herokuapp.com/'

const http: AxiosInstance = axios.create({
  baseURL,
})

http.defaults.headers.post['Content-Type'] = 'application/json'

export default http