/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@clerk/clerk-react";
import { Loader2, MoveLeft } from "lucide-react";
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

type CommentType = {
	id: string;
	user: string;
	comment: string;
};

export type BlogPostType = {
	id: string;
	title: string;
	body: string;
	category: string;
	postPictureURL: string;
	author: string;
	authorImage: string;
	userId: string;
	createdAt: string;
	comments: CommentType[];
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

	if (!user) {
		navigate("/sign-in");
		return (
			<section className="pt-0 container flex items-center justify-center">
				<p>You should sign in first</p>;
			</section>
		);
	}

	const onSubmit: SubmitHandler<Inputs> = async (formData) => {
		const { body, category, title, picture } = formData;
		const postId = new Date().getTime().toString();

		const pictureUrl: string | null = await getPictureUrl(picture[0]);

		// setting post info
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
			comments: [],
		};

		// setting user data
		const userData = {
			id: user?.id,
			name: user?.fullName,
			imageURL: user?.imageUrl,
			posts: [],
		} as UserDataType;

		await uploadUserPosts(userData, post);
		await uploadPostToFirebase(post);
		navigate("/user");
	};

	async function getPictureUrl(file: Blob): Promise<string | null> {
		return await new Promise((resolve) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = () => {
				const url = reader.result as string | null;
				resolve(url);
			};
		});
	}

	return (
		<section className="container w-[700px] max-w-full pt-10 min-h-[calc(100vh-90px)]">
			{isSubmitting ? (
				<div className="p-10 z-30 fixed top-0 left-0 w-full overflow-hidden h-full grid place-content-center bg-primary-light/40"></div>
			) : null}

			<Link
				to="/user"
				className="font-semibold text-lg pb-2 border-b-2 border-primary-border hover:border-primary-dark transition-colors w-fit flex items-center gap-3"
			>
				<MoveLeft />
				Back
			</Link>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mt-16 w-full rounded-lg flex flex-col gap-y-6 text-primary-dark"
			>
				<div className="field">
					<label htmlFor="title" className="block font-medium tracking-wide">
						Title
					</label>
					<input
						autoFocus={true}
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
						className="block font-medium tracking-wide text-primary-dark"
					>
						Image
					</label>

					<input
						type="file"
						id="post-image"
						className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-primary-dark cursor-pointer file:bg-primary-category transition-colors file:cursor-pointer"
						accept=".jpg, .jpeg, .png"
						{...register("picture", { required: "Post picture is required" })}
					/>
					<p className="text-sm text-gray-400">SVG, PNG, JPG or GIF.</p>

					{errors.picture ? (
						<p className="err">{errors.picture.message}</p>
					) : null}
				</div>

				<button
					className="btn btn-primary py-3 flex-1 text-white disabled:bg-gray-600 disabled:cursor-not-allowed"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<Loader2 className="mx-auto animate-spin" />
					) : (
						"Submit"
					)}
				</button>
			</form>
		</section>
	);
};

export default NewPost;
