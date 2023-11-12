import api from "api/interceptors";

/* 차 키 조회 */
export const getKeyList = (adminUsername) => {
  return api({
    url: "/branches/cars/keys/management",
    method: "get",
    params: { adminUsername: adminUsername },
  });
};

/* 차 키 추가 */
export const addKey = (adminUsername, newKey) => {
  return api({
    url: "/branches/cars/keys",
    method: "post",
    params: { adminUsername: adminUsername },
    data: {
      carNumber: newKey.carNumber,
      rfid: newKey.rfid,
      kioskId: newKey.kioskId,
      slotNumber: newKey.slotNumber,
      state: newKey.state,
    },
  });
};

/* 차 키 변경 */
export const modifyKey = (adminUsername, newKey) => {
  return api({
    url: "/branches/cars/keys",
    method: "patch",
    params: { adminUsername: adminUsername },
    data: {
      carNumber: newKey.carNumber,
      rfid: newKey.rfid,
      kioskId: newKey.kioskId,
      slotNumber: newKey.slotNumber,
      state: newKey.state,
      keyId: newKey.keyId,
    },
  });
};

/* 차 키 삭제 */
export const deleteKey = (adminUsername, keyId) => {
  return api({
    url: "/branches/cars/keys",
    method: "delete",
    params: { adminUsername: adminUsername, keyId: keyId },
  });
};
