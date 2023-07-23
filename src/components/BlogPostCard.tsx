import { Link, NavLink } from "react-router-dom";
import { BlogPostType } from "./NewPost";

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
		postPictureURL,
	} = post;

	return (
		<article
			key={id}
			className="flex flex-col gap-6 bg-primary-card rounded-lg shadow-md shadow-primary-dark/5"
		>
			<div className="rounded-t-lg overflow-hidden relative">
				<span
					className="absolute bottom-0 left-0 h-1/2 bg-gradient-to-t from-primary-dark/80 to-transparent w-full"
					aria-hidden="true"
				></span>
				<img
					src={postPictureURL}
					alt={postPictureURL}
					loading="lazy"
					height={286}
					className="h-[400px] object-cover w-full object-top"
				/>
			</div>

			<NavLink to={`/post/${id}`} state={{ post }} className="mx-4 block group">
				<h2 className="capitalize line-clamp-1 text-lg font-semibold leading-6 group-hover:text-gray-600 transition-colors">
					{title}
				</h2>
				<p className="mt-2 line-clamp-3 text-sm leading-6 text-primary-dark group-hover:text-gray-600 transition-colors">
					{body}
				</p>
			</NavLink>

			<div className="mx-4 flex items-center gap-x-4 text-xs border-b border-primary-border pb-6">
				<p className="rounded-full bg-primary-category px-3 py-1.5 font-medium text-primary-text capitalize">
					{category}
				</p>
				<time dateTime={createdAt} className="text-primary-text">
					{createdAt}
				</time>
			</div>

			<div className="mt-auto px-4 pb-4 relative flex items-center gap-x-4 w-fit">
				<img
					src={authorImage}
					alt="post's author image"
					className="h-10 w-10 rounded-full bg-gray-50"
				/>
				<div className="text-sm leading-6">
					<p className="font-semibold text-gray-900">
						<Link to="/">
							<span className="absolute inset-0" />
							{author}
						</Link>
					</p>
				</div>
			</div>
		</article>
	);
};

export default BlogPostCard;
