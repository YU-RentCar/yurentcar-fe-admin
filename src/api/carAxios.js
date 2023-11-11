import api from "api/interceptors";

/* 지점 차량 조회 */
let getCarList = (adminUsername) => {
  return api({
    url: "/branches/cars/management",
    method: "get",
    params: { adminUsername: adminUsername },
  });
};

/* 지점 차량 삭제 */
let deleteCar = (adminUsername, carNumber) => {
  return api({
    url: "/branches/cars",
    method: "delete",
    params: {
      adminUsername: adminUsername,
      carNumber: carNumber,
    },
  });
};

export { getCarList, deleteCar };
