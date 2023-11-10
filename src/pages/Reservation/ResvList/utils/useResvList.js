import { getResvList } from "api/resvListAxios";
import { useEffect, useState } from "react";

export const useResvList = function (maxRow) {
  // 한 페이지의 최대 row
  const MAX_ROW = maxRow;

  // 더미 데이터 넣어둠, 나중에 서버에서 불러올 것
  const [resvs, setResvs] = useState([
    {
      nickname: "nickname1",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "2023-01-01T11:30:00",
      endDate: "2023-01-02T11:30:00",
    },
    {
      nickname: "nickname2",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "2023-01-01T11:30:00",
      endDate: "2023-01-02T11:30:00",
    },
    {
      nickname: "nickname3",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "2023-01-01T11:30:00",
      endDate: "2023-01-02T11:30:00",
    },
    {
      nickname: "nickname4",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "2023-01-01T11:30:00",
      endDate: "2023-01-02T11:30:00",
    },
    {
      nickname: "nickname5",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "2023-01-01T11:30:00",
      endDate: "2023-01-02T11:30:00",
    },
    {
      nickname: "nickname6",
      resvID: 12345,
      carNumber: "12삼4567",
      startDate: "2023-01-01T11:30:00",
      endDate: "2023-01-02T11:30:00",
    },
  ]);

  // 최대 페이지 수
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    // 리스트 서버에서 받아오는 코드
    // getResvList()
    //   .then((response) => {
    //     setResvs(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("지점에 걸려있는 예약들을 받아오지 못했다");
    //   });

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
        const nullObj = {
          nickname: null,
          resvID: null,
          carNumber: null,
          startDate: null,
          endDate: null,
        };

        temp.push(nullObj);
      }
    }
    return temp;
  };

  ctrl.findByNickname = function (nickname) {
    const temp = resvs.filter((item, idx) => item.nickname === nickname);
    if (temp.length < MAX_ROW) {
      for (let start = temp.length; start < MAX_ROW; start++) {
        const nullObj = {
          nickname: null,
          resvID: null,
          carNumber: null,
          startDate: null,
          endDate: null,
        };

        temp.push(nullObj);
      }
    }
    return temp;
  };

  return ctrl;
};

export default useResvList;
