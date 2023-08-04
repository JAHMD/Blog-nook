import { initializeApp } from "firebase/app";
import {
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	limit,
	orderBy,
	query,
	setDoc,
	updateDoc,
} from "firebase/firestore/lite";

import { CommentType } from "../components/Comment";
import { BlogPostType, UserDataType } from "../pages/NewPost";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
	authDomain: "blog-nook.firebaseapp.com",
	projectId: "blog-nook",
	storageBucket: "blog-nook.appspot.com",
	messagingSenderId: "417250659878",
	appId: "1:417250659878:web:64435ffef771203edce0e7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Blog -> getting data --------------------------------------
export async function getBlogPosts() {
	const blogCol = collection(db, "blog");
	const q = query(blogCol, orderBy("id", "desc"));
	try {
		const blogSnap = await getDocs(q);
		if (!blogSnap.empty) {
			return blogSnap.docs.map((doc) => doc.data());
		}
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
	}
}

export async function getLatestPosts() {
	const blogCol = collection(db, "blog");
	const q = query(blogCol, orderBy("id", "desc"), limit(3));
	try {
		const blogSnap = await getDocs(q);
		if (!blogSnap.empty) {
			return blogSnap.docs.map((doc) => doc.data());
		}
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message);
	}
}

export async function getSingleBlogPost(id: string) {
	const ref = doc(db, "blog", id);
	const docSnap = await getDoc(ref);
	if (docSnap.exists()) {
		return docSnap.data();
	}
}

// Blog -> uploading data ------------------------------------
export async function uploadPostToFirebase(post: BlogPostType) {
	const { id } = post;
	const docRef = doc(db, "blog", id);
	await setDoc(docRef, post);
}

// Delete blog post ------------------------------------------
export async function deletePost(userId: string, post: BlogPostType) {
	const postRef = doc(db, "blog", post.id);
	const userRef = doc(db, "users", userId);

	await deleteDoc(postRef);
	await updateDoc(userRef, { posts: arrayRemove(post) });
}

export async function deleteComment(userId: string, comment: CommentType) {
	const postRef = doc(db, "blog", comment.postId);
	const userRef = doc(db, "users", userId);

	await updateDoc(postRef, { comments: arrayRemove(comment) });
	await updateDoc(userRef, { comments: arrayRemove(comment) });
}

// Users -> Handlling user data ------------------------------
export async function isUserExists(userId: string) {
	const docRef = doc(db, "users", userId);
	const docSnap = await getDoc(docRef);
	return docSnap.exists();
}

export async function addNewUser(user: UserDataType) {
	const docRef = doc(db, "users", user.id);
	await setDoc(docRef, user);
}

export async function uploadUserPosts(userId: string, newPost: BlogPostType) {
	const docRef = doc(db, "users", userId);
	const docSnap = await getDoc(docRef);

	const data = docSnap.data() as UserDataType;
	const updatedPosts = [newPost, ...data.posts];
	await updateDoc(docRef, { ...data, posts: updatedPosts });
}

export async function getUserData(id: string) {
	const docRef = doc(db, "users", id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data() as UserDataType;
	}
}

// comments: add comment
export async function addComment(comment: CommentType, postId: string) {
	const postRef = doc(db, "blog", postId);
	const userRef = doc(db, "blog", postId);

	await updateDoc(postRef, { comments: arrayUnion(comment) });
	await updateDoc(userRef, { comments: arrayUnion(comment) });
}
