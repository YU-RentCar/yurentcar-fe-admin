import dayjs from "dayjs";
import { atom, selector } from "recoil";

export const manageCarAtom = atom({
  key: "manageCarAtom",
  default: {
    carName: "",
    carNumber: "",
    totalDistance: "",
    beforePrice: 0,
    afterPrice: 0,
    discountRate: 0,
    discountReason: "",
    carDescription: "",
    oilType: "",
    carSize: "",
    releaseDate: "",
    createdAt: "",
    transmission: "",
    maxPassenger: 0,
    carBrand: "",
    isKorean: true,
    repairs: [
      {
        title: "",
        eventDate: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
        content: "",
      },
    ],
    accidents: [
      {
        title: "",
        eventDate: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
        content: "",
      },
    ],
    type: "",
    isModified: false,
  },
});

// type 변경
export const changeTypeSelector = selector({
  key: "changeTypeSelector",
  get: ({ get }) => get(manageCarAtom),
  set: ({ set, get }, newType) => {
    const before = get(manageCarAtom);
    const tmp = {
      ...before,
      type: newType,
    };
    set(manageCarAtom, tmp);
  },
});

// 정보 초기화
export const clearInfoSelector = selector({
  key: "clearInfoSelector",
  get: ({ get }) => get(manageCarAtom),
  set: ({ set, get }) => {
    const tmp = {
      carName: "",
      carNumber: "",
      totalDistance: "",
      beforePrice: 0,
      afterPrice: 0,
      discountRate: 0,
      discountReason: "",
      carDescription: "",
      oilType: "",
      carSize: "",
      releaseDate: "",
      createdAt: "",
      transmission: "",
      maxPassenger: 0,
      carBrand: "",
      isKorean: true,
      repairs: [
        {
          title: "",
          eventDate: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
          content: "",
        },
      ],
      accidents: [
        {
          title: "",
          eventDate: dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
          content: "",
        },
      ],
      type: "add",
    };
    set(manageCarAtom, tmp);
  },
});

// 일부 데이터 변경
export const changeInfoSelector = selector({
  key: "changeInfoSelector",
  get: ({ get }) => get(manageCarAtom),
  set: ({ set, get }, newInfo) => {
    const before = get(manageCarAtom);
    const tmp = { ...before };
    Object.keys(newInfo).forEach((v) => (tmp[v] = newInfo[v]));
    set(manageCarAtom, tmp);
  },
});
