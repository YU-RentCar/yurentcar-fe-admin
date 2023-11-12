import api from "./interceptors";

/* 특정 유저의 포인트 내역 조회 */
export const getUserPoint = (adminUsername, nickname) => {
  return api({
    url: "/points/users",
    method: "get",
    params: {
      adminUsername: adminUsername,
      nickname: nickname,
    },
  });
};
