/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@clerk/clerk-react";
import { Image, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { SubmitHandler, useForm } from "react-hook-form";
import { handlePictureSetup, uploadPostToFirebase } from "../firebase/firebase";

type PropsType = {
	closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PictureFileType = {
	[index: string]: string;
	name: string;
};

type Inputs = {
	title: string;
	body: string;
	category: string;
	picture: {
		0: Blob;
	};
};

export type BlogPostType = {
	id: string;
	title: string;
	body: string;
	category: string;
	postPictureURL: string;
	author: string;
	authorImage: string;
	userId: string | undefined;
	createdAt: string;
};

const NewPost = ({ closeModal }: PropsType) => {
	const { user } = useUser();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (formData) => {
		const { body, category, title, picture } = formData;
		const postId = nanoid();
		const url = await handlePictureSetup(picture[0], postId);

		const post: BlogPostType = {
			id: postId,
			body,
			category,
			title,
			postPictureURL: url,
			author: user?.fullName || "Unknown user",
			authorImage: user?.imageUrl || "",
			userId: user?.id,
			createdAt: new Date().toDateString(),
		};

		await uploadPostToFirebase(post);
		closeModal(false);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="p-6 bg-primary-card rounded-lg w-[500px] max-w-full flex flex-col gap-y-6 text-primary-dark"
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

			<div className="field">
				<label htmlFor="post-image" className="block font-medium tracking-wide">
					Image
				</label>
				<label
					htmlFor="post-image"
					className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
				>
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<Image className="mx-auto h-8 w-8 stroke-gray-400 mb-4" />
						<p className="mb-2 text-sm text-gray-500">
							<span className="font-semibold">Click to upload</span> or drag and
							drop
						</p>
						<p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
					</div>

					<input
						{...register("picture", { required: "Post picture is required" })}
						id="post-image"
						type="file"
						className="hidden"
						accept=".jpg, .jpeg, .png"
					/>
				</label>
				{errors.picture ? (
					<p className="err">{errors.picture.message}</p>
				) : null}
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
