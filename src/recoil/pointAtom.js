import { atom, selector } from "recoil";

export const pointAtom = atom({
  key: "pointAtom",
  default: {
    nickname: "임시 닉네임",
    point: 0,
    records: [
      {
        price: 10000,
        reason: "nickname1",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: -10000,
        reason: "nickname2",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: +20000,
        reason: "nickname3",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: -20000,
        reason: "nickname4",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: 30000,
        reason: "nickname5",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: -30000,
        reason: "nickname6",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: 40000,
        reason: "nickname7",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: -40000,
        reason: "nickname8",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: 50000,
        reason: "nickname9",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: -50000,
        reason: "nickname10",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: 60000,
        reason: "nickname11",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: -60000,
        reason: "nickname12",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: 70000,
        reason: "nickname13",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: -70000,
        reason: "nickname14",
        createdTime: "2023-01-01T09:00:00",
      },
      {
        price: 80000,
        reason: "nickname15",
        createdTime: "2023-01-01T09:00:00",
      },
    ],
  },
});

// 유저 정보 변경
export const userInfoSelector = selector({
  key: "userInfoSelector",
  get: ({ get }) => {
    const user = get(pointAtom);
    return {
      nickname: user.nickname,
      point: user.point,
    };
  },
  set: ({ set, get }, newInfo) => {
    const before = get(pointAtom);
    const tmp = {
      ...before,
      nickname: newInfo.nickname,
      point: newInfo.point,
    };
    set(pointAtom, tmp);
  },
});

// 내역 변경
export const changeRecordsSelector = selector({
  key: "changeRecordsSelector",
  get: ({ get }) => get(pointAtom).records,
  set: ({ set, get }, newRecords) => {
    const before = get(pointAtom);
    const tmp = {
      ...before,
      records: [...newRecords],
    };
    set(pointAtom, tmp);
  },
});
