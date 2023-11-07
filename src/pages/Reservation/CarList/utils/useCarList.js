import { useEffect, useState } from "react";

export const useCarList = function (maxRow) {
  const MAX_ROW = maxRow;

  // 더미 데이터 넣어둠, 나중에 서버에서 불러올 것
  const [cars, setCars] = useState([
    {
      carName: "콤부차",
      carNumber: "12삼3456",
    },
    {
      carName: "녹차",
      carNumber: "12삼3456",
    },
    {
      carName: "보이차",
      carNumber: "12삼3456",
    },
    {
      carName: "옥수수차",
      carNumber: "12삼3456",
    },
    {
      carName: "커피콩차",
      carNumber: "12삼3456",
    },
    {
      carName: "좋았어! 영차!",
      carNumber: "12삼3456",
    },
    {
      carName: "좋았어! 영차!",
      carNumber: "12삼3456",
    },
    {
      carName: "좋았어! 영차!",
      carNumber: "12삼3456",
    },
  ]);

  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    // 리스트 서버에서 받아오는 코드

    setMaxPage(Math.ceil(cars.length / MAX_ROW));
  }, []);

  const ctrl = {};

  ctrl.getMaxPage = function () {
    return maxPage;
  };

  ctrl.getPage = function (page) {
    const temp = cars.slice((page - 1) * MAX_ROW, page * MAX_ROW);
    if (temp.length < MAX_ROW) {
      for (let start = temp.length; start < MAX_ROW; start++) {
        const nullObj = {};
        Object.keys(temp[0]).map((propName, idx) => (nullObj[propName] = null));
        temp.push(nullObj);
      }
    }
    return temp;
  };

  ctrl.findByCarName = function (carName) {
    return cars.filter((item, idx) => item.carName === carName);
  };

  return ctrl;
};

export default useCarList;
