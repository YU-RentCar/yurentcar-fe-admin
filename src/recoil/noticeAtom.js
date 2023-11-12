import { atom, selector } from "recoil";

export const noticeAtom = atom({
  key: "noticeAtom",
  default: {
    notices: [
      {
        noticeId: -1,
        photoUrl: "",
        title: "",
        description: "",
        startDate: "",
        finishDate: "",
        modifiedAt: "",
      },
    ], // 공지사항 리스트
    maxPage: { num: 0 }, // 최대 페이지
    page: 0, // 현재 페이지
    deleteTarget: "", // 삭제할 차량 id
  },
});

export const noticeInfoSelector = selector({
  key: "noticeInfoSelector",
  get: ({ get }) => get(noticeAtom),
  set: ({ set, get }, newInfo) => {
    const before = { ...get(noticeAtom) };
    const tmp = Object.keys(newInfo);
    tmp.forEach((v) => (before[v] = newInfo[v]));
    set(noticeAtom, before);
  },
});
