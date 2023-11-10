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

export const getResvList = () => {
  return api({
    url: "/reservations/branch",
    method: "get",
    params: { isDone: false, adminUsername: "" },
  });
};
