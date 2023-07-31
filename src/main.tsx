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
import Category from "./pages/Category.tsx";
import CommentsPage from "./pages/CommentsPage.tsx";
import Error from "./pages/Error.tsx";
import Home from "./pages/Home.tsx";
import NewPost from "./pages/NewPost.tsx";
import NotFound from "./pages/NotFound.tsx";
import PostPage from "./pages/PostPage.tsx";
import Signin from "./pages/Signin.tsx";
import UserPosts from "./pages/UserPosts.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={<Error />}>
			<Route index element={<Home />} />
			<Route path="blog" element={<BlogPage />} />

			<Route path="categories">
				<Route index element={<CategoriesPage />} />
				<Route path=":category" element={<Category />} />
			</Route>

			<Route path="comments" element={<CommentsPage />} />
			<Route path="user/:id" element={<UserPosts />} />
			<Route path="write-post" element={<NewPost />} />
			<Route path="post/:id" element={<PostPage />} />
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
