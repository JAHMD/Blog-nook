const Footer = () => {
	return (
		<footer className="bg-primary-dark text-primary-light py-8">
			<div className="container mx-auto flex items-center justify-center">
				<p className="">
					&copy; {new Date().getFullYear()}{" "}
					<a
						href="https://github.com/JAHMD"
						target="_blank"
						className="inline-block text-primary-category"
					>
						Ahmed Wael
					</a>
					. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
