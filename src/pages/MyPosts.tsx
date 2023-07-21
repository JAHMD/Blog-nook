import { SignIn, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import NewPost from "../components/NewPost";

const MyPosts = () => {
	const { user } = useUser();
	const navigate = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		if (!user) {
			navigate("/");
		}
	}, []);

	return (
		<section>
			<div className="flex justify-between items-center border-b pb-6">
				<h1 className="page-heading">My nook</h1>
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

export default MyPosts;
