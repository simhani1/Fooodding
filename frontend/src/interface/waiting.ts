//user
export interface IWaitingInfo {
	id: number;
	name: string;
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

//owner
export interface IWaitingLine {
	id: number;
	nickname: string;
	waitingNumber: number;
	time: string;
}

export interface IWaitingOrder {
	id: number;
	nickname: string;
	waitingNumber: number;
	time: string;
}

export interface IWaitingOwnerProps {
	id: number;
	nickname: string;
	waitingNumber: number;
	time: string;
	children: JSX.Element;
}
