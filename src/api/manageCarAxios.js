import api from "./interceptors";

/* 차량 정보 */
let getCarInfo = (carNumber) => {
  return api({
    url: "/branches/cars/details",
    method: "get",
    params: { carNumber: carNumber },
  });
};

/* 차량 수리 내역 */
let getCarRepair = (carNumber) => {
  return api({
    url: "/branches/cars/repairs",
    method: "get",
    params: { carNumber: carNumber },
  });
};

/* 차량 사고 내역 */
let getCarAccident = (carNumber) => {
  return api({
    url: "/branches/cars/accidents",
    method: "get",
    params: { carNumber: carNumber },
  });
};

export { getCarInfo, getCarRepair, getCarAccident };
