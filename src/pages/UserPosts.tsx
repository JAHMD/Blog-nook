/* eslint-disable no-mixed-spaces-and-tabs */
import { useUser } from "@clerk/clerk-react";
import { PenLine } from "lucide-react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import BlogPostCard from "../components/BlogPostCard";
import PagesLoader from "../components/PagesLoader";
import { getUserData } from "../firebase/firebase";

const UserPosts = () => {
	const { user } = useUser();

	const { status, error, data, isFetching } = useQuery({
		queryKey: user?.id,
		queryFn: () => getUserData(user?.id),
	});

	if (error instanceof Error) {
		return (
			<section className="pt-0 container flex items-center justify-center min-h-[calc(100vh-90px)]">
				<p>{"An error has occurred: " + error.message}</p>;
			</section>
		);
	}

	const posts = data?.posts || [];

	return status === "loading" || isFetching ? (
		<PagesLoader />
	) : (
		<section className="container flex flex-col min-h-[calc(100vh-90px)] py-10">
			<div className="flex justify-between items-center border-b pb-6">
				<h1 className="page-heading">My posts</h1>
				<Link
					to="/write-post"
					className="btn btn-primary ml-auto flex items-center gap-2"
				>
					<PenLine className="w-5" />
					Write
				</Link>
			</div>

			<>
				{posts.length > 0 ? (
					<div className="grid sm:grid-cols-repeat gap-8 mt-16">
						{posts.map((post) => (
							<BlogPostCard key={post.id} post={post} />
						))}
					</div>
				) : (
					<p className="text-3xl text-center my-auto font-bold h-full">
						No posts to show
					</p>
				)}
			</>
		</section>
	);
};

export default UserPosts;
