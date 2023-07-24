import { useUser } from "@clerk/clerk-react";
import { PenLine } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "react-query";
import BlogPostCard from "../components/BlogPostCard";
import NewPost from "../components/NewPost";
import PagesLoader from "../components/PagesLoader";
import { getUserData } from "../firebase/firebase";

const UserPosts = () => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
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
					className="btn btn-primary ml-auto flex items-center gap-2"
					onClick={() => setIsFormOpen((oldState) => !oldState)}
				>
					<PenLine className="w-5" />
					Write
				</button>
			</div>

			{isFormOpen
				? createPortal(
						<div className="p-6 z-30 fixed top-0 left-0 w-full overflow-hidden h-full grid place-content-center bg-primary-dark/60">
							<div className="form-holder overflow-y-auto rounded-lg">
								<NewPost closeModal={setIsFormOpen} />
							</div>
						</div>,
						document.body
				  )
				: null}

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
