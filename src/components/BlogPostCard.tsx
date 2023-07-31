import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPostType } from "../pages/NewPost";

type PropsType = {
	post: BlogPostType;
};

const BlogPostCard = ({ post }: PropsType) => {
	const {
		author,
		authorImage,
		body,
		category,
		createdAt,
		id,
		title,
		userId,
		postPictureURL,
	} = post;

	return (
		<article
			key={id}
			className="flex flex-col gap-4 bg-primary-card rounded-lg shadow-md shadow-primary-dark/5"
		>
			<div className="rounded-t-lg overflow-hidden relative">
				<span
					className="absolute bottom-0 left-0 h-1/2 bg-gradient-to-t from-primary-dark/60 to-transparent w-full"
					aria-hidden="true"
				></span>
				<img
					src={postPictureURL}
					alt={`${title} image`}
					loading="lazy"
					height={350}
					className="h-[350px] object-cover w-full object-top"
				/>
			</div>

			<div className="mx-4 sm:mx-6 block">
				<h2 className="capitalize line-clamp-1 text-lg font-semibold leading-6">
					{title}
				</h2>
				<p className="mt-2 line-clamp-3 text-sm leading-6 text-primary-text">
					{body}
				</p>
			</div>

			<div className="mx-4 sm:mx-6 flex items-center gap-x-4 text-xs">
				<p className="rounded-full bg-primary-category px-3 py-1 font-medium text-primary-dark capitalize">
					{category}
				</p>
				<time dateTime={createdAt} className="text-primary-text">
					{createdAt}
				</time>
				<Link
					to={`/post/${id}`}
					className="ml-auto group flex items-center gap-2 text-xs font-medium underline w-fit shrink-0 text-emerald-400"
				>
					<p className="">Continue reading</p>
					<MoveRight className="w-4 group-hover:animate-bounce" />
				</Link>
			</div>

			<div className="mt-auto mx-4 sm:mx-6 py-4 border-t border-primary-border">
				<Link
					to={`/user/${userId}`}
					className="flex items-center gap-x-4 w-fit"
				>
					<img
						src={authorImage}
						alt="post's author image"
						className="h-10 w-10 rounded-full bg-gray-50"
					/>
					<p className="font-semibold text-sm leading-6">{author}</p>
				</Link>
			</div>
		</article>
	);
};

export default BlogPostCard;
