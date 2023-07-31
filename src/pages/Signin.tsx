import { SignIn } from "@clerk/clerk-react";

const Signin = () => {
	return (
		<section className="container flex items-center justify-center py-8">
			<SignIn />
		</section>
	);
};

export default Signin;
