import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import BlogPostCard from "../components/BlogPostCard";
import { BlogPostType } from "../components/NewPost";
import PagesLoader from "../components/PagesLoader";
import { getBlogPosts } from "../firebase/firebase";

export const blogLoader = async () => {
	const data = (await getBlogPosts()) || [];
	return defer({ data });
};

const BlogPage = () => {
	const { data } = useLoaderData() as { data: BlogPostType[] };

	return (
		<Suspense fallback={<PagesLoader />}>
			<Await resolve={data}>
				{(blogPosts: BlogPostType[]) => {
					return (
						<section className="h-full flex flex-col">
							<div className="border-b border-primary-border pb-6">
								<h1 className="page-heading capitalize">blog posts</h1>
								<p className="mt-2 text-lg leading-8 text-text">
									Learn how to grow your business with our expert advice.
								</p>
							</div>

							{blogPosts.length > 0 ? (
								<div className="grid grid-cols-repeat gap-x-8 gap-y-16 mt-16">
									{blogPosts.map((post) => (
										<BlogPostCard key={post.id} {...post} />
									))}
								</div>
							) : (
								<p className="text-3xl text-center font-bold h-full">
									No posts to show
								</p>
							)}
						</section>
					);
				}}
			</Await>
		</Suspense>
	);
};

export default BlogPage;
