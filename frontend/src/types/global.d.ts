/// <reference types="vite/client" />

declare global {
	interface Window {
		kakao: typeof kakao;
	}
}

declare module "*.json" {
	const value: any;
}

export {}; // 모듈로 인식되도록 함
