import { useState } from "react";
import Modal from "../components/Modal";
import NewPost from "../components/NewPost";

const UserPosts = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<section className="container">
			<div className="flex justify-between items-center border-b pb-6">
				<h1 className="page-heading">My posts</h1>
				<button
					className="btn btn-primary ml-auto"
					onClick={() => setIsModalOpen((oldState) => !oldState)}
				>
					Write Post
				</button>
			</div>
			<div className="flex flex-col gap-4 mt-8">
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

export default UserPosts;
