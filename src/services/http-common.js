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
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    "Content-type": "application/json",
  }
});

export {
    getHeaders, 
    http
}