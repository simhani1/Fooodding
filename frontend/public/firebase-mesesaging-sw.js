const { default: firebase } = require("firebase/compat/app");

importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

let firebaseConfig = null;

self.addEventListener("message", (event) => {
	if (event.data && event.data.type === "FIREBASE_CONFIG") {
		firebaseConfig = event.data.config;
		initializeFirebase();
	}
});

function initializeFirebase() {
	if (firebaseConfig) {
		firebase.initializeApp(firebaseConfig);
		const messaging = firebase.messaging();

		messaging.onBackgroundMessage((payload) => {
			console.log(payload);
		});
	} else {
		console.error("Firebase configuration not received");
	}
}
