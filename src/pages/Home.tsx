import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import BlogPostCard from "../components/BlogPostCard";
import PagesLoader from "../components/PagesLoader";
import { getLatestPosts } from "../firebase/firebase";
import { BlogPostType } from "./NewPost";

const Home = () => {
	const { status, isFetching, error, data } = useQuery({
		queryKey: `latest-blog-posts`,
		queryFn: () => getLatestPosts(),
	});

	if (error instanceof Error) {
		return (
			<section className="pt-0 container flex items-center justify-center">
				<p>'An error has occurred: ' + {error.message}</p>;
			</section>
		);
	}

	const posts = (data || []) as BlogPostType[];

	return status === "loading" || isFetching ? (
		<PagesLoader />
	) : (
		<section className="container space-y-6">
			<div className="border-b border-primary-border pb-6">
				<h1 className="page-heading capitalize">Home</h1>
				<p className="mt-2 text-lg leading-8 text-primary-text">
					A popular website, has become a favorite platform for writing and
					editing articles.
				</p>
			</div>
			<div className="py-8 flex flex-col gap-10">
				<h1 className="text-3xl font-semibold">Latest Blog Posts</h1>
				<div className="grid sm:grid-cols-repeat gap-8">
					{posts?.map((post) => <BlogPostCard key={post.id} post={post} />)}
				</div>
				<Link to="blog" className="btn btn-primary mx-auto inline-block">
					View more
				</Link>
			</div>
		</section>
	);
};

export default Home;
