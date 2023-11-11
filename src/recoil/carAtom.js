import { atom, selector } from "recoil";

export const carAtom = atom({
  key: "carAtom",
  default: {
    cars: [
      {
        carName: "",
        carNumber: "",
        carState: "",
        carId: -1,
      },
    ], // 차량 리스트
    maxPage: { num: 0 }, // 최대 페이지
    page: 0, // 현재 페이지
    deleteTarget: "", // 삭제할 차량 id
  },
});

export const carInfoSelector = selector({
  key: "carInfoSelector",
  get: ({ get }) => get(carAtom),
  set: ({ set, get }, newInfo) => {
    const before = { ...get(carAtom) };
    const tmp = Object.keys(newInfo);
    tmp.forEach((v) => (before[v] = newInfo[v]));
    set(carAtom, before);
  },
});
