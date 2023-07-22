import { ClerkProvider } from "@clerk/clerk-react";
import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
	throw "Missing Publishable Key";
}

const clerkPublKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

const queryClient = new QueryClient();

function App() {
	const [isError, setIsError] = useState<boolean>(false);
	const location = useLocation();

	useEffect(() => {
		fetch(
			"https://thankful-ant-30.clerk.accounts.dev/npm/@clerk/clerk-js@4/dist/clerk.browser.js"
		)
			.then(() => setIsError(false))
			.catch((err) => {
				if (err instanceof Error) {
					setIsError(true);
				}
			});
	}, [isError]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [location]);

	if (isError) {
		return (
			<section className="container flex flex-col gap-6 items-center justify-center h-screen text-gray-600">
				<WifiOff className="w-16 h-16 text-gray-400" />
				<h1>
					Something went wrong, please check out your internet connection.
				</h1>
			</section>
		);
	}

	return (
		<ClerkProvider publishableKey={clerkPublKey}>
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<main className="relative">
					<Outlet />
				</main>
				<footer></footer>
			</QueryClientProvider>
		</ClerkProvider>
	);
}

export default App;
