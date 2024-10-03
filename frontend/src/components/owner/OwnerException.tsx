import Title from "@components/common/Title";
import BackButton from "@components/owner/BackButton";
import Container from "@components/owner/Container";
import Main from "@components/owner/Main";

import { IOwnerExceptionProps } from "@interface/owner";

const OwnerException = ({ title, content }: IOwnerExceptionProps) => {
	return (
		<Container>
			<Main>
				<>
					<div className="flex justify-between">
						<div className="flex items-center gap-4">
							<BackButton />
							<Title title={title} />
						</div>
					</div>
					<div className="flex flex-col justify-end h-80">
						<h4 className="text-3xl text-center">{content}</h4>
					</div>
				</>
			</Main>
		</Container>
	);
};

export default OwnerException;
