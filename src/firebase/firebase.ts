import { initializeApp } from "firebase/app";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	setDoc,
} from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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
const storage = getStorage(app);

export async function getBlogPosts() {
	const blogCol = collection(db, "blog");
	try {
		const blogSnap = await getDocs(blogCol);
		if (!blogSnap.empty) {
			const blogList = blogSnap.docs.map((doc) => doc.data());
			return blogList;
		}
	} catch (err) {
		if (err instanceof Error) console.log(err.message);
	}
}

export async function getSingleBlogPost(id: string) {
	const ref = doc(db, "blog", id);
	const docSnap = await getDoc(ref);
	if (docSnap.exists()) {
		// Convert to post object
		const post = docSnap.data();
		return post;
	}
}

export async function uploadPostToFirebase(post: BlogPostType) {
	const { id } = post;
	await setDoc(doc(db, "blog", id), post);
}

export async function handlePictureSetup(pictureFile: Blob, postId: string) {
	const pictureRef = ref(storage, `images/${pictureFile.name}-${postId}`);
	await uploadBytes(pictureRef, pictureFile);
	const url = await getDownloadURL(pictureRef);
	return url;
}
