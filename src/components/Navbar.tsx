import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
	const { isSignedIn, isLoaded } = useUser();

	return (
		<header className="bg-slate-900/80 sticky top-0 backdrop-blur-sm shadow-md">
			<nav className="flex justify-between items-center container py-6 min-h-20">
				<Link to="/">Blog nook</Link>
				<ul className=" flex gap-4 items-center">
					<li>
						<NavLink to="/" className="link">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="blog" className="link">
							Blog
						</NavLink>
					</li>
					<li>
						<NavLink to="categories" className="link">
							Categories
						</NavLink>
					</li>
					{isLoaded && isSignedIn ? (
						<>
							<li>
								<NavLink to="comments" className="link">
									Comments
								</NavLink>
							</li>
							<li>
								<NavLink to="my-posts" className="link">
									My Posts
								</NavLink>
							</li>
						</>
					) : null}
				</ul>
				<div className="border-2 border-white rounded-full ">
					{isLoaded && isSignedIn ? (
						<UserButton />
					) : (
						<SignInButton>
							<span className="btn rounded-full btn-primary cursor-pointer inline-block">
								Sign in
							</span>
						</SignInButton>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
