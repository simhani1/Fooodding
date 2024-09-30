import React, { useRef, useState } from "react";

import { Camera } from "@phosphor-icons/react";
import defaultImage from "@assets/default_menu_image.png";
import { IMenuImage } from "@interface/owner";

const MenuImage = ({ image, setImage }: IMenuImage) => {
	const [imageUrl, setImageUrl] = useState<string>(image || "");

	const fileInput = useRef<HTMLInputElement>(null);

	const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}
		const uploadFile = event.target.files[0];
		if (uploadFile) {
			setImageUrl(window.URL.createObjectURL(uploadFile));
			setImage(uploadFile);
		}
	};

	const onClickImage = () => {
		if (fileInput.current) {
			fileInput.current.click();
		}
	};

	return (
		<div className="relative">
			<div className="mx-auto border-2 border-black border-solid w-52 h-52 rounded-3xl">
				<img
					src={imageUrl || defaultImage}
					alt="no image"
					className="w-full h-full opacity-40"
				/>
				<input
					hidden
					type="file"
					accept="image/jpg, image/png, image/jpeg"
					name="menu_img"
					onChange={onChangeImage}
					ref={fileInput}
				/>
			</div>
			<div
				className="absolute top-0 left-0 flex items-center justify-center w-full h-full"
				onClick={onClickImage}
			>
				<Camera className="w-2/5 h-2/5" />
			</div>
		</div>
	);
};

export default MenuImage;
