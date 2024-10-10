import { IAnnouncementButton } from "@interface/common";

const AnnouncementButton = ({ buttonText, onClick, place, date, time, isOpened }: IAnnouncementButton) => {
	return (
		<button
			type="button"
			className="box-border w-full px-8 py-4 mb-6 text-3xl font-semibold border border-solid shadow-md h-36 border-gray-light rounded-2xl"
			onClick={onClick}
		>
			<div className={!isOpened ? "" : "text-gray"}>
				<h3 className="text-left">{buttonText}</h3>
				<p className="mt-2 text-xl font-normal text-left">
					{date} {time} | {place}
				</p>
			</div>
		</button>
	);
};

export default AnnouncementButton;
