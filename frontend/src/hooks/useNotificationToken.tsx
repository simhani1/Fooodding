import { removeNotificationToken, saveNotificationToken } from "@api/fcm-api";
import { requestForToken } from "firebase";
import { useCallback, useState } from "react";

export function useNotificiationToken() {
	const [token, setToken] = useState<string>("");

	const saveToken = useCallback(async () => {
		try {
			const permission = await Notification.requestPermission();
			if (permission !== "granted") return;
			const newToken = await requestForToken();

			if (newToken) {
				setToken(newToken);
				await saveNotificationToken(newToken);
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	const deleteToken = useCallback(async () => {
		try {
			if (token) {
				setToken("");
				await removeNotificationToken();
			}
		} catch (error) {
			console.error(error);
		}
	}, [token]);

	return { token, saveToken, deleteToken };
}
