"use client";

import React, { useState } from "react";
import { TableRow, TableCell } from "@heroui/table";
import { Column } from "@/components/globals/types";
import DestroyModal from "@/components/globals/DestroyModal";
import ReplyModal from "./ReplyModal";
import { destroy } from "./Action";
import { Inquiry as Record, InquiryRow as Row } from "./Types";
import { FaPenToSquare } from "react-icons/fa6";
import { Button } from "@heroui/button";

//  

const getRecord = (records: Record[], id: number): Record | undefined => {
    return records.find((record) => Number(record.id) === id);
};

const RenderCell = (
    record: Record | undefined,
    column: string,
    row: Row,
    isReplyOpen: boolean,
    setIsReplyOpen: (open: boolean) => void
) => {
    if (!record) {
        return <span className="text-red-500">⚠ Record not found (ID: {row.id})</span>;
    }

    switch (column) {
        case "actions":
            return (
                <div className="relative flex justify items-center gap-2">
                    <Button size="sm" color="primary" isIconOnly title="Edit" onClick={() => setIsReplyOpen(true)}>
                        <FaPenToSquare size={14} />
                    </Button>
                    <ReplyModal
                        id={record.id}
                        isOpen={isReplyOpen}
                        onClose={() => setIsReplyOpen(false)}
                    />
                    <DestroyModal title="Inquiry" action={destroy} id={String(record.id)} />
                </div>
            );
        default:
            return row[column as keyof Row] ?? "";
    }
};

const RenderBody = (records: Record[], columns: Column[], rows: Row[]) => {
    const [replyModalState, setReplyModalState] = useState<{ [key: number]: boolean }>({});

    const setModalOpen = (id: number, isOpen: boolean) => {
        setReplyModalState((prevState) => ({
            ...prevState,
            [id]: isOpen,
        }));
    };

    return (
        <>
            {rows.map((row) => {
                const rowId = parseInt(row.id, 10) || 0;
                const record = getRecord(records, rowId);

                return (
                    <TableRow key={row.id}>
                        {columns.map((column) => (
                            <TableCell key={column.key}>
                                {RenderCell(record, column.key, row, replyModalState[rowId] || false, (isOpen) =>
                                    setModalOpen(rowId, isOpen)
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                );
            })}
        </>
    );
};

export default RenderBody;
