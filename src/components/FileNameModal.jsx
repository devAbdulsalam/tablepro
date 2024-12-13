/* eslint-disable react/prop-types */
import toast from 'react-hot-toast';
import Modal from './Modal';
import { HiXMark } from 'react-icons/hi2';

const AddContentModal = ({
	show,
	setShow,
	loading,
	setLoading,
	setName,
	name,
	handleDownLoad,
}) => {
	const handleSubmit = () => {
		if (!name) {
			return toast.error('File Name is required');
		}
		setShow(false);
		setLoading(true);
		handleDownLoad(name);
		return;
	};
	return (
		<Modal show={show}>
			<div className="transform overflow-hidden min-w-[400px] rounded-2xl bg-white text-left align-middle shadow-xl transition-all font-josefin max-w-2xl">
				<div className="space-y-5 p-4">
					<div className="flex justify-between">
						<div>
							<p className="font-semibold text-lg text-primary">File Name</p>
						</div>
						<button
							onClick={() => setShow(false)}
							className="m-1 p-1 py-1 shadow rounded-full bg-red-200 hover:bg-red-300 duration-150 ease-in-out"
						>
							<HiXMark className="fa-solid fa-xmark text-xl text-red-600 hover:text-red-800" />
						</button>
					</div>
					<div className="mb-2">
						<input
							placeholder="file name"
							onChange={(e) => setName(e.target.value)}
							className="input p-2 rounded-md resize-none w-full border border-gray6  text-black"
						/>
					</div>
					<button
						disabled={loading}
						className="bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 py-1 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
						onClick={handleSubmit}
					>
						<span>{loading ? 'Downloading...' : 'Download doc'}</span>
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default AddContentModal;
