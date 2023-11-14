import api from "api/interceptors";

export const adminLogin = (adminInfo) => {
  return api({
    url: "/admin/login",
    method: "post",
    data: {
      username: adminInfo.username,
      password: adminInfo.password,
    },
  });
};
