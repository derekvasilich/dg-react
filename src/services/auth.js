import { http, getHeaders } from "@/services/http-common";

class AuthDataService {
  login(data) {
    return http.post("/login", data, {
        headers: getHeaders()
    });
  }
}

export default new AuthDataService();