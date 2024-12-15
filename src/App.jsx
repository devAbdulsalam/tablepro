import { useState } from 'react';
import { useRef } from 'react';
import TableContent from './components/Table';
import AddContentModal from './components/AddContentModal.jsx';
import DeleteContentModal from './components/DeleteModal.jsx';
import FileNameModal from './components/FileNameModal.jsx';
import { FaPlus } from 'react-icons/fa6';
// import { AiTwotoneEdit } from 'react-icons/ai';
import {
	Document,
	Packer,
	Paragraph,
	Table,
	TableCell,
	TableRow,
	WidthType,
} from 'docx';
import { saveAs } from 'file-saver';

function App() {
	const tableRef = useRef(null);
	const [isDownloading, setIsDownloading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [isFileModal, setIsFileModal] = useState(false);
	// const [isTitleModal, setIsTitleModal] = useState(false);
	const [isEdit, setIsEdit] = useState(null);
	const [isDelete, setIsDelete] = useState(null);
	const [fileName, setFileName] = useState('');
	const [tableData, setTableData] = useState([
		{ id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic perspiciatis quisquam eius nisi tempora, perferendis velit laudantium odit soluta aliquid consectetur labore a voluptas ipsum quae! Repellendus, dicta non ex quas iure quia animi libero explicabo! Repellendus doloremque possimus maiores distinctio recusandae ea id, quia dicta et corporis porro quos dolore quisquam reprehenderit deleniti quaerat voluptatibus voluptatem placeat ipsum. Perferendis nam, dignissimos odit et consectetur in porro vero unde cum rem temporibus! Minus repudiandae quae ducimus facere commodi a voluptate aut possimus animi, cum quia, deserunt, repellat voluptates pariatur ad asperiores? Laboriosam repellat esse amet placeat accusantium obcaecati illum aliquam rem quis ab nostrum, dolor facilis voluptas perferendis quidem odit? Quo at facilis fuga inventore explicabo excepturi dolores maiores dolor corporis recusandae vel nihil quisquam molestias voluptas odio, tempora optio, accusamus ex dicta eveniet autem aliquam ducimus! Unde, tempore. Totam tempore nemo iure minima tempora, aut eius repellat delectus sed reprehenderit dolor ratione quisquam explicabo impedit sit cumque ut neque excepturi ipsam ad vitae amet consequatur. Cumque illo error amet, aspernatur, fugiat porro consequatur impedit magnam quae aliquid voluptatibus modi natus vel pariatur sapiente eligendi. Voluptatum, magni officia tempora ipsum animi laborum voluptates doloribus quidem amet at! Est, esse magni?' },
		{
			id: 2,
			content:
				'lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, quae. loremjhddddddddddddddddddddddd',
		},
		{
			id: 2,
			content:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic perspiciatis quisquam eius nisi tempora, perferendis velit laudantium odit soluta aliquid consectetur labore a voluptas ipsum quae! Repellendus, dicta non ex quas iure quia animi libero explicabo! Repellendus doloremque possimus maiores distinctio recusandae ea id, quia dicta et corporis porro quos dolore quisquam reprehenderit deleniti quaerat voluptatibus voluptatem placeat ipsum. Perferendis nam, dignissimos odit et consectetur in porro vero unde cum rem temporibus! Minus repudiandae quae ducimus facere commodi a voluptate aut possimus animi, cum quia, deserunt, repellat voluptates pariatur ad asperiores? Laboriosam repellat esse amet placeat accusantium obcaecati illum aliquam rem quis ab nostrum, dolor facilis voluptas perferendis quidem odit? Quo at facilis fuga inventore explicabo excepturi dolores maiores dolor corporis recusandae vel nihil quisquam molestias voluptas odio, tempora optio, accusamus ex dicta eveniet autem aliquam ducimus! Unde, tempore. Totam tempore nemo iure minima tempora, aut eius repellat delectus sed reprehenderit dolor ratione quisquam explicabo impedit sit cumque ut neque excepturi ipsam ad vitae amet consequatur. Cumque illo error amet, aspernatur, fugiat porro consequatur impedit magnam quae aliquid voluptatibus modi natus vel pariatur sapiente eligendi. Voluptatum, magni officia tempora ipsum animi laborum voluptates doloribus quidem amet at! Est, esse magni?',
		},
	]);
	const generateTable = (data) => {
		const rows = data.map(
			(row) =>
				new TableRow({
					children: [
						new TableCell({
							children: [new Paragraph(row.id.toString())],
						}),
						new TableCell({
							children: [new Paragraph(row.content)],
						}),
					],
				})
		);

		return new Table({
			rows: [
				new TableRow({
					children: [
						new TableCell({
							children: [new Paragraph('S/N')],
							width: { size: 50, type: WidthType.PERCENTAGE },
						}),
						new TableCell({
							children: [new Paragraph('Content')],
							width: { size: 50, type: WidthType.PERCENTAGE },
						}),
					],
				}),
				...rows,
			],
		});
	};

	const downloadDocx = async () => {
		setIsDownloading(true);
		const doc = new Document({
			sections: [
				{
					children: [
						new Paragraph({
							text: 'Table Data',
							heading: 'Heading1',
						}),
						generateTable(tableData),
					],
				},
			],
		});

		const blob = await Packer.toBlob(doc);
		saveAs(blob, `${fileName}.docx`);
		setIsDownloading(false);
	};

	const handleDelete = (id) => {
		setIsDelete(id);
	};

	const handleEdit = (item) => {
		// const data = tableData.find((item) => item.id === id);
		// console.log('data', data);
		setIsEdit(item);
		setIsModal(true);
	};
	/*************  ✨ Codeium Command ⭐  *************/
	/**
	 * Opens the modal for adding new content by setting the edit state to null
	 * and displaying the modal.
	 */
	/******  ab93d49c-fc86-489e-8a9c-1cf19064a7e1  *******/
	const handleAdd = () => {
		setIsEdit(null);
		setIsModal(true);
	};

	return (
		<main className="relative h-screen px-8 py-8 bg-slate-100">
			<h1 className="text-3xl font-bold text-center my-4">
				Table Data
				{/* <AiTwotoneEdit onClick={() => setIsTitleModal(true)} />				 */}
			</h1>
			{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic perspiciatis quisquam eius nisi tempora, perferendis velit laudantium odit soluta aliquid consectetur labore a voluptas ipsum quae! Repellendus, dicta non ex quas iure quia animi libero explicabo! Repellendus doloremque possimus maiores distinctio recusandae ea id, quia dicta et corporis porro quos dolore quisquam reprehenderit deleniti quaerat voluptatibus voluptatem placeat ipsum. Perferendis nam, dignissimos odit et consectetur in porro vero unde cum rem temporibus! Minus repudiandae quae ducimus facere commodi a voluptate aut possimus animi, cum quia, deserunt, repellat voluptates pariatur ad asperiores? Laboriosam repellat esse amet placeat accusantium obcaecati illum aliquam rem quis ab nostrum, dolor facilis voluptas perferendis quidem odit? Quo at facilis fuga inventore explicabo excepturi dolores maiores dolor corporis recusandae vel nihil quisquam molestias voluptas odio, tempora optio, accusamus ex dicta eveniet autem aliquam ducimus! Unde, tempore. Totam tempore nemo iure minima tempora, aut eius repellat delectus sed reprehenderit dolor ratione quisquam explicabo impedit sit cumque ut neque excepturi ipsam ad vitae amet consequatur. Cumque illo error amet, aspernatur, fugiat porro consequatur impedit magnam quae aliquid voluptatibus modi natus vel pariatur sapiente eligendi. Voluptatum, magni officia tempora ipsum animi laborum voluptates doloribus quidem amet at! Est, esse magni?</p> */}
			<div className="bg-white rounded-sm my-4">
				<TableContent
					tableRef={tableRef}
					tableData={tableData}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
				/>
			</div>
			<div className="flex gap-4">
				<button
					className="px-4 py-2 font-medium text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
					onClick={handleAdd}
				>
					<FaPlus />
				</button>
				<button
					className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
					disabled={isDownloading}
					onClick={() => setIsFileModal(true)}
				>
					{isDownloading ? 'Downloading...' : 'Export to Word'}
				</button>
			</div>
			<AddContentModal
				show={isModal}
				setShow={setIsModal}
				setLoading={setIsLoading}
				loading={isLoading}
				data={tableData}
				setData={setTableData}
				isEdit={isEdit}
			/>
			<DeleteContentModal
				show={isDelete}
				setShow={setIsDelete}
				setLoading={setIsLoading}
				loading={isLoading}
				data={tableData}
				setData={setTableData}
				isDelete={isDelete}
			/>
			<FileNameModal
				show={isFileModal}
				setShow={setIsFileModal}
				setLoading={setIsLoading}
				loading={isLoading}
				name={fileName}
				setName={setFileName}
				handleDownLoad={downloadDocx}
			/>
			{/* <FileTitleModal
				show={isFileModal}
				setShow={setIsFileModal}
				setLoading={setIsLoading}
				loading={isLoading}
				name={fileName}
				setName={setFileName}
				handleDownLoad={downloadDocx}
			/> */}
		</main>
	);
}

export default App;
