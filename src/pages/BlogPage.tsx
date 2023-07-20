import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { getBlogPosts } from "../firebase/firebase";

type ItemType = {
	id: string;
	userId: string;
	title: string;
	body: string;
	ceratedAt: number | string;
	category: string;
	author: string;
};

export const blogLoader = async () => {
	const data = await getBlogPosts();
	return data;
};

const BlogPage = () => {
	const data = useLoaderData();

	useEffect(() => {
		console.log(data);
	}, [data]);

	return <div>Blog</div>;
};

export default BlogPage;
