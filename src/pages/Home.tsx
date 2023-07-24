import { Link } from "react-router-dom";

const Home = () => {
	return (
		<section className="container">
			<div className="border-b border-primary-border pb-6">
				<h1 className="page-heading capitalize">Home</h1>
				<p className="mt-2 text-lg leading-8 text-text">
					Learn how to grow your business with our expert advice.
				</p>
			</div>
			<div className="py-8">
				<h1 className="text-3xl font-semibold mb-4">Latest Blog Posts</h1>
				<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					posts go here
				</div>
				<Link to="blog" className="btn btn-primary mx-auto">
					View more
				</Link>
			</div>
		</section>
	);
};

export default Home;
