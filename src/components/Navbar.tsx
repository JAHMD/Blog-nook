import { UserButton, useUser } from "@clerk/clerk-react";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SideMenu from "./SideMenu";

const Navbar = () => {
	const { isSignedIn, isLoaded } = useUser();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	return (
		<header className="bg-primary-light/80 sticky top-0 backdrop-blur-sm shadow-md z-10 text-primary-dark font-medium shadow-primary-dark/5">
			<nav className="flex justify-between items-center container py-6 min-h-20">
				<Link to="/" className="inline-block shrink-0 font-bold text-xl">
					Blog nook
				</Link>
				<button
					className="md:hidden p-1.5 rounded-md hover:bg-primary-dark hover:text-primary-light  transition-colors"
					onClick={() => setIsMenuOpen(true)}
				>
					<Menu />
				</button>
				{isMenuOpen ? <SideMenu closeMenu={setIsMenuOpen} /> : null}

				<div className="md:flex justify-between w-full hidden">
					<ul className="mx-auto flex gap-6 items-center">
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
								{/* <li>
									<NavLink to="comments" className="link">
										Comments
									</NavLink>
								</li> */}
								<li>
									<NavLink to="user-posts" className="link">
										My Posts
									</NavLink>
								</li>
							</>
						) : null}
					</ul>
					<div className="">
						{isLoaded && isSignedIn ? (
							<UserButton />
						) : (
							<Link to="/sign-in" className="inline-block btn btn-primary">
								Sign in
							</Link>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
