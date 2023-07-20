import { initializeApp } from "firebase/app";
import {
	collection,
	doc,
	getDocs,
	getFirestore,
	setDoc,
} from "firebase/firestore/lite";
import { BlogPostType } from "../components/NewPost";

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

export async function getBlogPosts() {
	const blogCol = collection(db, "blog");
	const blogSnap = await getDocs(blogCol);
	const blogList = blogSnap.docs.map((doc) => doc.data());
	return blogList;
}

export async function addPostToBlog(post: BlogPostType) {
	await setDoc(doc(db, "blog", post.id), post);
}
