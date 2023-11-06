import { atom, selector } from "recoil";

export const reservationAtom = atom({
  key: "reservationAtom",
  default: {
    nickname: null,
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
  },
});

export const selectedInfoAtom = atom({
  key: "selectedInfoAtom",
  default: {
    nickname: null,
    resvID: null,
    carNumber: "",
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  },
});

export const nicknameSelector = selector({
  key: "nicknameSelector",
  get: ({ get }) => get(reservationAtom).nickname,
  set: ({ set }, newValue) => {
    set(reservationAtom, {
      ...reservationAtom,
      nickname: newValue,
    });
  },
});

const startDateTimeSelector = selector({
  key: "startDateTimeSelector",
  get: ({ get }) => {
    const startDate = get(reservationAtom).startDate;
    const startTime = get(reservationAtom).startTime;
    return { startDate: startDate, startTime: startTime };
  },
  set: ({ set }, { startDate, startTime }) => {
    set(reservationAtom, {
      ...reservationAtom,
      startDate: startDate,
      startTime: startTime,
    });
  },
});

const endDateTimeSelector = selector({
  key: "endDateTimeSelector",
  get: ({ get }) => {
    const endDate = get(reservationAtom).endDate;
    const endTime = get(reservationAtom).endTime;
    return { endDate: endDate, endTime: endTime };
  },
  set: ({ set }, { endDate, endTime }) => {
    set(reservationAtom, {
      ...reservationAtom,
      endDate: endDate,
      endTime: endTime,
    });
  },
});
