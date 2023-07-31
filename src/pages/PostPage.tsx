import { useUser } from "@clerk/clerk-react";
import { Loader2, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import PagesLoader from "../components/PagesLoader";
import { deletePost, getSingleBlogPost } from "../firebase/firebase";
import { BlogPostType } from "./NewPost";

const PostPage = () => {
	const { id: paramId } = useParams();
	const { user } = useUser();
	const navigate = useNavigate();

	const [toggleComments, setToggleComments] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [isAlertOprpn, setIsAlertOpen] = useState<boolean>(false);

	const { isLoading, error, data } = useQuery({
		queryKey: `post-${paramId!}`,
		queryFn: () => getSingleBlogPost(paramId!),
	});

	if (isLoading) {
		return <PagesLoader />;
	}

	if (error instanceof Error) {
		return (
			<section className="pt-0 flex items-center justify-center">
				<p>{"An error has occurred: " + error.message}</p>;
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
		id,
		userId,
	} = data as BlogPostType;

	const handleDeletePost = () => {
		void (async () => {
			setIsDeleting(true);
			setIsAlertOpen(false);
			await deletePost(id, userId);
			setIsDeleting(false);
			navigate("/user-posts", { replace: true });
		})();
	};

	return (
		<section className="container flex flex-col gap-8 w-[700px] max-w-full px-6 pt-8">
			{isDeleting ? (
				<div className="p-10 z-30 fixed top-0 left-0 w-full overflow-hidden h-full grid place-content-center bg-primary-light/40"></div>
			) : null}
			{isAlertOprpn ? (
				<Modal closeModal={setIsAlertOpen}>
					<Alert close={setIsAlertOpen} deleteFn={handleDeletePost} />
				</Modal>
			) : null}

			<div className="flex items-center gap-x-4 justify-between">
				<div className="flex items-center gap-x-4">
					<img
						src={authorImage}
						alt="post's author image"
						className="h-10 w-10 rounded-full bg-gray-50"
					/>
					<div className="leading-6">
						<p className="font-semibold text-primary-dark">
							<Link to="/">{author}</Link>
						</p>
					</div>
				</div>

				{user && user.id === userId ? (
					<button
						className="justify-center rounded-md text-sm bg-red-600 px-4 py-2 shadow-red-600/20 shadow-md font-semibold text-primary-light transition-colors hover:bg-red-500"
						onClick={() => setIsAlertOpen(true)}
					>
						{isDeleting ? (
							<Loader2 className="mx-auto animate-spin w-10" />
						) : (
							"Delete"
						)}
					</button>
				) : null}
			</div>

			<div className="overflow-hidden">
				<img
					src={postPictureURL}
					alt={postPictureURL}
					loading="lazy"
					height={600}
					className="w-full rounded-lg"
				/>
			</div>

			<div className="leading-7 tracking-wide text-primary-dark">
				<h2 className="capitalize text-2xl font-bold">{title}</h2>
				<p className="mt-4 text-primary-text">{body}</p>
			</div>

			<div className="flex items-center gap-x-4 justify-between text-xs sm:text-sm border-y border-primary-border py-4">
				<div className="flex items-center gap-x-4">
					<p className="rounded-full bg-primary-category text-xs px-3 py-1 font-medium text-primary-dark capitalize">
						{category}
					</p>
					<time dateTime={createdAt} className="text-primary-text">
						{createdAt}
					</time>
				</div>
				<button
					className="flex items-center gap-2 font-medium capitalize rounded-lg bg-primary-dark/10 hover:bg-primary-dark/20 transition-colors text-primary-text py-2 px-4"
					onClick={() => setToggleComments((oldState) => !oldState)}
				>
					<MessageSquare className="w-4" />
					comments
				</button>
			</div>
			{toggleComments ? (
				<div className="bg-primary-dark/10 p-6 flex flex-col gap-6 h-[400px] overflow-y-auto">
					<p className="bg-primary-card rounded-lg p-4">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
						rem, recusandae illo sit sed necessitatibus, repellendus eos
						eligendi quod consequuntur ab, dolore harum quo pariatur vitae nobis
						ratione id ut.
					</p>
					<p className="bg-primary-card rounded-lg p-4">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
						rem, recusandae illo sit sed necessitatibus, repellendus eos
						eligendi quod consequuntur ab, dolore harum quo pariatur vitae nobis
						ratione id ut.
					</p>
				</div>
			) : null}
		</section>
	);
};

export default PostPage;
