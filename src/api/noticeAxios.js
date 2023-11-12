import api from "api/interceptors";

/* 차 키 조회 */
export const getNoticeList = (province, branchName) => {
  return api({
    url: "/branches/notices",
    method: "get",
    params: { province: province, branchName: branchName, count: 0 },
  });
};
