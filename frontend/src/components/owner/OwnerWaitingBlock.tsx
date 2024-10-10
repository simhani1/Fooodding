import { IWaitingOwnerProps } from "@interface/waiting";

const OwnerWaitingBlock = ({ waiting, children }: IWaitingOwnerProps) => {
	return (
		<div className="flex items-center justify-between px-6 py-4 mx-2 my-8 rounded-lg shadow-sm">
			<h2 className="text-xl font-extrabold text-boss">{waiting.number}번</h2>

			<div className="flex flex-col gap-1 text-center">
				<p className="text-xl font-bold">{waiting.userName} 님</p>
			</div>

			<div>{children}</div>
		</div>
	);
};

export default OwnerWaitingBlock;
