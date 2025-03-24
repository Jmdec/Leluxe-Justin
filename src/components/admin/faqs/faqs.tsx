
'use client';

import React, { useEffect, useState } from "react";
import {
    getFAQs,
    formatTable,
} from "@/components/admin/faqs/Action";
import { Card, CardBody } from "@heroui/card";
import DataTable from "@/components/globals/Datatable";
import RenderBody from "@/components/admin/faqs/RenderBody";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreateModal from "@/components/admin/faqs/CreateModal";

const FAQs =  () => {
    const [data, setData] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const response = await getFAQs();
            const formattedRows = await formatTable(columns, response.records);
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


    const model = "Our Team";

    const columns = [
        { key: "id", name: "ID" },
        { key: "question", name: "Question" },
        { key: "answer", name: "Answer" },
        { key: "actions", name: "Actions" },
    ];

    const INITIAL_VISIBLE_COLUMNS = new Set(["question", "answer", "actions"]);


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
                                searchKey="question"
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

export default FAQs;
