import api from "./interceptors";

// 주차장 상태 표기
/* 지점 지도 조회 */
export const getMap = () => {
  return api({
    url: "/branches/parkingSpots",
    method: "get",
    params: { province: "", branchName: "" },
  });
};

// 주차장 약도 작성
/* 지도 작성 */
export const setMap = (summariseInfo) => {
  return api({
    url: "/branches/parkingSpots",
    method: "post",
    params: { adminUsername: "관리자 이메일" },
    data: {
      summariseInfo,
    },
  });
};
