/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { SubmitHandler, useForm } from "react-hook-form";
import { addPostToBlog } from "../firebase/firebase";

type PropsType = {
	closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type Inputs = {
	title: string;
	body: string;
	category: string;
};

export type BlogPostType = {
	id: string;
	title: string;
	body: string;
	category: string;
	author: string | undefined | null;
	userId: string | undefined;
};

const NewPost = ({ closeModal }: PropsType) => {
	const { user } = useUser();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (formData) => {
		const { body, category, title } = formData;

		const post: BlogPostType = {
			id: nanoid(),
			body,
			category,
			title,
			author: user?.fullName,
			userId: user?.id,
		};

		await addPostToBlog(post);
		reset();
		closeModal(false);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="p-6 bg-white rounded-lg w-[500px] max-w-full space-y-6 text-slate-900"
		>
			<div className="field">
				<label htmlFor="title" className="block font-medium tracking-wide">
					Title
				</label>
				<input
					id="title"
					type="text"
					placeholder="e.g. Cats."
					{...register("title", {
						required: { value: true, message: "Title is required" },
						minLength: {
							value: 4,
							message: "It should me at least 4 characters",
						},
					})}
				/>
				{errors.title ? <p className="err">{errors.title.message}</p> : null}
			</div>

			<div className="field">
				<label htmlFor="category" className="block font-medium tracking-wide">
					Category
				</label>
				<input
					id="category"
					type="text"
					placeholder="e.g. Animals."
					{...register("category", {
						required: { value: true, message: "Category is required" },
						minLength: {
							value: 4,
							message: "It should me at least 4 characters",
						},
						maxLength: 40,
					})}
				/>
				{errors.category ? (
					<p className="err">{errors.category.message}</p>
				) : null}
			</div>

			<div className="field">
				<label htmlFor="body" className="block font-medium tracking-wide">
					Post content
				</label>
				<textarea
					id="body"
					placeholder="e.g. Cats are beautiful."
					{...register("body", {
						required: { value: true, message: "Post content is required" },
						minLength: {
							value: 10,
							message: "It should me at least 10 characters",
						},
					})}
				/>
				{errors.body ? <p className="err">{errors.body.message}</p> : null}
			</div>

			<button
				className="btn btn-primary w-full text-white disabled:bg-gray-600 disabled:cursor-not-allowed"
				disabled={isSubmitting}
			>
				{isSubmitting ? <Loader2 className="mx-auto animate-spin" /> : "Submit"}
			</button>
		</form>
	);
};

export default NewPost;
