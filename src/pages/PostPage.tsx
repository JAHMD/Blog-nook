import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { BlogPostType } from "../components/NewPost";
import PagesLoader from "../components/PagesLoader";
import { getSingleBlogPost } from "../firebase/firebase";

const PostPage = () => {
	const { id: paramId } = useParams();
	const [isImageClicked, setIsImageClicked] = useState<boolean>(false);

	const { isLoading, error, data } = useQuery({
		queryKey: `post-${paramId!}`,
		queryFn: () => getSingleBlogPost(paramId!),
	});

	if (isLoading) {
		return <PagesLoader />;
	}

	if (error) {
		return (
			<section className="pt-0 flex items-center justify-center">
				<p>'An error has occurred: ' + error.message</p>;
			</section>
		);
	}

	const {
		author,
		authorImage,
		body,
		category,
		createdAt,
		title,
		postPictureURL,
	} = data as BlogPostType;

	const handleImageClick = () => {
		setIsImageClicked(true);
	};

	return (
		<section className="pt-0 container space-y-6 w-[800px] max-w-full px-6">
			<div className="overflow-hidden">
				<img
					src={postPictureURL}
					alt={postPictureURL}
					loading="lazy"
					height={600}
					className="w-full cursor-pointer"
					onClick={handleImageClick}
				/>
				{isImageClicked ? (
					<Modal closeModal={setIsImageClicked}>
						<img
							src={postPictureURL}
							alt={postPictureURL}
							loading="lazy"
							className="w-[600px] max-w-full rounded-lg"
							onClick={handleImageClick}
						/>
					</Modal>
				) : null}
			</div>

			<div>
				<h2 className="capitalize text-lg font-semibold leading-6">{title}</h2>
				<p className="mt-2 line-clamp-3 text-sm leading-6 text-primary-dark">
					{body}
				</p>
			</div>

			<div className="flex items-center gap-x-4 text-xs border-b border-primary-border pb-6">
				<Link
					to={`/categories/${category}`}
					className="rounded-full bg-primary-category px-3 py-1.5 font-medium text-primary-text capitalize hover:bg-primary-category/70 transition-colors"
				>
					{category}
				</Link>
				<time dateTime={createdAt} className="text-primary-text">
					{createdAt}
				</time>
			</div>

			<div className="relative flex items-center gap-x-4">
				<img
					src={authorImage}
					alt="post's author image"
					className="h-10 w-10 rounded-full bg-gray-50"
				/>
				<div className="text-sm leading-6">
					<p className="font-semibold text-primary-dark">
						<Link to="/">
							<span className="absolute inset-0" />
							{author}
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default PostPage;
