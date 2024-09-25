export interface IWaitingInfo {
	waitingNumber: number;
	peopleNumber: number;
	isWaiting: boolean;
	isOrdering: boolean;
}

export interface IWaitingProps {
	waitingInfo: IWaitingInfo;
}

export interface IOrderingProps {
	callTime: string;
}
