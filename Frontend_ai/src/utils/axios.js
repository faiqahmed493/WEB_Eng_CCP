import axios from "axios";

const instance = axios.create({
    baseURL: "https://ai-resume-matching.onrender.com",
    // timeout:5000,
    // headers: {'Content-Type':'application/json'}
});

export default instance;