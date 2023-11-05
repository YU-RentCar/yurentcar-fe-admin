import { getCarList, deleteCar } from "api/carAxios";
import { useState } from "react";

export const useCar = function () {
  // 차량 더미 데이터
  const [cars, setCars] = useState([
    {
      carId: 0,
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carId: 1,
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carId: 2,
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carId: 3,
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carId: 4,
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carId: 5,
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carId: 6,
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carId: 7,
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carId: 8,
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carId: 9,
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carId: 10,
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carId: 11,
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carId: 12,
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carId: 13,
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carId: 14,
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
  ]);

  // controller
  const cu = {};

  // getter
  cu.getCars = function () {
    return cars;
  };
  // setter
  cu.setCars = function (newCars) {
    setCars(newCars);
  };
  // 차량 리스트 조회
  cu.getCarList = function () {
    /* getCarList()
      .then((response) => {
        console.log("차 / 차량조회 : ", response.data);
        const tmp = this.fillSix([...response.data]); // 6개보다 적다면 빈걸로 채워주기
        this.setCars(tmp);
      })
      .catch((error) => {
        console.log("차량상태 / 차량조회에러 : ", error.response);
      }); 
    return cars */
    const tmp = this.fillSix(cars);
    this.setCars(tmp);
    return cars;
  };
  // 특정 페이지의 6개 가져오기
  cu.getPageCars = function (page) {
    const pageCars = cars.slice((page - 1) * 6, page * 6);
    return pageCars;
  };
  // 비어있는 개수 채우기
  cu.fillSix = function (beforeSix) {
    const len = beforeSix.length;
    const tmp = [...beforeSix];
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        tmp.push({
          carName: "",
          carNumber: "",
          carState: "",
        });
      }
    }
    return tmp;
  };
  // 차량 검색
  cu.searchCars = function (carNumber) {
    const tmp = [...this.getCarList()];
    const res = tmp.filter((v) => v.carNumber === carNumber);
    this.setCars(res);
    return res;
  };
  // 차량 삭제
  cu.deleteCar = function (target) {
    /*deleteCar(target)
      .then((response) => {
        console.log("차 / 차량삭제 : ", response.data);
        const tmp = this.getCarList();
        this.setCars(tmp);
      })
      .catch((error) => {
        console.log("차 / 차량삭제에러 : ", error.response);
      });
      return cars*/
    const tmp = [...cars];
    const idx = tmp.findIndex((car) => car.carId === target.carId);
    tmp.splice(idx, 1);
    this.setCars(tmp);
    return tmp;
  };

  return cu;
};
