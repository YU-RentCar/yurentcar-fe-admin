import api from "./interceptors";

/* 지점 차량 조회 */
let getCarList = (adminUsername) => {
  return api({
    url: "/branches/cars/management",
    method: "get",
    params: { adminUsername: adminUsername },
  });
};

/* 차량 상태 저장 */
let saveChange = (adminUsername, newState) => {
  return api({
    url: "/branches/cars/states",
    method: "post",
    params: { adminUsername: adminUsername },
    data: { carId: newState.carId, carState: newState.carState },
  });
};

export { getCarList, saveChange };
