/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@clerk/clerk-react";
import { SendHorizonal } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { addComment } from "../firebase/firebase";

export type CommentType = {
	userId: string;
	userName: string;
	userImg: string;
	comment: string;
	createdAt: string;
};

const Comment = ({
	comment,
	userId,
	userName,
	createdAt,
	userImg,
}: CommentType) => {
	return (
		<div className="bg-primary-card rounded-lg p-4 shadow-md shadow-primary-dark/10 flex-col flex gap-2 text-sm">
			<div className="flex items-center gap-4">
				<Link to={`/user/${userId}`} className="w-fit flex gap-2 items-center">
					<img
						src={userImg}
						alt={`${userName} image`}
						className="w-8 rounded-full aspect-square"
					/>
					<h3 className="text-primary-dark font-semibold">{userName} </h3>
				</Link>
				<span className="inline-block text-primary-text text-xs font-normal">
					{createdAt}
				</span>
			</div>
			<p className="leading-5 tracking-wide">{comment}</p>
		</div>
	);
};

type Inputs = {
	comment: string;
};

type PropsType = {
	postId: string;
	comments: CommentType[];
};

const Comments = ({ postId, comments }: PropsType) => {
	const { user } = useUser();

	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async ({ comment }) => {
		const userId = user?.id as string;
		const userName = user?.fullName as string;
		const userImg = user?.imageUrl as string;

		const newComment: CommentType = {
			userId,
			userName,
			userImg,
			comment,
			createdAt: new Date().toLocaleString(),
		};

		await addComment(newComment, postId);
		resetField("comment");
		location.reload();
	};

	return (
		<div className="bg-primary-dark/10 px-6 rounded-lg pb-4 flex flex-col gap-4 h-[400px] w-full mt-4">
			{isSubmitting ? (
				<div className="p-10 z-30 fixed top-0 left-0 w-full overflow-hidden h-full grid place-content-center bg-primary-light/40"></div>
			) : null}
			<form className="relative py-4" onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					id="comment"
					placeholder="What do you think?"
					className="py-3 placeholder:text-sm"
					{...register("comment", {
						required: "You have to write something.",
					})}
				/>

				<button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-text hover:text-primary-dark transition-colors">
					<SendHorizonal />
				</button>
				{errors.comment ? (
					<p className="err absolute -bottom-1 left-1">
						{errors.comment.message}
					</p>
				) : null}
			</form>
			<div className="comments overflow-y-auto flex flex-col gap-4 rounded-lg pb-4">
				{comments.map((comment) => (
					<Comment key={comment.comment} {...comment} />
				))}
			</div>
		</div>
	);
};

export default Comments;
