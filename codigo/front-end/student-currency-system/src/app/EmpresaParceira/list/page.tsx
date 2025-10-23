"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api";
import Header from "@/components/Header"; 
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CompanyDTO {
  id: number;
  login: string;
  password?: string;
  name: string;
  email: string;
  role: string;
}

export default function list() {
  const [companies, setCompanies] = useState<CompanyDTO[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState(false);

useEffect(() => {
  async function fetchCompanies() {
    try {
      const res = await api.get("/companies");
      console.log("📦 Resposta da API:", res.data);
      console.log("📜 Tipo de res.data:", typeof res.data);
      console.log("✅ É array?", Array.isArray(res.data));

      setCompanies(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      console.error("❌ Erro ao carregar empresas:", err);
      setCompanies([]);
    }
  }
  fetchCompanies();
}, []);

  const openDialog = (id: number) => {
    setSelectedId(id);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setSelectedId(null);
    setShowDialog(false);
  };

  const handleDelete = async () => {
    if (selectedId === null) return;
    try {
      await api.delete(`/companies/${selectedId}`);
      setCompanies((prev) => prev.filter((c) => c.id !== selectedId));
    } catch (error) {
      console.error("Erro ao excluir empresa:", error);
    } finally {
      closeDialog();
    }
  };

  return (
    <>
      <Header />

      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Lista de Empresas
            </CardTitle>

            <Link href="/EmpresaParceira/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                + Nova Empresa
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Login</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      Nenhuma empresa cadastrada
                    </TableCell>
                  </TableRow>
                ) : (
                  companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.login}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>{company.role}</TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center gap-3">
                          <Link
                            href={`/EmpresaParceira/edit/${company.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => openDialog(company.id)}
                            className="text-rose-600 hover:text-rose-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Modal de confirmação */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir esta empresa? Essa ação não pode
                ser desfeita.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button variant="outline" onClick={closeDialog}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="ml-2"
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
