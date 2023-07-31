import { initializeApp } from "firebase/app";
import {
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
export async function deletePost(id: string, userId: string) {
	const postRef = doc(db, "blog", id);
	const userRef = doc(db, "users", userId);

	const docSnap = await getDoc(userRef);
	const data = docSnap.data() as UserDataType;
	const updatedPosts = data?.posts.filter((post) => post.id !== id);

	await updateDoc(userRef, { ...data, posts: updatedPosts });
	await deleteDoc(postRef);
}

// Users -> Handlling user data ------------------------------
export async function uploadUserPosts(
	user: UserDataType,
	newPost: BlogPostType
) {
	const docRef = doc(db, "users", user.id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const data = docSnap.data() as UserDataType;
		const updatedPosts = [newPost, ...data.posts];
		await updateDoc(docRef, { ...data, posts: updatedPosts });
	} else {
		await setDoc(docRef, { ...user, posts: [newPost] });
	}
}

export async function getUserData(id: string | undefined) {
	if (!id) return;

	const docRef = doc(db, "users", id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data() as UserDataType;
	}
}
