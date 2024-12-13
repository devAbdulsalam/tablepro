/* eslint-disable react/prop-types */
import Modal from './Modal';
import { HiXMark } from 'react-icons/hi2';

const DeleteContentModal = ({
	show,
	setShow,
	loading,
	setLoading,
	setData,
	data,
	isDelete,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setData(data.filter((item) => item.id !== isDelete));
		setLoading(false);
		setShow(false);
		return;
	};
	const handleClose = () => {
		setLoading(false);
		setShow(false);
	};
	return (
		<Modal show={show}>
			<div className="transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all font-josefin min-w-[400px] max-w-2xl">
				<div className="space-y-5 p-4">
					<div className="flex justify-between">
						<div>
							<p className="font-semibold text-lg text-primary">
								Delete Content <span className="text-red-500">*</span>
							</p>
						</div>
						<button
							onClick={handleClose}
							className="m-1 p-1 py-1 shadow rounded-full bg-red-200 hover:bg-red-300 duration-150 ease-in-out"
						>
							<HiXMark className="fa-solid fa-xmark text-xl text-red-600 hover:text-red-800" />
						</button>
					</div>
					<div className="mb-2">
						<p className="font-semibold text-lg text-primary py-5">
							Are you sure you want to delete?
						</p>
					</div>
					<button
						className="bg-red-500 hover:bg-red-700 text-white font-semibold h-10 py-1 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
						onClick={handleSubmit}
					>
						<span>Delete Content</span>
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default DeleteContentModal;
