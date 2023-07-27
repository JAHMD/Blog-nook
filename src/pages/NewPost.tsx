/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@clerk/clerk-react";
import { Image, Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { uploadPostToFirebase, uploadUserPosts } from "../firebase/firebase";

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

export type UserDataType = {
	id: string;
	name: string;
	imageURL: string;
	posts: BlogPostType[];
};

const NewPost = () => {
	const navigate = useNavigate();
	const { user } = useUser();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (formData) => {
		const { body, category, title, picture } = formData;
		const postId = new Date().getTime().toString();

		// getting picture url
		const pictureUrl: string | null = await new Promise((resolve) => {
			const reader = new FileReader();
			reader.readAsDataURL(picture[0]);

			reader.onloadend = () => {
				const url = reader.result as string | null;
				resolve(url);
			};
		});

		const post: BlogPostType = {
			id: postId,
			body,
			category,
			title,
			postPictureURL:
				pictureUrl ||
				"https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg",
			author: user?.fullName || "Unknown user",
			authorImage: user?.imageUrl || "",
			userId: user?.id,
			createdAt: new Date().toDateString(),
		};

		const userData = {
			id: user?.id,
			name: user?.fullName,
			imageURL: user?.imageUrl,
			posts: [],
		} as UserDataType;

		await uploadUserPosts(userData, post);
		await uploadPostToFirebase(post);
		navigate("/user-posts");
	};

	return (
		<section className="container w-[700px]">
			{isSubmitting ? (
				<div className="p-10 z-30 fixed top-0 left-0 w-full overflow-hidden h-full grid place-content-center bg-primary-light/30">
					<Loader2 className="text-primary-dark w-10 h-10 animate-spin" />
				</div>
			) : null}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="p-6 w-full rounded-lg flex flex-col gap-y-6 text-primary-dark"
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
					<label
						htmlFor="post-image"
						className="block font-medium tracking-wide"
					>
						Image
					</label>
					<label
						htmlFor="post-image"
						className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary-border border-dashed rounded-lg cursor-pointer bg-primary-card hover:bg-primary-card/60 transition-colors"
					>
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Image className="mx-auto h-8 w-8 stroke-gray-400 mb-4" />
							<p className="mb-2 text-sm text-gray-500">
								<span className="font-semibold">Click to upload</span> or drag
								and drop
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

				<div className="flex gap-6 w-full text-center">
					<Link to="/user-posts" className="btn btn-alt flex-1">
						Back
					</Link>
					<button
						className="btn btn-primary flex-1 text-white disabled:bg-gray-600 disabled:cursor-not-allowed"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<Loader2 className="mx-auto animate-spin" />
						) : (
							"Submit"
						)}
					</button>
				</div>
			</form>
		</section>
	);
};

export default NewPost;
