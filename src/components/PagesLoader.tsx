import { Loader } from "lucide-react";

const PagesLoader = () => {
	return (
		<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-primary-light">
			<Loader className="mx-auto animate-spin w-8 h-8" />
		</div>
	);
};

export default PagesLoader;
