import axios from "axios"

export default function axiosGet(endpoint: string) {
  return axios
    .get(`${import.meta.env.VITE_API_ENDPOINT}${endpoint}`)
    .then((res) => res.data)
}
