import api from "api/interceptors";

/* 지점 차량 조회 */
let getCarList = () => {
  return api({
    url: "",
    method: "get",
    params: { key: "value" },
  });
};

/* 지점 차량 삭제 */
let deleteCar = (target) => {
  return api({
    url: "/branches/cars",
    method: "delete",
    params: {
      adminUsername: target.username,
      carId: target.carId,
    },
  });
};

export { getCarList, deleteCar };
