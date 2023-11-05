import { getCarList, saveChange } from "api/carStateAxios";
import { useState } from "react";

export const useCarState = function () {
  // 차량 더미 데이터
  const [cars, setCars] = useState([
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      carState: "도난",
    },
    {
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carName: "아반떼",
      carNumber: "89십1112",
      carState: "사용가능",
    },
    {
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
    {
      carName: "소나타",
      carNumber: "13십4151",
      carState: "수리/점검",
    },
  ]);

  // controller
  const cs = {};

  // getter
  cs.getCars = function () {
    return cars;
  };
  // setter
  cs.setCars = function (newCars) {
    setCars(newCars);
  };
  // 차량 리스트 조회
  cs.getCarList = function () {
    /* getCarList()
      .then((response) => {
        console.log("차량상태 / 차량조회 : ", response.data);
        const tmp = this.fillSix([...response.data]); // 6개보다 적다면 빈걸로 채워주기
        tmp.forEach((v) => (v.afterChange = v.carState)); // 모든 객체들에 afterChange 항목 추가
        this.setCars(tmp);
        setMaxPage(Math.ceil(tmp.length / 6)); // 최대 페이지 계산
        setSix(this.getPageCars(1)); // 1페이지 6개만 잘라서 저장
      })
      .catch((error) => {
        console.log("차량상태 / 차량조회에러 : ", error.response);
      }); 
    return cars*/
    const tmp = this.fillSix(cars);
    tmp.forEach((v) => (v.afterChange = v.carState));
    this.setCars(tmp);
    return cars;
  };
  // 선택 메뉴로 변경 함수
  cs.changeMenu = function (type, target, newMenu, index) {
    if (type === "title") {
      target.innerText = newMenu;
    } else {
      const tmp = [...cars];
      const after = {
        ...tmp[index],
        afterChange: newMenu, // 변화된 상태
      };
      tmp.splice(index, 1, after); // 바뀐 객체로 변경
      setCars(tmp);
      target.innerText = newMenu;
    }
  };
  // 특정 페이지의 6개 가져오기
  cs.getPageCars = function (page) {
    const pageCars = cars.slice((page - 1) * 6, page * 6);
    return pageCars;
  };
  // 비어있는 개수 채우기
  cs.fillSix = function (beforeSix) {
    const len = beforeSix.length;
    const tmp = [...beforeSix];
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        tmp.push({
          carName: "",
          carNumber: "",
          carState: "",
          afterChange: "",
        });
      }
    }
    return tmp;
  };
  // 차량 상태 저장
  cs.saveChange = function () {
    const newCars = [];
    cars.forEach((v) => {
      const tmpObj = { ...v, carState: v.afterChange }; // afterChange 로 carState 변경
      delete tmpObj.afterChange; // 서버에는 afterChange 사용 x
      newCars.push(tmpObj);
    });
    return newCars;
    /*saveChange(tmpCars)
      .then((response) => {
        console.log("차량상태 / 상태저장 : ", response.data);
        window.location.reload();
      })
      .catch((error) =>
        console.log("차량상태 / 상태저장에러 : ", error.response)
      );*/
  };
  // 차량 검색
  cs.searchCars = function (carNumber, menu) {
    const tmp = [...this.getCarList()];
    let res;
    // 필터링 or 검색
    if (carNumber === "") res = tmp.filter((v) => v.carState === menu);
    else res = tmp.filter((v) => v.carNumber === carNumber);
    this.setCars(res);
    return res;
  };

  return cs;
};
