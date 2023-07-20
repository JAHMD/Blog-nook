import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type PropsType = {
	children: ReactNode;
	closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, closeModal }: PropsType) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const clickHandler = (e: MouseEvent) => {
			if (e.target === modalRef.current) {
				closeModal(false);
			}
		};

		document.addEventListener("click", clickHandler);

		return () => {
			document.removeEventListener("click", clickHandler);
		};
	}, [modalRef, closeModal]);

	return createPortal(
		<div
			ref={modalRef}
			className="p-6 fixed top-0 left-0 w-full h-full bg-slate-900/60 flex items-center justify-center flex-col gap-6"
		>
			{children}
		</div>,
		document.body
	);
};

export default Modal;
