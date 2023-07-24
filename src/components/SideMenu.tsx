import { UserButton, useUser } from "@clerk/clerk-react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";

type PropsType = {
	closeMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideMenu = ({ closeMenu }: PropsType) => {
	const { isLoaded, isSignedIn } = useUser();
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const clickHandler = (e: MouseEvent) => {
			if (e.target === menuRef.current) {
				closeMenu(false);
			}
		};

		document.addEventListener("click", clickHandler);
		return () => {
			document.removeEventListener("click", clickHandler);
		};
	}, [menuRef, closeMenu]);

	const handleClick = () => {
		closeMenu(false);
	};

	return createPortal(
		<div
			ref={menuRef}
			className="fixed top-0 left-0 w-full bg-primary-dark/60 flex h-full z-20 justify-end text-primary-dark"
		>
			<aside className="p-6 py-10 w-[375px] max-w-full h-screen bg-primary-light flex flex-col">
				<div className="flex justify-between items-center border-b-2 pb-2 border-primary-border">
					<p className="text-xl font-semibold">Blog nook</p>
					<button
						className="p-1 rounded-md hover:bg-primary-dark hover:shadow-md shadow-primary-dark/20 hover:text-primary-light  transition-colors"
						onClick={handleClick}
					>
						<X />
					</button>
				</div>
				<ul className="mt-6 w-full">
					<li>
						<NavLink onClick={handleClick} to="/" className="sidemenu_link">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="blog" className="sidemenu_link" onClick={handleClick}>
							Blog
						</NavLink>
					</li>
					<li>
						<NavLink
							to="categories"
							className="sidemenu_link"
							onClick={handleClick}
						>
							Categories
						</NavLink>
					</li>
					{isLoaded && isSignedIn ? (
						<>
							{/* <li>
									<NavLink to="comments" className="sidemenu_link">
										Comments
									</NavLink>
								</li> */}
							<li>
								<NavLink to="user-posts" className="sidemenu_link w-full">
									My Posts
								</NavLink>
							</li>
						</>
					) : null}
				</ul>
				<div className="mt-auto w-full border-t-2 pt-4 border-primary-border">
					{isLoaded && isSignedIn ? (
						<UserButton />
					) : (
						<Link
							to="/sign-in"
							className="inline-block btn btn-primary w-full text-center"
						>
							Sign in
						</Link>
					)}
				</div>
			</aside>
		</div>,
		document.body
	);
};

export default SideMenu;
