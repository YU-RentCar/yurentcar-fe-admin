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
let deleteCar = (adminUsername, carId) => {
  return api({
    url: "/branches/cars",
    method: "delete",
    params: {
      adminUsername: adminUsername,
      carId: carId,
    },
  });
};

export { getCarList, deleteCar };
