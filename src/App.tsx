import { ClerkProvider } from "@clerk/clerk-react";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
	throw "Missing Publishable Key";
}

const clerkPublKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

const queryClient = new QueryClient();

function App() {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [location]);

	return (
		<ClerkProvider publishableKey={clerkPublKey}>
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<main className="relative min-h-[calc(100vh-177.6px)]">
					<Outlet />
				</main>
				<Footer />
			</QueryClientProvider>
		</ClerkProvider>
	);
}

export default App;
