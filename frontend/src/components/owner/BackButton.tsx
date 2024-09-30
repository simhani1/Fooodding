import { useNavigate } from "react-router-dom";

import { CaretCircleLeft } from "@phosphor-icons/react";

const BackButton = () => {
	const navigate = useNavigate();

	const handleBackButton = () => {
		navigate(-1);
	};

	return (
		<CaretCircleLeft
			size={56}
			onClick={handleBackButton}
		/>
	);
};

export default BackButton;
