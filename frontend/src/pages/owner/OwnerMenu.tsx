// import { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// import Modal from "@components/common/Modal";
// import Title from "@components/common/Title";
// import Container from "@components/owner/Container";
// import BackButton from "@components/owner/BackButton";
// import Main from "@components/owner/Main";
// // import Menu from "@components/owner/Menu";
// import MenuForm from "@components/owner/MenuForm";

// import { menuModalStyle } from "@utils/modalStyle";
// import useMenuModal from "@hooks/useMenuModal";
// import { getMenuList } from "@api/food-truck-api";
// import { IMenu } from "@interface/owner";

const OwnerMenu = () => {
	// // const nav = useNavigate();
	// const { isModalOpen, imageFile, formData, setImageFile, setFormData, closeModal, openModal } = useMenuModal({
	// 	name: "",
	// 	price: 0,
	// 	image: "",
	// });
	// // const [menuList, setMenuList] = useState<IMenu[]>([]);
	// useEffect(() => {
	// 	const loadMenuList = async () => {
	// 		try {
	// 			const { data } = await getMenuList();
	// 			if (data.isSuccess) {
	// 				// const menuData: IMenu[] = data.data.map((item) => {
	// 				// 	return {
	// 				// 		id: item.menuId,
	// 				// 		name: item.name,
	// 				// 		price: item.price,
	// 				// 		image: item.img,
	// 				// 	};
	// 				// });
	// 				// setMenuList(menuData);
	// 			} else {
	// 				alert("메뉴 조회 실패");
	// 			}
	// 		} catch (error) {
	// 			alert("요청 실패");
	// 		}
	// 	};
	// 	loadMenuList();
	// }, []);
	// const handleCreate = async () => {
	// 	try {
	// 		// const { data } = await registerMenu(foodTruckId, {
	// 		// 	req: {
	// 		// 		name: formData.name,
	// 		// 		price: formData.price,
	// 		// 	},
	// 		// 	menuImg: imageFile,
	// 		// });
	// 		// if (data.isSuccess) {
	// 		// 	alert("메뉴 등록 성공");
	// 		// 	nav(0);
	// 		// 	closeModal();
	// 		// } else {
	// 		// 	alert("메뉴 등록 실패");
	// 		// }
	// 	} catch (error) {
	// 		alert("요청 실패");
	// 	}
	// };
	return (
		<></>
		// 	<Container>
		// 		<Main>
		// 			<>
		// 				<div className="flex justify-between">
		// 					<div className="flex items-center gap-4">
		// 						<BackButton />
		// 						<Title title="메뉴 관리" />
		// 					</div>
		// 					<button
		// 						className="text-3xl"
		// 						onClick={() => openModal()}
		// 					>
		// 						추가
		// 					</button>
		// 				</div>
		// 				<div>
		// 					<div className="flex flex-wrap gap-6">
		// 						{/* {menuList.map((item) => (
		// 							<Menu
		// 								{...item}
		// 								key={item.id}
		// 							/>
		// 						))} */}
		// 					</div>
		// 				</div>
		// 				<Modal
		// 					isOpen={isModalOpen}
		// 					close={closeModal}
		// 					style={menuModalStyle}
		// 				>
		// 					<MenuForm
		// 						title="메뉴 추가"
		// 						buttonText="추가"
		// 						formData={formData}
		// 						setFormData={setFormData}
		// 						setImageFile={setImageFile}
		// 						onSubmit={handleCreate}
		// 					/>
		// 				</Modal>
		// 			</>
		// 		</Main>
		// 	</Container>
	);
};

export default OwnerMenu;
