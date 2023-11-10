import api from "./interceptors";

/*
/reservations/branch?isDone=false&adminUsername={관리자이메일}
params
  isDone: boolean(false)
  adminUsername: String

[
	{
		nickname : "닉네임" // 닉네임
		reservationID : 12345 // 예약 번호 (이메일로 받는)
		carNumber : "12삼4567" // 차량 번호
    startDate : ""
    endDate : ""
	},
	...
]
*/

// 지점에 걸려있는 예약들을 불러오는 API
export const getResvList = () => {
  return api({
    url: "/reservations/branch",
    method: "get",
    params: { isDone: false, adminUsername: "" },
  });
};

/* 
get
/branches/cars/updatable?adminUsername={관리자이메일}&reservationId={예약id}&startDate={}&endDate={}

params
  adminUsername: String
  reservationId: Long
  startDate: 
  endDate: 

[
	{
		carName : “토레스”
		carNumber : "12삼4567" // 차량 번호
	}, 
...
]
*/

// 예약 변경되는 차량 리스트 요청
export const getChangeableCarList = () => {
  return api({
    url: "/branches/cars/updatable",
    method: "get",
    params: {
      adminUsername: "",
      reservationId: "",
      startDate: "",
      endDate: "",
    },
  });
};

/* 
patch

/reservations/:reservationId?adminUsername={관리자이메일}

{
	startDate : "2023-06-06T16:17:40"
	endDate : "2023-06-06T16:17:40"
	carNumber : "12삼4567"
}

bool
*/

// 예약 변경 요청
export const patchReservation = () => {
  return api({
    url: "/reservations/:reservationId",
    params: {
      adminUsername: "",
    },
    data: {
      startDate: "",
      endDate: "",
      carNumber: "",
    },
  });
};
