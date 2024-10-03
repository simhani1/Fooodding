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
	foodTruckName?: string;
}

export interface UserWaitingImgProps {
	isCancelable: boolean;
}

export interface IOrderingProps {
	callTime: number;
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
