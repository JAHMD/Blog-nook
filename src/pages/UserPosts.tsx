import { useUser } from "@clerk/clerk-react";
import { PenLine } from "lucide-react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import BlogPostCard from "../components/BlogPostCard";
import PagesLoader from "../components/PagesLoader";
import { addNewUser, getUserData, isUserExists } from "../firebase/firebase";
import { UserDataType } from "./NewPost";

const UserPosts = () => {
	const { user } = useUser();
	const { id: userId } = useParams();

	useEffect(() => {
		handleNewUser();

		return () => handleNewUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { status, error, data } = useQuery({
		queryKey: `user-${userId!}`,
		queryFn: () => getUserData(userId!),
	});

	if (error instanceof Error) {
		throw new Error(error.message);
	}

	function handleNewUser() {
		void (async () => {
			const isUser = await isUserExists(userId!);
			if (isUser) return;

			const userData = {
				id: user?.id,
				name: user?.fullName,
				imageURL: user?.imageUrl,
				posts: [],
			} as UserDataType;

			await addNewUser(userData);
			location.reload();
		})();
	}

	const { posts, id, imageURL, name } = data || {
		id: "",
		imageURL: "",
		name: "",
		posts: [],
	};

	return status === "loading" ? (
		<PagesLoader />
	) : (
		<section className="container flex flex-col sm:py-16">
			<div className="flex flex-col items-center border-b border-primary-border pb-6 w-full gap-4 sm:gap-6">
				<img src={imageURL} alt="user image" className="w-52 rounded-full" />

				{user?.id === id ? (
					<>
						<h1 className="page-heading">{name}</h1>
						<Link
							to="/write-post"
							className="btn btn-primary ml-auto flex items-center gap-2"
						>
							<PenLine className="w-5" />
							Write
						</Link>
					</>
				) : (
					<h1 className="page-heading">{name}</h1>
				)}
			</div>
			<div className="py-10 flex flex-col gap-8 sm:gap-10">
				<h2 className="text-2xl sm:text-3xl font-bold border-b-2 border-primary-dark pb-3 w-fit">
					Posts
				</h2>
				{posts?.length > 0 ? (
					<div className="grid sm:grid-cols-repeat gap-8">
						{posts?.map((post) => <BlogPostCard key={post.id} post={post} />)}
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
