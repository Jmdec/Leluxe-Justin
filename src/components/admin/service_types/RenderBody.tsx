"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/table";
import { Column } from "@/components/globals/types";
import {
    Types as Record,
    TypesRow as Row,
} from "./Types";
import UpdateModal from "./UpdateModal";
import DestroyModal from "@/components/globals/DestroyModal";
import { destroy } from "./Action";
const getRecord = (records: Record[], id: number) => {
    console.log("Types", records)
    const record = records.find((record) => {
        return record.id == id;
    }) as Record;
    return record;
};

const RenderCell = (record: Record, column: string, row: Row) => {

    switch (column) {
        case "actions":
            return (
                <div className="relative items-center space-x-4">
                    <UpdateModal record={record} />
                    <DestroyModal title="Category" action={destroy} id={String(record.id)} />
                </div>
            )
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
