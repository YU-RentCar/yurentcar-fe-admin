import { atom } from "recoil";

// 변경될 사항에 대해서 미리 기입해두는 atom
export const altResvAtom = atom({
  key: "altResvAtom",
  default: {
    nickname: null,
    carNumber: null,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  },
});

// 기존 예약에 대해서 기입해두는 atom
export const prevResvAtom = atom({
  key: "prevResvAtom",
  default: {
    resvID: null,
    nickname: null,
    carNumber: "",
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  },
});
