'use client';

import React, { useEffect, useState } from "react";
import {
    getAppointments,
    tableFormat,
} from "../appointment/Action";
import { Card, CardBody } from "@heroui/card";
import DataTable from "@/components/globals/Datatable";
import AuthorizedLayout from "../layout/AuthorizedLayout";
import RenderBody from "./RenderBody";

const Appointment = () => {
    const [data, setData] = useState<any[]>([]);
    console.log("Data:", data);

    const fetchData = async () => {
        const userId = localStorage.getItem("userId");
        
        if (!userId) {
            console.error("User not authenticated");
            return;
        }
    
        try {
            const response = await getAppointments(userId);
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
        // { key: "actions", name: "Actions" },
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
        // "actions",
    ]);

    return (
        <>
            <AuthorizedLayout>
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
            </AuthorizedLayout>
        </>
    );
};

export default Appointment;
