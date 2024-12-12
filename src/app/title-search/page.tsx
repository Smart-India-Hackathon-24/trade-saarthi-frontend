import React from 'react'
import { getBackendUrl } from '@/utils/getBackendUrl'
import TableSearchSection from '@/components/TitleSearch/TableSearchSection';

interface TitleData {
    Title_Name: string;
    Title_Code: string;
    Auto_id: string;
}

export default async function page() {
    try {
        const backendUrl = getBackendUrl();
        const response = await fetch(`${backendUrl}/title/alldata?limit=1024&show_soundex=true&show_metaphone=true&show_double_metaphone_primary=true&show_double_metaphone_secondary=true&show_nysiis=true`, {
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
            <TableSearchSection dataJson={dataJson} />
        )
    } catch (error) {
        console.error("Error fetching data:", error);
        return (
            <div className="p-8 text-red-600">Error loading data</div>
        )
    }
}
