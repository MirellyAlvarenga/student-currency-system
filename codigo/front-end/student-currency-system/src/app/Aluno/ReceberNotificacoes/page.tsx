"use client";

import React from "react";
import { student as studentMock } from "../../../utils/mockData";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function NotificacoesMoedas() {
    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Notificações de Moedas</h1>

            <div className="space-y-4">
                {studentMock.notifications.map((n) => (
                    <div key={n.id} className="p-4 rounded-lg border hover:bg-gray-50 transition flex justify-between items-center">
                        <div>
                            <div className="font-medium">{n.sender}</div>
                            <div className="text-sm text-gray-500">{format(new Date(n.date), "dd/MM/yyyy HH:mm")}</div>
                        </div>
                        <Badge variant={n.type === "GAIN" ? "secondary" : "destructive"}>
                            {n.type === "GAIN" ? `+${n.amount}` : `-${n.amount}`} moedas
                        </Badge>
                    </div>
                ))}
            </div>
        </div>
    );
}
