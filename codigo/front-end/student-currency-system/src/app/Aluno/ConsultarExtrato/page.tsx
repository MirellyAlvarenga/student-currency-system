"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import { student as studentMock } from "../../../utils/mockData";

export default function ExtratoMoedas() {
    const [filtroTipo, setFiltroTipo] = useState<string>("ALL");
    const [periodo, setPeriodo] = useState<string>("ALL");

    const filtrarTransacoes = () => {
        return studentMock.transactions.filter((t) => {
            const tipoValido = filtroTipo === "ALL" || t.type === filtroTipo;
            // filtro de período simplificado
            return tipoValido;
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Extrato de Moedas</h1>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <Select onValueChange={setFiltroTipo} defaultValue="ALL">
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">Todos</SelectItem>
                        <SelectItem value="GAIN">Ganho</SelectItem>
                        <SelectItem value="SPEND">Gasto</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={setPeriodo} defaultValue="ALL">
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrar por período" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">Todos os períodos</SelectItem>
                        <SelectItem value="7D">Últimos 7 dias</SelectItem>
                        <SelectItem value="30D">Últimos 30 dias</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Quantidade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filtrarTransacoes().map((t) => (
                        <TableRow key={t.id}>
                            <TableCell>{format(new Date(t.date), "dd/MM/yyyy")}</TableCell>
                            <TableCell>{t.description}</TableCell>
                            <TableCell>
                                <Badge variant={t.type === "GAIN" ? "secondary" : "destructive"}>
                                    {t.type === "GAIN" ? "Ganho" : "Gasto"}
                                </Badge>
                            </TableCell>
                            <TableCell className={t.type === "GAIN" ? "text-emerald-600" : "text-rose-500"}>
                                {t.type === "GAIN" ? `+${t.amount}` : `-${t.amount}`}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
