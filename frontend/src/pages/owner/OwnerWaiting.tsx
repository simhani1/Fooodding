import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Main from "@components/owner/Main";
import Container from "@components/owner/Container";
import OwnerWaitingBlock from "@components/owner/OwnerWaitingBlock";

import { closeMarket } from "@api/food-truck-api";
import { IWaiting } from "@interface/waiting";
import { Bell, Check, X } from "@phosphor-icons/react";
import { acceptReservation, cancelReservation, completeReservation, connectSse } from "@api/waiting-api";

const OwnerWaiting = () => {
	// const nav = useNavigate();
	const [waitingLine, setWaitingLine] = useState<IWaiting[]>([]); //줄서는 중
	const [waitingOrder, setWaitingOrder] = useState<IWaiting[]>([]); //음식 기다리는 중

	const location = useLocation();
	const foodTruckId = location.state?.foodTruckId;

	useEffect(() => {
		let eventSource = connectSse(foodTruckId);
		// 서버에서 connected 이벤트를 발생시킬 때 동작합니다.
		eventSource.addEventListener("connected", (event: MessageEvent[keyof MessageEvent]) => {
			console.log("connected");
			const data = JSON.parse(event.data);
			setWaitingLine(data.waitingLine);
			setWaitingOrder(data.orderLine);
		});

		// 서버에서 연결 상태 확인을 위해 heartbeat 이벤트를 발생시킵니다.
		eventSource.addEventListener("heartbeat", () => {
			console.log("heartbeat");
		});

		// 손님이 예약할 때 발생하는 이벤트 (서버에서 userId가 아닌 웨이팅 정보를 넘겨주도록 수정해야 합니다.)
		eventSource.addEventListener("reserved", (event: MessageEvent[keyof MessageEvent]) => {
			console.log("reserved", event);
		});

		// 손님이 예약 취소할 때 발생하는 이벤트 (서버에서 userId가 아닌 waitingId를 넘겨주도록 수정해야 합니다.)
		eventSource.addEventListener("canceled", (event: MessageEvent[keyof MessageEvent]) => {
			console.log("canceled", event);
		});

		const handleBeforeUnload = () => {
			eventSource.close();
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		eventSource.onerror = () => {
			if (eventSource.readyState === EventSource.CLOSED) {
				// 연결에 실패했을 때 새로고침해서 재연결할지 밖으로 나거게 할지 정해야 합니다.
				// nav("/owners");
				// eventSource = connectSse(foodTruckId);
			}
		};

		return () => {
			if (eventSource) {
				// 페이지 벗어나기 전에 반드시 연결을 닫아야 합니다.
				eventSource.close();
			}
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	//손님호출
	const callCustomer = async (id: number) => {
		try {
			const { data } = await acceptReservation(id);
			if (data.isSuccess) {
				// 선택한 손님을 waitingLine에서 찾음
				const customer = waitingLine.find((line) => line.waitingId === id);
				if (!customer) {
					return;
				}

				// 선택한 손님을 waitingOrder에 추가하고, waitingLine에서 제거
				setWaitingOrder((prevOrders) => [...prevOrders, customer]);
				setWaitingLine((prevLines) => prevLines.filter((line) => line.waitingId !== id));
			}
		} catch (error) {
			alert("손님 호출에 실패하였습니다.");
		}

		//여기에서 fcm 해야합니다
	};

	//손님받기
	const checkCustomer = async (id: number) => {
		await completeReservation(id);
		setWaitingOrder((prevOrders) => prevOrders.filter((order) => order.waitingId !== id));
	};

	//손님취소
	const cancelCustomer = async (id: number) => {
		await cancelReservation(id);
		setWaitingOrder((prevOrders) => prevOrders.filter((order) => order.waitingId !== id));
	};

	//장사종료하기
	const closeToday = async () => {
		const check = confirm("장사를 종료하시겠습니까?");
		if (check) {
			try {
				await closeMarket(foodTruckId);
			} catch (error) {
				alert("장사 종료에 실패하였습니다.");
			}
		}
	};

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
												key={line.waitingId}
												waiting={line}
												isOrder={false}
												onCancel={cancelCustomer}
											>
												<button
													className="p-4 text-white rounded-full bg-boss"
													onClick={() => callCustomer(line.waitingId)}
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
												key={order.waitingId}
												waiting={order}
												isOrder={true}
												onCancel={cancelCustomer}
											>
												<div className="flex gap-2">
													<button
														className="p-4 text-white rounded-full bg-green"
														onClick={() => checkCustomer(order.waitingId)}
													>
														<Check size={18} />
													</button>
													<button
														className="p-4 text-white rounded-full bg-main"
														onClick={() => cancelCustomer(order.waitingId)}
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
