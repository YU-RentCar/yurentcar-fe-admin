const { atom } = require("recoil");

export const adminAtom = atom({
  key: "adminAtom",
  default: {
    branchId: 1,
    branchName: "서울대지점",
    province: "서울",
    adminUsername: "first_admin",
  },
});
