import { atom, selector } from "recoil";

export const pointAtom = atom({
  key: "pointAtom",
  default: {
    nickname: "",
    point: 0,
    records: [
      {
        price: 10000,
        reason: "nickname1",
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
