import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "@components/common/Modal";
import Title from "@components/common/Title";
import Container from "@components/owner/Container";
import BackButton from "@components/owner/BackButton";
import Main from "@components/owner/Main";
import Menu from "@components/owner/Menu";
import MenuForm from "@components/owner/MenuForm";
import OwnerException from "@components/owner/OwnerException";

import { menuModalStyle } from "@utils/modalStyle";
import useMenuModal from "@hooks/useMenuModal";
import { getMenuList, registerMenu } from "@api/food-truck-api";
import { IMenuResponseDTO } from "@interface/api";

const OwnerMenu = () => {
	const nav = useNavigate();

	const { isModalOpen, imageFile, formData, setImageFile, setFormData, closeModal, openModal } = useMenuModal({
		name: "",
		price: 0,
		image: "",
	});

	const [menuList, setMenuList] = useState<IMenuResponseDTO[]>([]);
	const [foodTruckId, setFoodTruckId] = useState<number>(0);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const title = "메뉴 관리";

	useEffect(() => {
		const loadMenuList = async () => {
			try {
				const { data } = await getMenuList();
				if (data.isSuccess) {
					setMenuList(data.data.menuList);
					setFoodTruckId(data.data.foodTruckId);
				}
			} catch (error) {
				setIsOpen(true);
			} finally {
				setIsLoading(false);
			}
		};
		loadMenuList();
	}, []);

	const handleCreate = async () => {
		try {
			const { data } = await registerMenu(foodTruckId, {
				req: {
					name: formData.name,
					price: formData.price,
				},
				menuImg: imageFile,
			});
			if (data.isSuccess) {
				alert("메뉴 등록 성공");
				nav(0);
				closeModal();
			} else {
				alert("메뉴 등록 실패");
			}
		} catch (error) {
			alert("요청 실패");
		}
	};

	if (isLoading) {
		return (
			<OwnerException
				title={title}
				content="불러오는 중..."
			/>
		);
	}

	if (isOpen) {
		return (
			<OwnerException
				title={title}
				content="장사중인 푸드트럭은 수정할 수 없습니다."
			/>
		);
	}

	return (
		<Container>
			<Main>
				<>
					<div className="flex justify-between">
						<div className="flex items-center gap-4">
							<BackButton />
							<Title title={title} />
						</div>
						<button
							className="text-3xl"
							onClick={() => openModal()}
						>
							추가
						</button>
					</div>
					<div>
						<div className="flex flex-wrap gap-6">
							{menuList.map((item) => (
								<Menu
									foodTruckId={foodTruckId}
									{...item}
									key={item.menuId}
								/>
							))}
						</div>
					</div>
					<Modal
						isOpen={isModalOpen}
						close={closeModal}
						style={menuModalStyle}
					>
						<MenuForm
							title="메뉴 추가"
							buttonText="추가"
							formData={formData}
							setFormData={setFormData}
							setImageFile={setImageFile}
							onSubmit={handleCreate}
						/>
					</Modal>
				</>
			</Main>
		</Container>
	);
};

export default OwnerMenu;
