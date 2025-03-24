"use client";

import React, { useEffect, useState } from "react";
import { getNews, tableFormat } from "@/components/admin/news/Action";
import { Card, CardBody } from "@heroui/card";
import DataTable from "@/components/globals/Datatable";
import RenderBody from "@/components/admin/news/RenderBody";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreateModal from "@/components/admin/news/CreateModal";

const News = () => {
    const [data, setData] = useState<any[]>([]);
    const model = "News";

    const columns = [
        { key: "id", name: "ID" },
        { key: "date", name: "Date" },
        { key: "title", name: "Title" },
        { key: "description", name: "Description" },
        { key: "imageUrl", name: "Image" },
        { key: "link", name: "Link" },
        { key: "actions", name: "Actions" },
    ];

    const INITIAL_VISIBLE_COLUMNS = new Set([
        "date",
        "link",
        "title",
        "description",
        "imageUrl",
        "link",
        "actions",
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getNews();
                const formattedRows = await tableFormat(columns, response.records);
                setData(formattedRows);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AdminLayout>
            <Card className="m-5 md:m-7 p-3">
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
                        <CreateModal />
                    </DataTable>
                </CardBody>
            </Card>
        </AdminLayout>
    );
};

export default News;
