import { atom, selector } from "recoil";

export const keyAtom = atom({
  key: "keyAtom",
  default: {
    keys: [
      {
        carNumber: "",
        rfid: "",
        kioskId: -1,
        slotNumber: -1,
        state: "",
        keyId: -1,
      },
    ], // 차량 리스트
    maxPage: { num: 0 }, // 최대 페이지
    page: 0, // 현재 페이지
    deleteTarget: "", // 삭제할 키 id
    filterMenu: ["전체", "마스터키", "사용중", "여분키", "도난"], // 검색 필터
    stateMenu: ["마스터키", "사용중", "여분키", "도난"], // 차 키 상태
    addOrModify: false, // 추가 혹은 수정
  },
});

export const keyInfoSelector = selector({
  key: "keyInfoSelector",
  get: ({ get }) => get(keyAtom),
  set: ({ set, get }, newInfo) => {
    const before = { ...get(keyAtom) };
    const tmp = Object.keys(newInfo);
    tmp.forEach((v) => (before[v] = newInfo[v]));
    set(keyAtom, before);
  },
});
