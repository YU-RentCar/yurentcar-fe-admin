import { getCarList, deleteCar } from "api/carAxios";
import { useRecoilState } from "recoil";
import { carInfoSelector } from "recoil/carAtom";
import { useAlert } from "utils/useAlert";

export const useCar = function () {
  const [info, setInfo] = useRecoilState(carInfoSelector);
  const alert = useAlert(); // alert 제어

  // controller
  const cu = {};

  // 차량 리스트 조회
  cu.getCarList = function (adminUsername) {
    getCarList(adminUsername)
      .then((response) => {
        console.log("차 / 차량조회 : ", response.data);
        const tmp = [...response.data];
        if (tmp.length) {
          tmp.sort((a, b) => a.carId - b.carId); // carId 기준으로 정렬
          setInfo({
            cars: [...tmp],
            maxPage: { num: Math.ceil(tmp.length / 6) },
          });
        } else alert.onAndOff("차량이 없습니다");
      })
      .catch((error) => {
        console.log("차량상태 / 차량조회에러 : ", error.response);
      });
  };
  // 특정 페이지의 6개 가져오기
  cu.getPageCars = function (page) {
    const pageCars = info.cars.slice((page - 1) * 6, page * 6);
    return pageCars;
  };
  // 비어있는 개수 채우기
  cu.fillEmpty = function (beforeSix) {
    const len = beforeSix.length;
    const tmp = [...beforeSix];
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        tmp.push({
          carName: "",
          carNumber: "",
          carState: "",
          carId: -1,
        });
      }
    }
    return tmp;
  };
  // 차량 검색
  cu.searchCars = function (adminUsername, carNumber) {
    getCarList(adminUsername)
      .then((response) => {
        console.log("차 / 차량검색 : ", response.data);
        let res;
        if (carNumber.trim() === "") res = [...response.data];
        else res = [...response.data].filter((v) => v.carNumber === carNumber);
        res.sort((a, b) => a.carId - b.carId); // carId 기준으로 정렬
        if (res.length)
          setInfo({
            cars: [...res],
            maxPage: { num: Math.ceil(res.length / 6) },
          });
        else alert.onAndOff("검색 결과 차량이 없습니다");
      })
      .catch((error) => {
        console.log("차 / 차량검색에러 : ", error.response);
      });
  };
  // 차량 삭제
  cu.deleteCar = function (adminUsername, carNumber) {
    return new Promise((resolve) => {
      deleteCar(adminUsername, carNumber)
        .then((response) => {
          console.log("차 / 차삭제 : ", response.data);
          resolve();
        })
        .catch((error) => console.log("차 / 차삭제에러 : ", error.response));
    });
  };

  return cu;
};
