import api from "./interceptors";

/* 특정 유저의 보유 포인트 조회 */
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

/* 특정 유저의 포인트 내역 추가 */
export const addRecord = (adminUsername, change) => {
  return api({
    url: "/points/users",
    method: "post",
    params: { adminUsername: adminUsername },
    data: {
      price: change.price,
      reason: change.reason,
      type: "ETC",
      nickname: change.nickname,
    },
  });
};

/* 특정 유저의 포인트 내역 조회 */
export const getPointRecords = (adminUsername, nickname) => {
  return api({
    url: "/points",
    method: "get",
    params: {
      adminUsername: adminUsername,
      nickname: nickname,
    },
  });
};
