import api from "./interceptors";

/* 지점 차량 조회 */
let getCarList = () => {
  return api({
    url: "",
    method: "get",
    params: { key: "value" },
  });
};

/* 차량 상태 저장 */
let saveChange = (newCars) => {
  return api({
    url: "",
    method: "post/patch",
    data: { key: "value" },
  });
};

export { getCarList, saveChange };
