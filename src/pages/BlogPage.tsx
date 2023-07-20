import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { getBlogPosts } from "../firebase/firebase";

export const blogLoader = async () => {
	const data = await getBlogPosts();
	return data;
};

const BlogPage = () => {
	const data = useLoaderData();

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<section>
			Blog
			{/* <PagesLoader /> */}
		</section>
	);
};

export default BlogPage;
