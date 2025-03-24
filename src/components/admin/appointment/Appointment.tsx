'use client';

import React, { useEffect, useState } from "react";
import {
    getAppointments,
    tableFormat,
} from "@/components/admin/appointment/Action";
import { Card, CardBody } from "@heroui/card";
import DataTable from "@/components/globals/Datatable";
import RenderBody from "@/components/admin/appointment/RenderBody";
import AdminLayout from "@/components/admin/layout/AdminLayout";

const Appointment = () => {
    const [data, setData] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const response = await getAppointments();
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

    const model = "Appointments";
    const columns = [
        { key: "id", name: "ID" },
        { key: "date", name: "Date" },
        { key: "time", name: "Time" },
        { key: "rescheduledDate", name: "Reschedule Date" },
        { key: "fullname", name: "Full Name" },
        { key: "phonenumber", name: "Phone Number" },
        { key: "email", name: "Email" },
        { key: "category", name: "Category" },
        { key: "service", name: "Service" },
        { key: "message", name: "Message" },
        { key: "status", name: "Status" },
        { key: "actions", name: "Actions" },
    ];

    const INITIAL_VISIBLE_COLUMNS = new Set([
        "fullname",
        "email",
        "date",
        "time",
        "rescheduledDate",
        "category",
        "service",
        "message",
        "phonenumber",
        "status",
        "actions",
    ]);

    return (
        <>
            <AdminLayout>
                <Card className="m-5 md:m-7 p-3">
                    <CardBody>
                        <DataTable
                            model={model}
                            records={data} 
                            columns={columns}
                            rows={data} 
                            searchKey="fullname"
                            RenderBody={RenderBody}
                            visibleColumns={INITIAL_VISIBLE_COLUMNS}
                        />
                    </CardBody>
                </Card>
            </AdminLayout>
        </>
    );
};

export default Appointment;
