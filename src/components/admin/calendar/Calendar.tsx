"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card } from "@heroui/card";

const events = [
    { title: "Facial Treatment", start: new Date() }, 
    { title: "Consultation", start: new Date(new Date().setDate(new Date().getDate() + 2)) }, 
    { title: "Aromatherapy Session", start: new Date(new Date().setDate(new Date().getDate() + 5)) } 
];

export default function Calendar() {
    const renderEventContent = (eventInfo: any) => {
        return (
            <div className="bg-amber-100 text-black p-2 rounded-md text-sm">
                <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
            </div>
        );
    };

    return (
        <div className="flex justify-center items-center">
            <Card className="bg-white sm:p-10 rounded-lg shadow-lg w-full max-w-full sm:max-w-5xl mx-auto overflow-auto">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventContent={renderEventContent}
                    height="auto"
                    contentHeight="auto"
                />
            </Card>
        </div>
    );
}
