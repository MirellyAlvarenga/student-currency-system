"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/components/motionVariants";

const MOCK_EXCHANGES = [
  { id: 1, student: "Ana", reward: "Caneca", date: "2025-10-10T14:30:00", status: "Confirmado" },
  { id: 2, student: "Bruno", reward: "Camiseta", date: "2025-10-12T10:00:00", status: "Pendente" },
  { id: 3, student: "Carla", reward: "Caderno", date: "2025-10-13T16:20:00", status: "Confirmado" },
];

export default function ConsultarTrocas() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [exchanges, setExchanges] = useState(MOCK_EXCHANGES);

  const filtered = exchanges
    .filter(e => e.student.toLowerCase().includes(search.toLowerCase()))
    .filter(e => filterStatus === "Todos" || e.status === filterStatus)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-6 max-w-6xl mx-auto space-y-6"
    >
      <motion.h1 variants={fadeUp} className="text-3xl font-bold">Trocas Realizadas</motion.h1>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Lista de trocas</CardTitle>
          <div className="flex gap-3">
            <Input placeholder="Buscar por aluno" value={search} onChange={e => setSearch(e.target.value)} />
            <Select onValueChange={value => setFilterStatus(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Confirmado">Confirmado</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b">
                <th className="px-4 py-2">Nome do aluno</th>
                <th className="px-4 py-2">Vantagem</th>
                <th className="px-4 py-2">Data da troca</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{e.student}</td>
                  <td className="px-4 py-2">{e.reward}</td>
                  <td className="px-4 py-2">{new Date(e.date).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <Badge variant={e.status === "Confirmado" ? "default" : "outline"}>
                      {e.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
