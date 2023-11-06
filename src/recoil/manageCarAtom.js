import { atom, selector } from "recoil";

export const manageCarAtom = atom({
  key: "manageCarAtom",
  default: {
    type: "",
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
        eventDate: "",
        content: "",
      },
    ],
    accidents: [
      {
        title: "",
        eventDate: "",
        content: "",
      },
    ],
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

// 차량 기본 데이터 변경
export const changeDefaultSelector = selector({
  key: "changeDefaultSelector",
  get: ({ get }) => get(manageCarAtom),
  set: ({ set, get }, newDefault) => {
    const before = get(manageCarAtom);
    const tmp = {
      ...newDefault,
      type: before.type,
      oilType: before.oilType,
      carSize: before.carSize,
      releaseDate: before.releaseDate,
      createdAt: before.createdAt,
      transmission: before.transmission,
      maxPassenger: before.transmission,
      carBrand: before.carBrand,
      isKorean: before.isKorean,
      repairs: [...before.repairs],
      accidents: [...before.accidents],
    };
    set(manageCarAtom, tmp);
  },
});

// 차량 상세 데이터 변경
export const changeDetailSelector = selector({
  key: "changeDetailSelector",
  get: ({ get }) => get(manageCarAtom),
  set: ({ set, get }, newDetail) => {
    const before = get(manageCarAtom);
    const tmp = {
      ...newDetail,
      type: before.type,
      carName: before.carName,
      carNumber: before.carNumber,
      totalDistance: before.totalDistance,
      beforePrice: before.beforePrice,
      afterPrice: before.afterPrice,
      discountRate: before.discountRate,
      discountReason: before.discountReason,
      carDescription: before.carDescription,
      repairs: [...before.repairs],
      accidents: [...before.accidents],
    };
    set(manageCarAtom, tmp);
  },
});

// 차량 수리 데이터 변경
export const changeRepairSelector = selector({
  key: "changeRepairSelector",
  get: ({ get }) => get(manageCarAtom),
  set: ({ set, get }, newRepair) => {
    const before = get(manageCarAtom);
    const tmp = {
      ...before,
      repairs: [...newRepair],
    };
    set(manageCarAtom, tmp);
  },
});

// 차량 사고 데이터 변경
export const changeAccidentSelector = selector({
  key: "changeAccidentSelector",
  get: ({ get }) => get(manageCarAtom),
  set: ({ set, get }, newAccident) => {
    const before = get(manageCarAtom);
    const tmp = {
      ...before,
      accidents: [...newAccident],
    };
    set(manageCarAtom, tmp);
  },
});
