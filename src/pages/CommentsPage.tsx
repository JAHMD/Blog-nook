import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CommentsPage = () => {
	const { user } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/sign-in");
		}
	}, []);
	return <div>CommentsPage</div>;
};

export default CommentsPage;
