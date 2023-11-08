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
      carNumber: "12삼4567",
      rfid: "AA BB CC DD",
      keyState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      rfid: "AA BB CC DD",
      keyState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      rfid: "AA BB CC DD",
      keyState: "도난",
    },
    {
      carName: "그랜저 HG",
      carNumber: "12삼4567",
      rfid: "AA BB CC DD",
      keyState: "도난",
    },
    {
      carName: "아반떼",
      carNumber: "12삼4567",
      rfid: "AA BB CC DD",
      keyState: "여분키",
    },
    {
      carName: "아반떼",
      carNumber: "12삼4567",
      rfid: "AA BB CC DD",
      keyState: "여분키",
    },
    {
      carName: "아반떼",
      carNumber: "12삼4567",
      rfid: "AA BB CC DD",
      keyState: "여분키",
    },
    {
      carName: "아반떼",
      carNumber: "12삼4567",
      rfid: "AA BB CC DD",
      keyState: "여분키",
    },
    {
      carName: "아반떼",
      carNumber: "12삼4567",
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
  // 선택 메뉴로 변경 함수
  ku.changeMenu = function (type, target, newMenu, index) {
    if (type === "title") {
      target.innerText = newMenu;
    } else {
      const tmp = [...keys];
      const after = {
        ...tmp[index],
        afterChange: newMenu, // 변화된 상태
      };
      tmp.splice(index, 1, after); // 바뀐 객체로 변경
      setKeys(tmp);
      target.innerText = newMenu;
    }
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
  // 차 키 상태 저장
  ku.saveChange = function () {
    const newKeys = [];
    keys.forEach((v) => {
      const tmpObj = { ...v, keyState: v.afterChange }; // afterChange 로 carState 변경
      delete tmpObj.afterChange; // 서버에는 afterChange 사용 x
      newKeys.push(tmpObj);
    });
    return newKeys;
  };
  // 차량 검색
  ku.searchKeys = function (carNumber, menu) {
    const tmp = [...this.getKeyList()];
    let res;
    // 필터링 or 검색
    if (carNumber === "") res = tmp.filter((v) => v.keyState === menu);
    else res = tmp.filter((v) => v.carNumber === carNumber);
    this.setKeys(res);
    return res;
  };

  return ku;
};
