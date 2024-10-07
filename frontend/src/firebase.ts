import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const FIREBASE_VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// FCM 클라이언트 토큰을 요청하고 받아오는 메서드
export const requestForToken = () => {
	return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
		.then((currentToken) => {
			if (currentToken) {
				return currentToken;
			} else {
				console.log("FCM 관련 토큰이 없습니다.");
				return null;
			}
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
};

// 포그라운드에서 메시지 수신을 위한 함수
// 메시지 수신 시 추가적인 로직(상태 업데이트 등)이 필요하다면 유용한 코드
export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			console.log("Payload received in onMessageListener: ", payload);
			resolve(payload);
		});
	});

// 서비스 워커 등록 및 설정 전달 함수
export const registerServiceWorker = () => {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
			.register("/firebase-messaging-sw.js")
			.then((registration) => {
				console.log(registration.scope);

				if (registration.active) {
					registration.active.postMessage({
						type: "FIREBASE_CONFIG",
						config: firebaseConfig,
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}
};

registerServiceWorker();
