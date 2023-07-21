import { Link } from "react-router-dom";
import { BlogPostType } from "./NewPost";

const BlogPostCard = ({
	author,
	authorImage,
	body,
	category,
	createdAt,
	id,
	title,
	postImage,
}: BlogPostType) => {
	return (
		<article
			key={id}
			className="flex flex-col gap-6 bg-primary-card rounded-lg shadow-md shadow-primary-dark/5"
		>
			<div className="rounded-lg overflow-hidden">
				<img src={postImage} alt="post image" loading="lazy" height={286} />
			</div>

			<div className="mx-4 flex items-center gap-x-4 text-xs border-b border-primary-border pb-4">
				<time dateTime={createdAt} className="text-primary-text">
					{createdAt}
				</time>
				<Link
					to={`/categories`}
					className="rounded-full bg-primary-category px-3 py-1.5 font-medium text-primary-text capitalize hover:bg-primary-category/70 transition-colors"
				>
					{category}
				</Link>
			</div>

			<div className="mx-4 ">
				<h2 className="capitalize text-lg font-semibold leading-6">
					<Link to={`/posts/${id}`}>{title}</Link>
				</h2>
				<p className="mt-2 line-clamp-3 text-sm leading-6 text-primary-dark">
					{body}
				</p>
			</div>

			<div className="px-4 pb-4 relative flex items-center gap-x-4">
				<img
					src={authorImage}
					alt="post's author image"
					className="h-10 w-10 rounded-full bg-gray-50"
				/>
				<div className="text-sm leading-6">
					<p className="font-semibold text-gray-900">
						<a href={author}>
							<span className="absolute inset-0" />
							{author}
						</a>
					</p>
				</div>
			</div>
		</article>
	);
};

export default BlogPostCard;
