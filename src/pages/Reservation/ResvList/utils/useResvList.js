import { useEffect, useState } from "react";

export const useResvList = function (maxRow) {
  const MAX_ROW = maxRow;

  // 더미 데이터 넣어둠, 나중에 서버에서 불러올 것
  const [resvs, setResvs] = useState([
    {
      nickname: "nickname1",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "startDate",
      endDate: "endDate",
    },
    {
      nickname: "nickname2",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "startDate",
      endDate: "endDate",
    },
    {
      nickname: "nickname3",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "startDate",
      endDate: "endDate",
    },
    {
      nickname: "nickname4",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "startDate",
      endDate: "endDate",
    },
    {
      nickname: "nickname5",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "startDate",
      endDate: "endDate",
    },
    {
      nickname: "nickname6",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "startDate",
      endDate: "endDate",
    },
  ]);

  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    // 리스트 서버에서 받아오는 코드

    setMaxPage(Math.ceil(resvs.length / MAX_ROW));
  }, []);

  const ctrl = {};

  ctrl.getMaxPage = function () {
    return maxPage;
  };

  ctrl.getPage = function (page) {
    const temp = resvs.slice((page - 1) * MAX_ROW, page * MAX_ROW);
    if (temp.length < MAX_ROW) {
      for (let start = temp.length; start < MAX_ROW; start++) {
        const nullObj = {};
        Object.keys(temp[0]).map((propName, idx) => (nullObj[propName] = null));
        temp.push(nullObj);
      }
    }
    return temp;
  };

  ctrl.findByNickname = function (nickname) {
    return resvs.filter((item, idx) => item.nickname === nickname);
  };

  return ctrl;
};

export default useResvList;
