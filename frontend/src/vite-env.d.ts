/// <reference types="vite/client" />

//아래 코드 추가하기
declare global {
	interface Window {
		kakao: {
			maps: {
				load: (callback: () => void) => void;
				Map: any; // 다른 필요한 타입들도 여기에 추가
			};
		};
	}
}

export {};
