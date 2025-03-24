
'use client';

import React, { useEffect, useState } from "react";
import {
    getAll,
    table_Format,
} from "@/components/admin/videos/Action";
import { Card, CardBody } from "@heroui/card";
import DataTable from "@/components/globals/Datatable";
import RenderBody from "@/components/admin/videos/RenderBody";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreateModal from "@/components/admin/videos/CreateModal";

const Videos =  () => {
    const [data, setData] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const response = await getAll();
            const formattedRows = await table_Format(columns, response.records);
            setData(formattedRows);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);

    const model = "Videos";

    const columns = [
        { key: "id", name: "ID" },
        { key: "title", name: "Video Title" },
        { key: "videoPath", name: "Video" },
        { key: "actions", name: "Actions" },
    ];

    const INITIAL_VISIBLE_COLUMNS = new Set(["title", "videoPath", "actions"]);



    return (
        <>
            <AdminLayout>
                <div className="flex">
                    <Card className="m-5 md:m-7 p-3 w-full">
                        <CardBody>
                            <DataTable
                                model={model}
                                records={data}
                                columns={columns}
                                rows={data}
                                searchKey="title"
                                RenderBody={RenderBody}
                                visibleColumns={INITIAL_VISIBLE_COLUMNS}
                            >
                                <>
                                    <CreateModal />
                                </>
                            </DataTable>
                        </CardBody>
                    </Card>
                </div>
            </AdminLayout>
        </>
    );
};

export default Videos;
