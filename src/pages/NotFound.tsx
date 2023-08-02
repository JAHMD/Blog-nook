import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<section className="container grid min-h-[calc(100vh-177.6px)] place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-primary-dark">404</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-primary-dark sm:text-5xl">
					Page not found
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link
						to="/"
						className="rounded-lg bg-primary-dark px-3.5 py-2.5 text-sm font-semibold text-primary-light shadow-md shadow-primary-dark/20 hover:bg-primary-dark/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Go back home
					</Link>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
