"use client";

import React, { useEffect, useState } from "react";
import {
    getAll,
    table_Format,
} from "@/components/admin/our_team/Action";
import { Card, CardBody } from "@heroui/card";
import DataTable from "@/components/globals/Datatable";
import RenderBody from "@/components/admin/our_team/RenderBody";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreateModal from "@/components/admin/our_team/CreateModal";

const OurTeam = () => {
    const [data, setData] = useState<any[]>([]);

    const model = "Our Team";

    const columns = [
        { key: "id", name: "ID" },
        { key: "name", name: "Name" },
        { key: "position", name: "Position" },
        { key: "imageUrl", name: "Image" },
        { key: "actions", name: "Actions" },
    ];

    const INITIAL_VISIBLE_COLUMNS = new Set(["name", "position", "imageUrl", "actions"]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAll();
                const formattedRows = await table_Format(columns, response.records);
                setData(formattedRows);
            } catch (error) {
                console.error("Error fetching team data:", error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AdminLayout>
            <div className="flex">
                <Card className="m-5 md:m-7 p-3 w-full">
                    <CardBody>
                        <DataTable
                            model={model}
                            records={data}
                            columns={columns}
                            rows={data}
                            searchKey="name"
                            RenderBody={RenderBody}
                            visibleColumns={INITIAL_VISIBLE_COLUMNS}
                        >
                            <CreateModal />
                        </DataTable>
                    </CardBody>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default OurTeam;
