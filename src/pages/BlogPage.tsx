import { useQuery } from "react-query";
import BlogPostCard from "../components/BlogPostCard";
import PagesLoader from "../components/PagesLoader";
import { getBlogPosts } from "../firebase/firebase";
import { BlogPostType } from "./NewPost";

const BlogPage = () => {
	const { status, error, data } = useQuery({
		queryKey: `blog-posts`,
		queryFn: () => getBlogPosts(),
	});

	if (error instanceof Error) {
		throw new Error(error.message);
	}

	const posts = (data || []) as BlogPostType[];

	return status === "loading" ? (
		<PagesLoader />
	) : (
		<section className="container flex flex-col">
			<div className="border-b border-primary-border pb-6">
				<h1 className="page-heading capitalize">blog posts</h1>
				<p className="mt-2 text-lg leading-8 text-primary-text">
					Learn how to grow your business with our expert advice.
				</p>
			</div>

			{posts?.length > 0 ? (
				<div className="grid sm:grid-cols-repeat gap-8 mt-16">
					{posts?.map((post) => <BlogPostCard key={post.id} post={post} />)}
				</div>
			) : (
				<p className="text-3xl text-center my-auto font-bold h-full py-20">
					No posts to show
				</p>
			)}
		</section>
	);
};
export default BlogPage;
