//user
export interface IWaitingInfo {
	waitingId: number;
	isCancelable: boolean; //취소 가능한지
	number: number;
	rank: number; //내 앞에 몇 명
	changedAt: number;
}

export interface IWaitingProps {
	waitingInfo: IWaitingInfo;
	foodTruckId: number;
}

export interface UserWaitingImgProps {
	isCancelable: boolean;
}

export interface IOrderingProps {
	callTime: number;
}

//owner
export interface IWaiting {
	waitingId: number;
	userName: string;
	number: number;
	changedAt: string;
}

export interface IWaitingOwnerProps {
	waiting: IWaiting;
	children: JSX.Element;
	isOrder: boolean;
	onCancel: (waitingId: number) => void;
}
