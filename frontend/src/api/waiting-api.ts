import axiosInstance from "@api/axiosInstance";
import { ApiResponse, INoResponseDTO, ITruckWaitingListInfoDTO, IWaitingResponseDTO } from "@interface/api";
import { EventSourcePolyfill } from "event-source-polyfill";

const path = "/waiting";

//유저의 예약하기
export const reserveTruckWaiting = (foodTruckId: number): ApiResponse<INoResponseDTO> => {
	return axiosInstance.post(`${path}/users`, null, {
		params: {
			"ft-id": foodTruckId,
		},
	});
};

//유저의 예약취소
export const cancelWaiting = (foodTruckId: number, waitingId: number): ApiResponse<INoResponseDTO> => {
	return axiosInstance.delete(`${path}/users/${foodTruckId}/${waitingId}`);
};

//유저의 푸드트럭 예약 리스트 조회
export const getMyWaitingList = (): ApiResponse<ITruckWaitingListInfoDTO> => {
	return axiosInstance.get(`${path}/users`);
};

// SSE 연결
export const connectSse = (foodTruckId: number) => {
	return new EventSourcePolyfill(`${import.meta.env.VITE_BASE_URL}${path}/owners/${foodTruckId}`, {
		headers: {
			Authorization: `${localStorage.getItem("token")}`,
		},
		withCredentials: true,
	});
	// 원래 위에 함수를 사용해야 합니다. OwnerOpening에서 푸드트럭 ID를 OwnerWaiting으로 넘길 수 있게 되면 수정하면 됩니다.

	// return new EventSourcePolyfill(`${import.meta.env.VITE_BASE_URL}${path}/foodtrucks/1/sse`, {
	// 	headers: {
	// 		Authorization: `${localStorage.getItem("token")}`,
	// 	},
	// 	withCredentials: true,
	// });
};

//주문 수락
export const acceptReservation = (waitingId: number): ApiResponse<IWaitingResponseDTO> => {
	return axiosInstance.patch(`${path}/${waitingId}`);
};

// 주문 완료
export const completeReservation = (waitingId: number) => {
	return axiosInstance.delete(`${path}/owners/${waitingId}`, {
		params: {
			"waiting-id": waitingId,
			"is-completed": true,
		},
	});
};

// 주문 취소
export const cancelReservation = (waitingId: number) => {
	return axiosInstance.delete(`${path}/owners/${waitingId}`, {
		params: {
			"waiting-id": waitingId,
			"is-completed": false,
		},
	});
};
