import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import BlogPage, { blogLoader } from "./pages/BlogPage.tsx";
import CategoriesPage from "./pages/CategoriesPage.tsx";
import CommentsPage from "./pages/CommentsPage.tsx";
import Home from "./pages/Home.tsx";
import MyPosts from "./pages/MyPosts.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Home />} />
			<Route path="blog" element={<BlogPage />} loader={blogLoader} />
			<Route path="categories" element={<CategoriesPage />} />
			<Route path="comments" element={<CommentsPage />} />
			<Route path="my-posts" element={<MyPosts />} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
