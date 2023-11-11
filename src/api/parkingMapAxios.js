import api from "./interceptors";

// 주차장 상태 표기
/* 지점 지도 조회 */
export const getMap = (adminInfo) => {
  return api({
    url: "/branches/parkingSpots",
    method: "get",
    params: { province: adminInfo.province, branchName: adminInfo.branchName },
  });
};

// 주차장 약도 작성
/* 지도 작성 */
export const setMap = (adminInfo, summariseInfo) => {
  return api({
    url: "/branches/parkingSpots",
    method: "post",
    params: { adminUsername: adminInfo.adminUsername },
    data: {
      parkingSpotRequestList: [...summariseInfo],
    },
  });
};
