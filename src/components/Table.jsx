/* eslint-disable react/prop-types */

function Table({ tableRef, tableData, handleDelete, handleEdit }) {
	return (
		<table ref={tableRef} className="min-w-full divide-y divide-gray-200">
			<thead>
				<tr>
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						S/N
					</th>
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">
						Content
					</th>
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">
						Action
					</th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{tableData?.map((item, index) => {
					// console.log(item);
					return (
						<tr key={index}>
							<td className="px-6 py-4 whitespace-nowrap  flex justify-center ">
								{item.id || index + 1}
							</td>
							<td className="px-6 py-4">{item.content}</td>
							<td className="p-3 px-5 flex justify-end">
								<button
									type="button"
									onClick={() => handleEdit(item)}
									className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
								>
									Edit
								</button>
								<button
									type="button"
									onClick={() => handleDelete(item.id)}
									className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
								>
									Delete
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default Table;
