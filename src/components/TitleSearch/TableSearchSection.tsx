"use client";
import React, { useState } from "react";

interface TitleData {
	Title_Name: string;
	Title_Code: string;
	Auto_id: string;
}

export default function TableSearchSection({ dataJson }: { dataJson: TitleData[] }) {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredData = dataJson.filter((item) =>
		Object.values(item).some((value) =>
			value.toString().toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return (
		<div className="p-8">
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search titles..."
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-300">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
								Title Name
							</th>
							<th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
								Title Code
							</th>
							<th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
								Auto ID
							</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{filteredData.length > 0 ? filteredData.map((item: TitleData, index: number) => (
							<tr
								key={index}
								className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-300">
									{item.Title_Name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-300">
									{item.Title_Code}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-300">
									{item.Auto_id}
								</td>
							</tr>
						)) : (
							<tr>
								<td colSpan={3} className="text-center py-4">No data found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
