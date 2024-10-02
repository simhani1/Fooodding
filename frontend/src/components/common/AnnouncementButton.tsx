import { IAnnouncementButton } from "@interface/common";

const AnnouncementButton = ({ buttonText, onClick, place, duration }: IAnnouncementButton) => {
	return (
		<button
			type="button"
			className="box-border w-full h-40 px-10 py-4 mb-6 text-4xl font-semibold border border-solid shadow-md border-gray-light rounded-2xl"
			onClick={onClick}
		>
			<div>
				<h3 className="text-left">{buttonText}</h3>
				<p className="mt-4 text-2xl font-normal text-left">
					{duration} | {place}
				</p>
			</div>
		</button>
	);
};

export default AnnouncementButton;
