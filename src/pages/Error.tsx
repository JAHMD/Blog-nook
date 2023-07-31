import { Link } from "react-router-dom";

function Error() {
	return (
		<section className="container">
			<h2>Something went wrong!</h2>

			<Link to="/" className="btn btn-primary">
				Back to home page
			</Link>
		</section>
	);
}

export default Error;
