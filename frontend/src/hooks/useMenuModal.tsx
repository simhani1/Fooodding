import { useState } from "react";

import { IMenuFormData } from "@interface/owner";

const useMenuModal = (initialFormData: IMenuFormData) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [imageFile, setImageFile] = useState<File>();
	const [formData, setFormData] = useState<IMenuFormData>(initialFormData);

	const closeModal = () => {
		setFormData(initialFormData);
		setIsModalOpen(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	return { isModalOpen, imageFile, formData, setImageFile, setFormData, closeModal, openModal };
};

export default useMenuModal;
