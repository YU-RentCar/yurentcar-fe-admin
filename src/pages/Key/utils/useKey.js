import { getKeyList, addKey, modifyKey, deleteKey } from "api/keyAxios";
import { useRecoilState } from "recoil";
import { keyInfoSelector } from "recoil/keyAtom";
import { useAlert } from "utils/useAlert";

export const useKey = function () {
  const [info, setInfo] = useRecoilState(keyInfoSelector); // 차 키 정보
  const alert = useAlert(); // alert 제어

  // controller
  const ku = {};

  // 차량 리스트 조회
  ku.getKeyList = function (adminUsername) {
    getKeyList(adminUsername)
      .then((response) => {
        console.log("키 / 키조회 : ", response.data);
        let tmp = [];
        [...response.data].forEach((v) => {
          tmp.push({
            ...v,
            state: v.keyState,
          });
        });
        tmp.sort((a, b) => a.keyId - b.keyId);
        setInfo({
          keys: [...tmp],
          maxPage: { num: Math.ceil(tmp.length / 6) },
        });
      })
      .catch((error) => console.log("키 / 키조회에러 : ", error.response));
  };
  // 특정 페이지의 6개 가져오기
  ku.getPageKeys = function (page) {
    const pageKeys = info.keys.slice((page - 1) * 6, page * 6);
    return pageKeys;
  };
  // 비어있는 개수 채우기
  ku.fillEmpty = function (beforeSix) {
    const len = beforeSix.length;
    const tmp = [...beforeSix];
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        tmp.push({
          carNumber: "",
          rfid: "",
          state: "",
          kioskId: -1,
          slotNumber: -1,
          keyId: -1,
        });
      }
    }
    return tmp;
  };
  // 차 키 추가
  ku.addKey = function (adminUsername, newKey) {
    addKey(adminUsername, { ...newKey })
      .then((response) => {
        console.log("키 / 키추가 : ", response.data);
        this.getKeyList(adminUsername);
      })
      .catch((error) => {
        console.log("키 / 키추가에러 : ", error.response);
        alert.onAndOff("키를 등록할 수 없습니다");
      });
  };
  // 차 키 검색
  ku.searchKey = function (adminUsername, carNumber, menu) {
    getKeyList(adminUsername)
      .then((response) => {
        console.log("키 / 키검색 : ", response.data);
        // 필터 검색
        if (carNumber === "") {
          const tmpArr = [];
          let tmp;
          [...response.data].forEach((v) => {
            const tmpObj = { ...v, state: v.keyState };
            delete tmpObj.keyState;
            tmpArr.push({ ...tmpObj });
          });
          if (menu !== "전체") {
          } else tmp = [tmpArr].filter((v) => v.state === menu);
          tmp.sort((a, b) => a.keyId - b.keyId);
          if (tmp.length)
            setInfo({
              keys: [...tmp],
              maxPage: { num: Math.ceil(tmp.length / 6) },
            });
          else alert.onAndOff("검색 결과 키가 없습니다");
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
            setInfo({
              keys: [...tmp],
              maxPage: { num: Math.ceil(tmp.length / 6) },
            });
          }
        }
      })
      .catch((error) => console.log("키 / 키검색에러 : ", error.response));
  };
  // 변경 정보 저장
  ku.modifyKey = function (adminUsername, newKey) {
    modifyKey(adminUsername, { ...newKey })
      .then((response) => {
        console.log("키 / 키변경 : ", response.data);
        this.getKeyList(adminUsername);
      })
      .catch((error) => {
        console.log("키 / 키변경에러 : ", error.response);
        alert.onAndOff("키 정보를 변경할 수 없습니다");
      });
  };
  // 차 키 삭제
  ku.deleteKey = function (adminUsername, keyId) {
    deleteKey(adminUsername, keyId)
      .then((response) => {
        console.log("키 / 키삭제 : ", response.data);
        this.getKeyList(adminUsername);
      })
      .catch((error) => console.log("키 / 키삭제에러 : ", error.response));
  };

  return ku;
};
