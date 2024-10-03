import { useNavigate } from "react-router-dom";

import Modal from "@components/common/Modal";
import MenuForm from "@components/owner/MenuForm";

import defaultImage from "@assets/default_menu_image.png";
import { menuModalStyle } from "@utils/modalStyle";
import useMenuModal from "@hooks/useMenuModal";
import { deleteMenu, updateMenu } from "@api/food-truck-api";
import { IMenuProps } from "@interface/owner";

const Menu = ({ foodTruckId, menuId, image, name, price }: IMenuProps) => {
	const nav = useNavigate();

	const { isModalOpen, imageFile, formData, setImageFile, setFormData, closeModal, openModal } = useMenuModal({
		name,
		price,
		image,
	});

	const handleUpdate = async () => {
		try {
			const { data } = await updateMenu(foodTruckId, menuId, {
				req: {
					name: formData.name,
					price: formData.price,
				},
				menuImg: imageFile,
			});

			if (data.isSuccess) {
				alert("메뉴 수정 성공");
				nav(0);
				closeModal();
			} else {
				alert("메뉴 수정 실패");
			}
		} catch (error) {
			alert("요청 실패");
		}
	};

	const handleDelete = async () => {
		const check = confirm("메뉴를 삭제하시겠습니까?");
		if (check) {
			try {
				const { data } = await deleteMenu(menuId);
				if (data.isSuccess) {
					nav(0);
					alert("메뉴 삭제 성공");
				} else {
					alert("메뉴 삭제 실패");
				}
			} catch (error) {
				alert("요청 실패");
			}
		}
	};

	return (
		<div className="flex flex-col justify-around w-56 rounded-md shadow-md h-72">
			<img
				src={image || defaultImage}
				alt="no image"
				className="mx-auto border-2 border-black rounded-md w-36 h-36"
			/>
			<div className="flex flex-col gap-1 text-center">
				<h4 className="text-2xl">{name}</h4>
				<span className="text-2xl">₩{price.toLocaleString("ko-kr")}</span>
			</div>
			<div className="flex justify-around w-3/4 mx-auto">
				<button
					className="text-xl"
					onClick={() => openModal()}
				>
					수정
				</button>
				<button
					className="text-xl"
					onClick={handleDelete}
				>
					삭제
				</button>
			</div>
			<Modal
				isOpen={isModalOpen}
				close={closeModal}
				style={menuModalStyle}
			>
				<MenuForm
					title="메뉴 수정"
					buttonText="수정 완료"
					formData={formData}
					setFormData={setFormData}
					setImageFile={setImageFile}
					onSubmit={handleUpdate}
				/>
			</Modal>
		</div>
	);
};

export default Menu;
