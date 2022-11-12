import axios, { AxiosInstance } from 'axios'

//To-Do
const baseURL = ''

const http: AxiosInstance = axios.create({
  baseURL,
})

http.defaults.headers.post['Content-Type'] = 'application/json'

export default http