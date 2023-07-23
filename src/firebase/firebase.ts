import { initializeApp } from "firebase/app";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	setDoc,
	updateDoc,
} from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { BlogPostType, UserDataType } from "../components/NewPost";

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

// Blog -> getting data --------------------------------------
export async function getBlogPosts() {
	const blogCol = collection(db, "blog");
	try {
		const blogSnap = await getDocs(blogCol);
		if (!blogSnap.empty) {
			return blogSnap.docs.map((doc) => doc.data());
		}
	} catch (err) {
		if (err instanceof Error) console.log(err.message);
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

// Users -> Handlling user data ------------------------------
export async function uploadUserPosts(
	user: UserDataType,
	newPost: BlogPostType
) {
	const docRef = doc(db, "users", user.id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const data = docSnap.data() as UserDataType;
		const updatedPosts = [...data.posts, newPost];
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

// images -> upload post picture and return back its url. ----
export async function handlePictureSetup(pictureFile: Blob, postId: string) {
	const pictureRef = ref(storage, `images/${pictureFile.name}-${postId}`);
	await uploadBytes(pictureRef, pictureFile);
	return await getDownloadURL(pictureRef);
}
