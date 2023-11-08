import { useState } from "react";

export const useKey = function () {
  // 차 키 더미 데이터
  const [keys, setKeys] = useState([
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      rfid: "AA BB CC DD",
      keyState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "22삼4567",
      rfid: "AA BB CC DD",
      keyState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "32삼4567",
      rfid: "AA BB CC DD",
      keyState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "42삼4567",
      rfid: "AA BB CC DD",
      keyState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "52삼4567",
      rfid: "AA BB CC DD",
      keyState: "도난",
    },
    {
      carName: "아반떼",
      carNumber: "62삼4567",
      rfid: "AA BB CC DD",
      keyState: "여분키",
    },
    {
      carName: "아반떼",
      carNumber: "72삼4567",
      rfid: "AA BB CC DD",
      keyState: "여분키",
    },
    {
      carName: "아반떼",
      carNumber: "82삼4567",
      rfid: "AA BB CC DD",
      keyState: "여분키",
    },
    {
      carName: "아반떼",
      carNumber: "92삼4567",
      rfid: "AA BB CC DD",
      keyState: "여분키",
    },
    {
      carName: "아반떼",
      carNumber: "102삼4567",
      rfid: "AA BB CC DD",
      keyState: "여분키",
    },
  ]);

  // controller
  const ku = {};

  // getter
  ku.getKeys = function () {
    return keys;
  };
  // setter
  ku.setKeys = function (newKeys) {
    setKeys(newKeys);
  };
  // 차량 리스트 조회
  ku.getKeyList = function () {
    const tmp = this.fillSix(keys);
    tmp.forEach((v) => (v.afterChange = v.keyState));
    this.setKeys(tmp);
    return tmp;
  };
  // 특정 페이지의 6개 가져오기
  ku.getPageKeys = function (page) {
    const pageKeys = keys.slice((page - 1) * 6, page * 6);
    return pageKeys;
  };
  // 비어있는 개수 채우기
  ku.fillSix = function (beforeSix) {
    const len = beforeSix.length;
    const tmp = [...beforeSix];
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        tmp.push({
          carName: "",
          carNumber: "",
          rfid: "",
          keyState: "",
        });
      }
    }
    return tmp;
  };
  // 변경 정보 저장
  ku.saveChange = function () {
    const newKeys = [];
    keys.forEach((v) => {
      const tmpObj = { ...v, keyState: v.afterChange }; // afterChange 로 carState 변경
      delete tmpObj.afterChange; // 서버에는 afterChange 사용 x
      newKeys.push(tmpObj);
    });
    return newKeys;
  };
  // 특정 차 키 정보 변경
  ku.changeInfo = function (page, idx, newKey) {
    const tmp = [...keys];
    tmp.splice((page - 1) * 6 + idx, 1, { ...newKey });
    this.setKeys(tmp);
    return tmp;
  };
  // 차 키 검색
  ku.searchKeys = function (carNumber, menu) {
    const tmp = [...this.getKeyList()];
    let res;
    // 필터링 or 검색
    if (carNumber === "") res = tmp.filter((v) => v.keyState === menu);
    else res = tmp.filter((v) => v.carNumber === carNumber);
    this.setKeys(res);
    return res;
  };
  // 차 키 삭제
  ku.deleteKey = function (target) {
    const tmp = [...keys];
    const idx = tmp.findIndex((key) => key.carNumber === target.carNumber);
    tmp.splice(idx, 1);
    this.setKeys(tmp);
    return tmp;
  };

  return ku;
};
