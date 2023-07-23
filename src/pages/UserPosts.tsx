import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useQuery } from "react-query";
import BlogPostCard from "../components/BlogPostCard";
import Modal from "../components/Modal";
import NewPost from "../components/NewPost";
import PagesLoader from "../components/PagesLoader";
import { getUserData } from "../firebase/firebase";

const UserPosts = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { user } = useUser();

	const { isLoading, error, data } = useQuery({
		queryKey: user?.id,
		queryFn: () => getUserData(user?.id),
	});

	if (isLoading) {
		return <PagesLoader />;
	}

	if (error) {
		return (
			<section className="pt-0 container flex items-center justify-center">
				<p>'An error has occurred: ' + error.message</p>;
			</section>
		);
	}

	const posts = data?.posts || [];

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
			{isModalOpen ? (
				<Modal closeModal={setIsModalOpen}>
					<NewPost closeModal={setIsModalOpen} />
				</Modal>
			) : null}
			<div className="flex flex-col gap-4 mt-8">
				{posts.length > 0 ? (
					<div className="sm:grid grid-cols-repeat gap-x-8 gap-y-16 mt-16">
						{posts.map((post) => (
							<BlogPostCard key={post.id} post={post} />
						))}
					</div>
				) : (
					<p className="text-3xl text-center my-auto font-bold h-full">
						No posts to show
					</p>
				)}
			</div>
		</section>
	);
};

export default UserPosts;
