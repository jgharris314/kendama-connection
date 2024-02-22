import axios from "axios"

export default function axiosPost<T>(endpoint: string, data: T) {
  return axios
    .post(`${import.meta.env.VITE_API_ENDPOINT}${endpoint}`, data)
    .then((res) => res.data)
}
