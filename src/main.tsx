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
import BlogPage from "./pages/BlogPage.tsx";
import CategoriesPage from "./pages/CategoriesPage.tsx";
import CommentsPage from "./pages/CommentsPage.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import PostPage from "./pages/PostPage.tsx";
import Signin from "./pages/Signin.tsx";
import UserPosts from "./pages/UserPosts.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Home />} />
			<Route path="blog" element={<BlogPage />} />
			<Route path="categories" element={<CategoriesPage />} />
			<Route path="comments" element={<CommentsPage />} />
			<Route path="user-posts" element={<UserPosts />} />
			<Route path="post">
				<Route path=":id" element={<PostPage />} />
			</Route>
			<Route path="sign-in" element={<Signin />} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
