import axios from "axios";

const getHeaders = function() {
    const jwtToken = sessionStorage.getItem('jwt:token')
    const jwtType = sessionStorage.getItem('jwt:type')
    return {
        "Content-type": "application/json",
        Authorization: `${jwtType} ${jwtToken}`
    }
}

const http = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  }
});

export {
    getHeaders, 
    http
}