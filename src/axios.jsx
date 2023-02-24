import axios from "axios";
import { BASEURL } from "./Constants";

const instance = axios.create({
    baseURL:`${BASEURL}/api/`
})

export default instance