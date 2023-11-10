import { useEffect, useState } from "react";
import { getChangeableCarList } from "api/changeResvAxios";

export const useCarList = function (maxRow) {
  // 최대 칸 수
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
      carName: "녹차",
      carNumber: "12삼3456",
    },
    {
      carName: "녹차",
      carNumber: "12삼3456",
    },
    {
      carName: "녹차",
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

  const [curPage, setCurPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    // 리스트 서버에서 받아오는 코드
    // getChangeableCarList()
    // .then((response) => {
    //   setCars(response)
    // })
    // .catch((error) => {
    //   console.log("변경할 수 있는 차량의 리스트 불러오지 못함")
    // })

    setMaxPage(Math.ceil(cars.length / MAX_ROW));
  }, []);

  // 컨트롤러
  const ctrl = {};

  // 현재 페이지
  ctrl.getCurPage = function () {
    return curPage;
  };

  ctrl.toNextPage = function () {
    if (curPage === maxPage) return;
    setCurPage(curPage + 1);
  };

  ctrl.toPrevPage = function () {
    if (curPage === 1) return;
    setCurPage(curPage - 1);
  };

  // 최대 페이지
  ctrl.getMaxPage = function () {
    return maxPage;
  };

  ctrl.getPage = function (list = cars) {
    // 만약 현재 페이지가 최대 페이지보다 크면, 마지막 페이지로 고정
    if (curPage >= Math.ceil(list.length / MAX_ROW)) {
      setCurPage(Math.ceil(list.length / MAX_ROW));
    }

    setMaxPage(Math.ceil(list.length / MAX_ROW));

    const temp = list.slice((curPage - 1) * MAX_ROW, curPage * MAX_ROW);

    // 빈공간 채움
    if (temp.length < MAX_ROW) {
      for (let start = temp.length; start < MAX_ROW; start++) {
        const nullObj = {
          carName: null,
          carNumber: null,
        };
        temp.push(nullObj);
      }
    }
    return temp;
  };

  // 검색
  ctrl.findByCarName = function (carName) {
    return ctrl.getPage(cars.filter((item, idx) => item.carName === carName));
  };

  return ctrl;
};

export default useCarList;
