import { AxiosError, AxiosResponse } from "axios";

// 서버에서 오는 에러 응답 타입 정의
export interface CustomErrorResponse {
	code: string;
	data: any;
	isSuccess: boolean;
	message: string;
}

// AxiosError를 확장하여 커스텀 에러 인터페이스 정의
export interface CustomAxiosError extends AxiosError<CustomErrorResponse> {
	response?: AxiosResponse<CustomErrorResponse>;
}

// 에러가 커스텀 AxiosError인지 확인하는 타입 가드
export function isCustomAxiosError(error: unknown): error is CustomAxiosError {
	return error instanceof AxiosError && error.response !== undefined && error.response.data !== undefined;
}
