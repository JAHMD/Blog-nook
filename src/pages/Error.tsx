import { Link } from "react-router-dom";

function Error() {
	return (
		<section className="container h-screen flex items-center justify-center flex-col text-primary-dark gap-2 text-center">
			<h1 className="font-bold text-2xl sm:text-3xl">Something went wrong!</h1>
			<p className="text-primary-text text-sm sm:text-base">
				Back to home page or try again later.
			</p>

			<Link to="/" className="btn btn-primary py-2.5 mt-4">
				Back to home
			</Link>
		</section>
	);
}

export default Error;
