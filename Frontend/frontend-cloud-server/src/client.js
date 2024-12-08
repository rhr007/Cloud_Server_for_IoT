import axios from "axios";
import URL from "./URL";

const client = axios.create({
    baseURL: URL()
})

export default client