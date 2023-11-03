const option = {
  sidewalk: "인도",
  driveway: "차도",
  parking_available: "주차 가능",
  parking_disable: "주차 불가능",
  인도: "sidewalk",
  차도: "driveway",
  "주차 가능": "parking_available",
  "주차 불가능": "parking_disable",

  korToEng: function (name) {
    return option[name];
  },

  engToKor: function (name) {
    return option[name];
  },
};

export default option;
