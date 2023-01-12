import http from "shared/config/instance";

export const AuthApi = {
  login: (body: any) => {
    return http.post("/token/", body, {
      validateStatus: status => status === 200
    });
  },

  register: (body: any) => {
    return http.post("account/register", body);
  },

  refreshToken: (body: any) => {
    return http.post("/token/refresh/", body);
  },

  current: () => {
    return http.get("/api/v1/users/me");
  }
};
