"use client";
import React, { useEffect, useState } from "react";
import { getAll, tableFormat } from "@/components/admin/services/Action";
import { getTypes } from "@/components/admin/service_types/Action";
import { getCategories } from "@/components/admin/service_category/Action";
import { Card, CardBody } from "@heroui/card";
import DataTable from "@/components/globals/Datatable";
import RenderBody from "@/components/admin/services/RenderBody";
import TypeRenderBody from "@/components/admin/service_types/RenderBody";
import CategoryRenderBody from "@/components/admin/service_category/RenderBody";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreateModal from "@/components/admin/services/CreateModal";
import CreateTypeModal from "@/components/admin/service_types/CreateModal";
import CreateCategoryModal from "@/components/admin/service_category/CreateModal";
import { Button, ButtonGroup } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { ChevronDoubleDownIcon } from "@heroicons/react/16/solid";

const Data = () => {
  const [data, setData] = useState<any[]>([]);
  const [typeRecords, setTypeRecords] = useState<any[]>([]);
  const [categoryRecords, setCategoryRecords] = useState<any[]>([]);
  const [visibleCard, setVisibleCard] = useState<
    "types" | "categories" | "services"
  >("services");

  const model = "Services";
  const typesModel = "Types";
  const catModel = "Category";

  const columns = [
    { key: "id", name: "ID" },
    { key: "name", name: "Service Name" },
    { key: "description", name: "Description" },
    { key: "category", name: "Category" },
    { key: "type", name: "Type" },
    { key: "price", name: "Price" },
    { key: "duration", name: "Duration" },
    { key: "durationUnit", name: "Duration Unit" },
    { key: "imageUrl", name: "Image" },
    { key: "actions", name: "Actions" },
  ];

  const types = [
    { key: "id", name: "ID" },
    { key: "name", name: "Type Name" },
    { key: "actions", name: "Actions" },
  ];

  const categories = [
    { key: "id", name: "ID" },
    { key: "name", name: "Category Name" },
    { key: "actions", name: "Actions" },
  ];

  const fetchData = async () => {
    try {
      const response = await getAll();
      const formattedRows = await tableFormat(columns, response.records);
      setData(formattedRows);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategoryRecords(response.records);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await getTypes();
      setTypeRecords(response.records);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      await fetchData();
      await fetchCategories();
      await fetchTypes();
    };

    fetchAll();
    const interval = setInterval(fetchAll, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-start gap-4 p-3 m-5">
        <ButtonGroup>
          <Button onPress={() => setVisibleCard("services")}>Services</Button>
          <Button onPress={() => setVisibleCard("types")}>Types</Button>
          <Button onPress={() => setVisibleCard("categories")}>
            Categories
          </Button>
        </ButtonGroup>
      </div>

      <div className="">
        {visibleCard === "types" && (
          <Card className="m-5 md:m-7 p-3">
            <CardBody>
              <DataTable
                model={typesModel}
                records={typeRecords}
                columns={types}
                rows={typeRecords}
                searchKey="Type Name"
                RenderBody={TypeRenderBody}
                visibleColumns={new Set(["name", "actions"])}
              >
                <CreateTypeModal />
              </DataTable>
            </CardBody>
          </Card>
        )}
        {visibleCard === "categories" && (
          <Card className="m-5 md:m-7 p-3">
            <CardBody>
              <DataTable
                model={catModel}
                records={categoryRecords}
                rows={categoryRecords}
                columns={categories}
                searchKey="Category name"
                RenderBody={CategoryRenderBody}
                visibleColumns={new Set(["name", "actions"])}
              >
                <CreateCategoryModal />
              </DataTable>
            </CardBody>
          </Card>
        )}
      </div>

      {visibleCard === "services" && (
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <DataTable
              model={model}
              records={data}
              rows={data}
              columns={columns}
              searchKey="name"
              RenderBody={RenderBody}
              visibleColumns={
                new Set([
                  "name",
                  "category",
                  "type",
                  "price",
                  "duration",
                  "actions",
                ])
              }
              dependencies={{
                type: typeRecords,
                category: categoryRecords,
              }}
            >
              <CreateModal
                category={categoryRecords.map((c) => ({ ...c, id: c.id }))}
                type={typeRecords.map((t) => ({ ...t, id: t.id }))}
              />
            </DataTable>
          </CardBody>
        </Card>
      )}
    </AdminLayout>
  );
};

export default Data;
