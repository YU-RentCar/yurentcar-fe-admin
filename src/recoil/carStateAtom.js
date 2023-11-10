import { atom, selector } from "recoil";

export const carStateAtom = atom({
  key: "carStateAtom",
  default: {
    cars: [
      {
        carName: "",
        carNumber: "",
        carState: "",
        carId: -1,
      },
    ], // 차량 리스트
    maxPage: 0, // 최대 페이지
    page: 0, // 현재 페이지
    filterMenu: ["전체", "사용가능", "수리/점검중", "도난"], // 검색 필터 메뉴
    stateMenu: ["사용가능", "수리/점검중", "도난"], // 상태 메뉴
  },
});

export const infoSelector = selector({
  key: "infoSelector",
  get: ({ get }) => get(carStateAtom),
  set: ({ set, get }, newInfo) => {
    const before = { ...get(carStateAtom) };
    const tmp = Object.keys(newInfo);
    tmp.forEach((v) => (before[v] = newInfo[v]));
    set(carStateAtom, before);
  },
});
