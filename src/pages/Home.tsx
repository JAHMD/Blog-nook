import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import feature1Img from "../assets/kenny-eliason-3GZNPBLImWc-unsplash.jpg";
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
		<>
			<section className="container pb-16">
				<div className="border-b border-primary-border pb-10 text-center">
					<h1 className="page-heading text-3xl md:text-6xl">
						Welcome to <span className="inline-block">Blog nook</span>
					</h1>
					<p className="mt-4 text-base md:text-xl text-primary-text">
						Share your thoughts and ideas with the world.
					</p>
					<Link
						to="/sign-in"
						className="mt-8 inline-block btn btn-primary px-6 py-2.5 rounded-full"
					>
						Get Started
					</Link>
				</div>
				<div className="pt-12 flex flex-col gap-12">
					<h1 className="text-2xl sm:text-3xl font-bold border-b-2 border-primary-dark pb-3 mx-auto w-fit">
						Latest blog posts
					</h1>

					{posts?.length > 0 ? (
						<div className="grid sm:grid-cols-repeat gap-8 mt-16">
							{posts?.map((post) => <BlogPostCard key={post.id} post={post} />)}
						</div>
					) : (
						<p className="text-3xl text-center my-auto font-bold h-full">
							No posts yet!
						</p>
					)}

					<Link to="blog" className="btn btn-primary mx-auto inline-block">
						View more
					</Link>
				</div>
			</section>

			<section className="py-16 bg-primary-category/30">
				<div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="flex order-2 lg:order-1">
						<img
							src={feature1Img}
							alt="Feature 1"
							className="rounded-lg w-full object-contain"
						/>
					</div>
					<div className="mx-auto lg:mx-0w-[500px] max-w-full text-center lg:text-start order-1 lg:order-2">
						<h2 className="text-2xl sm:text-3xl font-bold">Write and Share</h2>
						<p className="text-base sm:text-lg text-primary-dark/80 mt-2">
							Express yourself with the power of words. Write articles, stories,
							and ideas that matter to you, and share them with the world.
						</p>
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Join us today and start blogging!
					</h2>
					<Link
						to="/sign-in"
						className="mt-8 btn-primary px-6 py-2.5 rounded-full inline-block font-bold transition duration-300"
					>
						Join Now
					</Link>
				</div>
			</section>
		</>
	);
};

export default Home;
