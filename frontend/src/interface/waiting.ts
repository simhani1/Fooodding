//user
export interface IWaitingInfo {
	waitingId: number;
	isCancelable: boolean; //취소 가능한지
	number: number;
	rank: number; //내 앞에 몇 명
	changedAt: number;
}

export interface IWaitingProps {
	number: number;
	foodTruckName?: string;
	foodTruckId?: number;
}

export interface IUserWaitingProps {
	waitingInfo: IWaitingInfo;
	foodTruckId: number;
}

export interface UserWaitingImgProps {
	isCancelable: boolean;
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
}
