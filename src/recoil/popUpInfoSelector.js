import { atom, atomFamily } from "recoil";

export const popUpInfoSelector = atomFamily({
  key: "popUpInfoSelector",
  default: (popUpKey) =>
    atom({
      key: `popUpInfoSelector/${popUpKey}`,
      default: {
        isShow: false,
      },
    }),
});
