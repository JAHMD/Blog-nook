import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
	throw "Missing Publishable Key";
}

const clerkPublKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

const queryClient = new QueryClient();

function App() {
	return (
		<ClerkProvider publishableKey={clerkPublKey}>
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<main className="container">
					<Outlet />
				</main>
				<footer></footer>
			</QueryClientProvider>
		</ClerkProvider>
	);
}

export default App;
