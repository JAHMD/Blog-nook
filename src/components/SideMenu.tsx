import { UserButton, useUser } from "@clerk/clerk-react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo/Asset 4.svg";

type PropsType = {
	closeMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideMenu = ({ closeMenu }: PropsType) => {
	const { user } = useUser();
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
					<img src={logo} alt="" className="w-[155px]" />
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
					{isLoaded && isSignedIn ? (
						<li>
							<NavLink
								to={`user/${user!.id}`}
								className="sidemenu_link w-full"
								onClick={handleClick}
							>
								My Posts
							</NavLink>
						</li>
					) : null}
				</ul>
				<div className="mt-auto w-full border-t-2 pt-4 border-primary-border">
					{isLoaded && isSignedIn ? (
						<div className="flex items-center gap-4 font-medium">
							<UserButton /> {user?.fullName}
						</div>
					) : (
						<Link
							to="/sign-in"
							className="inline-block btn btn-primary w-full text-center"
							onClick={handleClick}
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
