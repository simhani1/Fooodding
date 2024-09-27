import Container from "@components/owner/Container";
import Main from "@components/owner/Main";
import OwnerWaitingBlock from "@components/owner/OwnerWaitingBlock";
import { IWaitingLine, IWaitingOrder } from "@interface/waiting";
import { Bell, Check, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const OwnerWaiting = () => {
	const [waitingLine, setWaitingLine] = useState<IWaitingLine[]>([]); //줄서는 중
	const [waitingOrder, setWaitingOrder] = useState<IWaitingOrder[]>([]); //음식 기다리는 중

	useEffect(() => {
		// setWaitingLine(exampleLineList);
		// setWaitingOrder(exampleOrderList);
	}, []);

	//손님호출
	const callCustomer = (id: number) => {
		// 선택한 손님을 waitingLine에서 찾음
		const customer = waitingLine.find((line) => line.id === id);
		if (!customer) {
			return;
		}

		// 선택한 손님을 waitingOrder에 추가하고, waitingLine에서 제거
		setWaitingOrder((prevOrders) => [...prevOrders, customer]);
		setWaitingLine((prevLines) => prevLines.filter((line) => line.id !== id));

		//여기에서 fcm 해야합니다
	};

	//손님받기
	const checkCustomer = (id: number) => {
		setWaitingOrder((prevOrders) => prevOrders.filter((order) => order.id !== id));
	};

	//손님취소
	const cancelCustomer = (id: number) => {
		setWaitingOrder((prevOrders) => prevOrders.filter((order) => order.id !== id));
	};

	//장사종료하기
	const closeToday = () => {};

	return (
		<Container>
			<Main>
				<>
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-extrabold">멋지다 붕어빵 가게 사장님</h1>
						<button
							className="px-8 py-2 text-lg font-bold text-white rounded-md bg-gradient-to-r from-main to-boss"
							onClick={closeToday}
						>
							오늘 장사 종료하기
						</button>
					</div>

					{waitingLine.length === 0 && waitingOrder.length === 0 ? (
						<div>
							<h1 className="my-32 text-3xl font-bold text-center"> 기다리고 있는 사람이 없습니다. </h1>
						</div>
					) : (
						<div className="flex justify-between">
							<div className="w-1/2">
								<h1 className="text-2xl font-bold text-center">
									총 <span className="text-boss">{waitingLine.length}명</span> 줄 서는 중
								</h1>

								{waitingLine.length === 0 ? (
									<p className="m-8 text-xl font-bold text-center">기다리고 있는 사람이 없습니다</p>
								) : (
									<>
										{waitingLine.map((line) => (
											<OwnerWaitingBlock
												key={line.id}
												{...line}
											>
												<button
													className="p-4 text-white rounded-full bg-boss"
													onClick={() => callCustomer(line.id)}
												>
													<Bell size={18} />
												</button>
											</OwnerWaitingBlock>
										))}
									</>
								)}
							</div>

							<div className="w-1/2">
								<h1 className="text-2xl font-bold text-center">
									총 <span className="text-main">{waitingOrder.length}명</span> 음식 기다리는 중
								</h1>

								{waitingOrder.length === 0 ? (
									<p className="m-8 text-xl font-bold text-center">줄서고 있는 사람이 없습니다</p>
								) : (
									<>
										{waitingOrder.map((order) => (
											<OwnerWaitingBlock
												key={order.id}
												{...order}
											>
												<div className="flex gap-2">
													<button
														className="p-4 text-white rounded-full bg-green"
														onClick={() => checkCustomer(order.id)}
													>
														<Check size={18} />
													</button>
													<button
														className="p-4 text-white rounded-full bg-main"
														onClick={() => cancelCustomer(order.id)}
													>
														<X size={18} />
													</button>
												</div>
											</OwnerWaitingBlock>
										))}
									</>
								)}
							</div>
						</div>
					)}
				</>
			</Main>
		</Container>
	);
};

export default OwnerWaiting;

const exampleLineList: IWaitingLine[] = [
	{
		id: 1,
		nickname: "도스터",
		waitingNumber: 286,
		time: "13:29:01",
	},
	{
		id: 2,
		nickname: "도스터도스터",
		waitingNumber: 287,
		time: "13:29:01",
	},
	{
		id: 3,
		nickname: "도스터릐",
		waitingNumber: 288,
		time: "13:29:01",
	},
	{
		id: 4,
		nickname: "도스터",
		waitingNumber: 289,
		time: "13:29:01",
	},
];

const exampleOrderList: IWaitingOrder[] = [
	{
		id: 5,
		nickname: "도스터구리",
		waitingNumber: 282,
		time: "13:29:01",
	},
	{
		id: 6,
		nickname: "도스터",
		waitingNumber: 284,
		time: "13:29:01",
	},
	{
		id: 7,
		nickname: "도스터",
		waitingNumber: 285,
		time: "13:29:01",
	},
	{
		id: 8,
		nickname: "도스터",
		waitingNumber: 283,
		time: "13:29:01",
	},
];
