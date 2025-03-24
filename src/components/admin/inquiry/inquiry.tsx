
'use client';

import React, { useEffect, useState } from "react";
import {
  getInquiry,
  tableFormat,
} from "@/components/admin/inquiry/Action";
import { Card, CardBody } from "@heroui/card";
import DataTable from "@/components/globals/Datatable";
import RenderBody from "@/components/admin/inquiry/RenderBody";
import AdminLayout from "@/components/admin/layout/AdminLayout";

const Inquiry =  () => {
    const [data, setData] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const response = await getInquiry();
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

  const model = "Inquiry";

  const columns = [
    { key: "id", name: "ID" },
    { key: "fullname", name: "Full Name" },
    { key: "phonenumber", name: "Phone Number" },
    { key: "email", name: "Email" },
    { key: "message", name: "Message" },
    { key: "reply", name: "Reply" },
    { key: "actions", name: "Actions" },
  ];

  const INITIAL_VISIBLE_COLUMNS = new Set(["fullname", "email","message","phonenumber", "reply","actions"]);

  

  return (
    <>
      <AdminLayout>
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            {/* <h1 className="text-lg font-semibold mb-3">
              {model.toUpperCase()}
            </h1> */}

            <DataTable
              model={model}
              records={data}
              columns={columns}
              rows={data}
              searchKey="fullname"
              RenderBody={RenderBody}
              visibleColumns={INITIAL_VISIBLE_COLUMNS}
            >
              <>
              </>
            </DataTable>
          </CardBody>
        </Card>
      </AdminLayout>
    </>
  );
};

export default Inquiry;
