const { atom, selector } = require("recoil");

export const adminAtom = atom({
  key: "adminAtom",
  default: {
    branchId: -1,
    branchName: "",
    province: "",
    adminUsername: "",
  },
});

export const adminSelector = selector({
  key: "adminSelector",
  get: ({ get }) => get(adminAtom),
  set: ({ set }, newInfo) => {
    const tmp = {
      ...newInfo,
    };
    set(adminAtom, tmp);
  },
});
