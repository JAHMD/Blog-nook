/* eslint-disable no-mixed-spaces-and-tabs */
import { useUser } from "@clerk/clerk-react";
import { PenLine } from "lucide-react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import BlogPostCard from "../components/BlogPostCard";
import PagesLoader from "../components/PagesLoader";
import { getUserData } from "../firebase/firebase";
import { UserDataType } from "./NewPost";

const UserPosts = () => {
	const { user } = useUser();
	const { id: paramId } = useParams();

	const { status, error, data } = useQuery({
		queryKey: `user-${paramId!}`,
		queryFn: () => getUserData(paramId),
	});

	if (status === "loading") {
		return <PagesLoader />;
	}

	if (error instanceof Error) {
		throw new Error(error.message);
	}

	const { posts, id, imageURL: userImg, name } = data as UserDataType;

	return (
		<section className="container flex flex-col sm:py-16">
			<div className="flex flex-col items-center border-b border-primary-border pb-6 w-full gap-4 sm:gap-6">
				<img src={userImg} alt="user image" className="w-52 rounded-full" />

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
				{posts.length > 0 ? (
					<div className="grid sm:grid-cols-repeat gap-8">
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
