import { getCarList, saveChange } from "api/carStateAxios";
import { useRecoilState } from "recoil";
import { infoSelector } from "recoil/carStateAtom";
import { useAlert } from "utils/useAlert";

export const useCarState = function () {
  const [info, setInfo] = useRecoilState(infoSelector); // 차량 상태 정보
  const alert = useAlert(); // Alert 제어

  // controller
  const csu = {};

  // 서버로부터 리스트 가져오기
  csu.getCarList = function (adminUsername) {
    getCarList(adminUsername)
      .then((response) => {
        console.log("차량상태 / 차량조회 : ", response.data);
        const tmp = [...response.data];
        tmp.forEach((v) => (v.afterChange = v.carState)); // 변경 후의 상태 추가
        setInfo({ cars: [...tmp], maxPage: Math.ceil(tmp.length / 6) }); // 가져온 리스트와 최대 페이지 계산
      })
      .catch((error) =>
        console.log("차량상태 / 차량조회에러 : ", error.response)
      );
  };
  // 특정 페이지의 아이템들 가져오기
  csu.getPageItems = function (page) {
    const pageCars = info.cars.slice((page - 1) * 6, page * 6);
    return pageCars;
  };
  // 비어있는 개수 채우기
  csu.fillEmpty = function (before) {
    const len = before.length;
    const tmp = [...before];
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        tmp.push({
          carName: "",
          carNumber: "",
          carState: "",
          carId: -1,
          afterChange: "",
        });
      }
    }
    return tmp;
  };
  // 차량 검색
  csu.searchItems = function (carNumber, menu) {
    getCarList("first_admin")
      .then((response) => {
        // 필터 검색
        if (carNumber === "") {
          let tmp;
          if (menu === "전체") tmp = [...response.data]; // 전체
          else tmp = [...response.data].filter((v) => v.carState === menu); // 특정 상태 필터
          // 검색 결과 확인
          if (tmp.length === 0) alert.onAndOff("검색 결과 차량이 없습니다");
          else {
            // 검색 결과 반영
            tmp.forEach((v) => (v.afterChange = v.carState));
            setInfo({ cars: [...tmp], maxPage: Math.ceil(tmp.length / 6) });
          }
        }
        // 차량 번호 검색
        else {
          const tmp = [...response.data].filter(
            (v) => v.carNumber === carNumber
          ); // 특정 차량 검색
          // 검색 결과 확인
          if (tmp.length === 0) alert.onAndOff("검색 결과 차량이 없습니다");
          else {
            // 검색 결과 반영
            tmp.forEach((v) => (v.afterChange = v.carState));
            setInfo({
              cars: [...tmp],
              maxPage: Math.ceil(tmp.length / 6),
            });
          }
        }
      })
      .catch((error) => {
        console.log("차량상태 / 차량검색에러 : ", error.response);
      });
  };
  // 변경된 상태값 서버로 전송
  csu.saveChange = async function (adminUsername) {
    await info.cars.forEach((v) => {
      // 상태의 변경이 있는 경우
      if (v.afterChange !== v.carState) {
        const tmp = { carId: v.carId, carState: v.afterChange };
        // 서버로 전송
        saveChange(adminUsername, { ...tmp })
          .then((response) =>
            console.log("차량상태 / 상태변경 : ", response.data)
          )
          .catch((error) => console.log(error.response));
      }
    })();
    // 변경되었으니 리스트 업데이트
    this.getCarList(adminUsername);
  };

  return csu;
};
