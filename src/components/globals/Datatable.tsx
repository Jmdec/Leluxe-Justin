"use client";

import React, {
  ReactElement,
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
} from "react";
import { SearchIcon } from "@/components/globals/Icons";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
} from "@heroui/table";
import { Column } from "@/components/globals/types";
import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import DropdownComponent from "./ColumnDropdown";
import { Selection } from "@react-types/shared";


type Props = {
  model: string;
  records: any[];
  columns: Column[];
  rows: any[];
  dependencies?: any;
  searchKey: string;
  RenderBody: (
    records: any[],
    columns: Column[],
    rows: any[],
    dependencies: any
  ) => any;
  visibleColumns: Set<string>;
  children?: ReactElement;
};

const DataTable = ({
  model,
  records,
  columns: ufColumns,
  rows,
  searchKey,
  RenderBody,
  dependencies,
  visibleColumns: initialVisibleColumns,
  children,
}: Props) => {
  const columns = ufColumns.filter((ufColumn) => {
    return ufColumn.key != "id";
  });

  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(
    new Set(initialVisibleColumns)
  );

  const headerColumns = useMemo(() => {
    return columns.filter((col) => selectedColumns.has(col.key));
  }, [selectedColumns, columns]);

  const onSelectionChange = (keys: Selection) => {
    setSelectedColumns(new Set([...keys].map(String)));
  };
  
  const filteredItems = useMemo(() => {
    let filteredRows = [...rows];

    if (hasSearchFilter) {
        filteredRows = filteredRows.filter((row) => {
            return columns.some((column) => {
                const cellValue = row[column.key] ? String(row[column.key]).toLowerCase() : "";
                return cellValue.includes(filterValue.toLowerCase());
            });
        });
    }

    return filteredRows;
}, [rows, filterValue, hasSearchFilter, columns]);

 
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <div className="w-full">
              <Input
                isClearable
                className="w-full lg:w-1/2"
                placeholder="Search "
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={() => {
                  console.log("Search cleared");
                  onClear();
                }}
                onChange={(e) => {
                  console.log("Search value:", e.target.value);
                  onSearchChange(e.target.value);
                }}
              />

            </div>
            <div className="flex gap-3">
              <DropdownComponent
                label="Columns"
                items={columns.map((col) => ({ name: col.name, uid: col.key }))}
                selectedKeys={selectedColumns}
                selectionMode="multiple"
                closeOnSelect={false}
                onSelectionChange={onSelectionChange}
              />
              {children}
              {/* <ButtonComponent label="Add New" color="primary" size="md" variant="solid" icon={<PlusIcon />} /> */}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {rows.length}
            </span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </select>
            </label>
          </div>
        </div>
      </>
    );
  }, [
    filterValue,
    onSearchChange,
    onClear,
    onRowsPerPageChange,
    rows.length,
    children,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="p2 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);

  return (
    <>
      <Table
        aria-label="DataTable"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px] flex justify-center",
          table: "overflow-auto text-center",
        }}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={headerColumns} className="items-center text-center">
          {(column) => (
            <TableColumn key={column.key}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={`No ${model} Found`} className="text-center">
          {RenderBody(filteredItems, headerColumns, items, dependencies)}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
