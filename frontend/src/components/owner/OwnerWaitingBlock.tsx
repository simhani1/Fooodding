import { IWaitingOwnerProps } from "@interface/waiting";

const OwnerWaitingBlock = ({ nickname, waitingNumber, time, children }: IWaitingOwnerProps) => {
	return (
		<div className="flex items-center justify-between px-6 py-4 mx-2 my-8 rounded-lg shadow-sm">
			<h2 className="text-xl font-extrabold text-boss">{waitingNumber}번</h2>

			<div className="text-center">
				<p className="mb-2 text-xl font-bold">{nickname} 님</p>
				<span className="text-gray">{time}</span>
			</div>

			<div>{children}</div>
		</div>
	);
};

export default OwnerWaitingBlock;
