import { useQuery } from "react-query";
import BlogPostCard from "../components/BlogPostCard";
import { BlogPostType } from "../components/NewPost";
import PagesLoader from "../components/PagesLoader";
import { getBlogPosts } from "../firebase/firebase";

const BlogPage = () => {
	const { isLoading, error, data } = useQuery({
		queryKey: "blog",
		queryFn: async () => await getBlogPosts(),
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

	const posts = (data || []) as BlogPostType[];

	return (
		<section className="container flex flex-col">
			<div className="border-b border-primary-border pb-6">
				<h1 className="page-heading capitalize">blog posts</h1>
				<p className="mt-2 text-lg leading-8 text-text">
					Learn how to grow your business with our expert advice.
				</p>
			</div>

			{posts?.length > 0 ? (
				<div className="sm:grid grid-cols-repeat gap-x-8 gap-y-16 mt-16">
					{posts?.map((post) => <BlogPostCard key={post.id} post={post} />)}
				</div>
			) : (
				<p className="text-3xl text-center my-auto font-bold h-full">
					No posts to show
				</p>
			)}
		</section>
	);
};
export default BlogPage;
