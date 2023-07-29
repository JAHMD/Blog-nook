import { AlertTriangle } from "lucide-react";

type PropsType = {
	close: React.Dispatch<React.SetStateAction<boolean>>;
	deleteFn: () => void;
};

const Alert = ({ close, deleteFn }: PropsType) => {
	return (
		<div className="flex text-primary-dark bg-primary-light overflow-hidden w-full max-w-[400px] rounded-lg flex-col">
			<div className="flex gap-4 p-4 text-start">
				<AlertTriangle className="text-red-600 shrink-0" />
				<div className="">
					<h2 className="font-bold">Delete post</h2>
					<p className="mt-2 text-primary-text">
						Are you sure you want to delete this post? This action cannot be
						undone.
					</p>
				</div>
			</div>
			<div className="px-4 py-4 sm:flex sm:flex-row-reverse sm:px-6">
				<button
					type="button"
					className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm shadow-red-600/20 shadow-md font-semibold text-primary-light transition-colors hover:bg-red-500 sm:ml-3 sm:w-auto"
					onClick={deleteFn}
				>
					Delete
				</button>
				<button
					type="button"
					className="mt-3 inline-flex w-full justify-center rounded-md px-3 font-semibold py-2 btn-alt text-sm sm:mt-0 sm:w-auto"
					onClick={() => close(false)}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default Alert;
