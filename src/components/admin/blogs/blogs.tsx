
'use client';

import React, { useEffect, useState } from "react";
import {
    getBlogs,
    tableFormat,
} from "@/components/admin/blogs/Action";
import { Card, CardBody } from "@heroui/card";
import DataTable from "@/components/globals/Datatable";
import RenderBody from "@/components/admin/blogs/RenderBody";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreateModal from "@/components/admin/blogs/CreateModal";

const Blogs =  () => {
    const [data, setData] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const response = await getBlogs();
            const formattedRows = await tableFormat(columns, response.records);
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

    const model = "Blogs";

    const columns = [
        { key: "id", name: "ID" },
        { key: "date", name: "Date" },
        { key: "title", name: "Title" },
        { key: "description", name: "Description" },
        { key: "author", name: "Author" },
        { key: "link", name: "Link" },
        { key: "imageUrl", name: "Image" },
        { key: "actions", name: "Actions" },
    ];

    const INITIAL_VISIBLE_COLUMNS = new Set(["date", "link", "title", "description", "author", "link", "imageUrl", "actions"]);

    return (
        <>
            <AdminLayout>
                <Card className="m-5 md:m-7 p-3">
                    <CardBody>
                        {/* <h1 className="text-lg font-semibold mb-3">
              {model.toUpperCase()}
            </h1> */}

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
            </AdminLayout>
        </>
    );
};

export default Blogs;
