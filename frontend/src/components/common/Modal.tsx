import { IModal } from "@interface/common";
import { Box, Modal as MuiModal } from "@mui/material";

const Modal = ({ isOpen, close, style, children }: IModal) => {
	return (
		<MuiModal
			open={isOpen}
			onClose={close}
		>
			<Box sx={{ ...style }}>{children}</Box>
		</MuiModal>
	);
};

export default Modal;
