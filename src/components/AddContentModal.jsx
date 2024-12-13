/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from './Modal';
import { HiXMark } from 'react-icons/hi2';

const AddContentModal = ({
	show,
	setShow,
	loading,
	setLoading,
	setData,
	data,
	isEdit,
}) => {
	const [content, setContent] = useState('');
	const isEditing = Boolean(isEdit);
	useEffect(() => {
		console.log(isEdit);
		if (isEdit) {
			setContent(isEdit.content || ''); // Handle case where `content` might be undefined
		}
	}, [isEdit, isEditing]);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!content.trim()) {
			return toast.error('Content is required');
		}
		setLoading(true);
		const updatedData = isEditing
			? data.map((item, index) =>
					index === isEdit.index ? { ...item, content } : item
			  )
			: [...data, { id: data.length + 1, content }];

		setData(updatedData);
		setContent('');
		setLoading(false);
		setShow(false);
		return;
	};

	const handleClose = () => {
		setContent('');
		setShow(false);
	};
	return (
		<Modal show={show}>
			<div className="transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all font-josefin min-w-[600px] max-w-2xl">
				<div className="space-y-5 p-4">
					<div className="flex justify-between">
						<div>
							<p className="font-semibold text-lg text-primary">
								{isEdit ? 'Edit' : 'New'} Content{' '}
								<span className="text-red-500">*</span>
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
						<textarea
							placeholder="Add a content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="input p-2 rounded-md h-[200px] md:min-h-[350px] resize-none w-full border border-gray6  text-black"
						></textarea>
					</div>
					<button
						disabled={loading}
						className="bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 py-1 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
						onClick={handleSubmit}
					>
						<span>{isEdit ? 'Update content' : 'Add Content'}</span>
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default AddContentModal;
