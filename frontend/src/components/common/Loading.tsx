import LoadingGIF from "@assets/LoadingGif.gif";

const Loading = () => {
	return (
		<div className="fixed flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
			<h1 className="text-3xl font-extrabold text-center">로딩중</h1>
			<img
				src={LoadingGIF}
				alt="로딩 중"
			/>
		</div>
	);
};

export default Loading;
