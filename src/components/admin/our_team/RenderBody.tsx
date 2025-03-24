"use client"
import React, { useState } from "react";
import { TableRow, TableCell } from "@heroui/table";
import { Column } from "@/components/globals/types";
import { OurTeam as Record, OurTeamRow as Row } from "./Types";
import DestroyModal from "@/components/globals/DestroyModal";
import { destroy } from "@/components/admin/our_team/Action";
import Image from "next/image";
import UpdateModal from "./UpdateModal";
import PreviewModal from "@/components/globals/PreviewModal";

const getRecord = (records: Record[], id: string): Record | undefined => {
  return records.find((record) => record.id === id);
};

const RenderBody = (
  records: Record[],
  columns: Column[],
  rows: Row[],
) => {
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onClick = (url: string) => {
    console.log("clicked", url)
    setImageUrl(url);
    setPreviewOpen(true);
  };

  const onCloseModal = () => {
    setPreviewOpen(false);
  };

  const RenderCell = (
    record: Record | undefined,
    column: string,
    row: Row,
  ) => {

    if (!record) return null;

    switch (column) {
      case "imageUrl":
        return record.imageUrl ? (
          <>
            <Image
              src={record.imageUrl}
              alt="Testimonial"
              width={64}
              height={64}
              className="w-16 h-16 rounded-md object-cover"
              onClick={() => onClick(record.imageUrl)}
            />
            {isPreviewOpen && (
              <PreviewModal
                isOpen={isPreviewOpen}
                imageUrl={imageUrl}
                onClose={onCloseModal}
              />
            )}
          </>
        ) : (
          "No Image"
        );

      case "actions":
        return (
          <div className="relative flex items-center space-x-4">
            <UpdateModal record={record} />
            <DestroyModal title="Testimonial" action={destroy} id={record.id} />
          </div>
        );

      default:
        return row[column as keyof Row] ?? "";
    }
  };

  return (
    <>
      {rows.map((row) => {
        const record = getRecord(records, row.id);
        return (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {RenderCell(record, column.key, row)}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
};

export default RenderBody;
