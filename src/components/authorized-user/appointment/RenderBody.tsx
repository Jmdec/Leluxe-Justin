"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/table";
import { Column } from "@/components/globals/types";
import { Appointment as Record, AppointmentRow as Row } from "../appointment/Types";
import ChipComponent from "@/components/globals/ChipComponent";
import UpdateModal from "../appointment/UpdateModal";

const getRecord = (records: Record[], id: string) => {
    const userId = typeof window !== "undefined" ? localStorage.getItem('userId') : null;
    if (!userId) return null;
    const record = records.find((record) => record.userId === userId && String(record.id) === id);
    return record || null;
}
const RenderCell = (record: Record, column: string, row: Row) => {
    console.log("Rendering row:", row);
    console.log("Record status:", record.status);

    switch (column) {
        case "status":
            const statusColor = [
                { key: "Pending", label: "Pending", color: "warning" as const },
                { key: "Accepted", label: "Accepted", color: "success" as const },
                { key: "Declined", label: "Cancelled", color: "danger" as const },
                { key: "Rescheduled", label: "Rescheduled", color: "secondary" as const },
                { key: "Done", label: "Done", color: "primary" as const }
            ];

            const statusObj = statusColor.find(status => status.key === record.status);
            console.log("Matched status:", statusObj);
            
            return statusObj ? (
                <ChipComponent status={statusObj.label} size="sm" variant="flat" color={statusObj.color} />
            ) : null;
        

        case "actions":
            return (
                <div className="relative flex justify items-center gap-2">
                    <UpdateModal record={record} action="reschedule" />
                    <UpdateModal record={record} action="decline" />
                </div>
            );
        default:
            return row[column as keyof Row];
    }
};

const RenderBody = (records: Record[], columns: Column[], rows: Row[]) => {

    console.log("Filtered Items:", rows);
    return (
        <>
            {rows.map((row) => {
                console.log("Processing row with ID:", row.id);
                const record = getRecord(records, String(row.id));

                if (!record) return null;
                return (
                    <TableRow key={row.id}>
                        {columns.map((column) => (
                            <TableCell key={column.key}>{RenderCell(record, column.key, row)}</TableCell>
                        ))}
                    </TableRow>
                );
            })}
        </>
    );
};

export default RenderBody;
