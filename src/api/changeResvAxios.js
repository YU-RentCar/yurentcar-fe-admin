import api from "./interceptors";

// 지점에 걸려있는 예약들을 불러오는 API
export const getResvList = (adminUsername) => {
  return api({
    url: "/reservations/branch",
    method: "get",
    params: { isDone: false, adminUsername: adminUsername },
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
export const getChangeableCarList = (adminUsername, resvId, dateInfo) => {
  return api({
    url: "/branches/cars/updatable",
    method: "get",
    params: {
      adminUsername: adminUsername,
      reservationId: resvId,
      startDate: dateInfo.startDate,
      endDate: dateInfo.endDate,
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
export const patchReservation = (adminUsername, resvInfo) => {
  return api({
    url: `/reservations/${resvInfo.reservationId}`,
    method: "patch",
    params: {
      adminUsername: adminUsername,
    },
    data: {
      startDate: resvInfo.startDate,
      endDate: resvInfo.endDate,
      carNumber: resvInfo.carNumber,
    },
  });
};
