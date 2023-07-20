import { useState } from "react";
import Modal from "../components/Modal";
import NewPost from "../components/NewPost";

const MyPosts = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<section>
			<h1 className="mx-auto text-3xl font-bold border-b-2 pb-2 w-fit">
				My nook
			</h1>
			<div className="flex flex-col gap-4 mt-8">
				<button
					className="btn btn-primary ml-auto"
					onClick={() => setIsModalOpen((oldState) => !oldState)}
				>
					Write Post
				</button>
				{isModalOpen ? (
					<Modal closeModal={setIsModalOpen}>
						<NewPost closeModal={setIsModalOpen} />
					</Modal>
				) : null}
				<ul className=""></ul>
			</div>
		</section>
	);
};

export default MyPosts;
