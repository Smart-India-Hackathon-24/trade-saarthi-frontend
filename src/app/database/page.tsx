import React from 'react'
import { getBackendUrl } from '@/utils/getBackendUrl'

interface TitleData {
    Title_Name: string;
    Title_Code: string;
    Auto_id: string;
}

export default async function page() {
    try {
        const backendUrl = getBackendUrl();
        const response = await fetch(`${backendUrl}/title/alldata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();

        // Ensure data is an array
        const dataJson: TitleData[] = Array.isArray(data) ? data : [data];
        console.log("dataJson: ", dataJson);

        return (
            <div className="p-8">
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
                            {dataJson.map((item: TitleData, index: number) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } catch (error) {
        console.error("Error fetching data:", error);
        return (
            <div className="p-8 text-red-600">Error loading data</div>
        )
    }
}
