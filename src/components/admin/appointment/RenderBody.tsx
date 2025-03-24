"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/table";
import { Column } from "@/components/globals/types";
import {
    Appointment as Record,
    AppointmentRow as Row,
} from "./Types";
import ChipComponent from "@/components/globals/ChipComponent";
import UpdateModal from "./UpdateModal";


const getRecord = (records: Record[], id: Number) => {
    const record = records.find((record) => {
        return record.id == id;
    }) as Record;
    return record;
};

const RenderCell = (record: Record, column: string, row: Row) => {

    console.log("Render Cell", record);
    switch (column) {
        case "status":
            const statusColor = [
                { key: "Pending", label: "Pending", color: "warning" as "warning" },
                { key: "Accepted", label: "Accepted", color: "success" as "success" },
                { key: "Declined", label: "Declined", color: "danger" as "danger" },
                { key: "Rescheduled", label: "Rescheduled", color: "secondary" as "secondary" },
                { key: "Done", label: "Done", color: "primary" as "primary" }
            ];

            const statusObj = statusColor.find(status => status.key === record.status);

            return statusObj ? (
                <ChipComponent
                    status={statusObj.label}
                    size="sm"
                    variant="flat"
                    color={statusObj.color}
                />
            ) : null;
        case "actions":
            return (
               <div className="relative flex items-center space-x-4">
                    <UpdateModal record={record} action="approve" />
                    <UpdateModal record={record} action="reschedule" />
                    <UpdateModal record={record} action="decline" />

                    {/* <DestroyModal title="Collection" action={destroy} id={String(record.id)} /> */}
                </div>
            );
        default:
            return row[column as keyof Row];
    }
};

const RenderBody = (records: Record[], columns: Column[], rows: Row[]) => {
    return (
        <>
            {rows.map((row) => (
                <TableRow key={row.id}>
                    {columns.map((column) => (
                        <TableCell key={column.key}>
                            {RenderCell(
                                getRecord(records, Number(row.id)),
                                column.key,
                                row
                            )}

                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
};

export default RenderBody;
