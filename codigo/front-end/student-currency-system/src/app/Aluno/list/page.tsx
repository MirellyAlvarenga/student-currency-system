"use client";

import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { StudentDTO } from "@/utils/studentData";
import Header from "@/components/HeaderALuno";
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

export default function StudentListPage() {
  const [students, setStudents] = useState<StudentDTO[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await api.get<StudentDTO[]>("/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Erro ao carregar alunos:", err);
      }
    }
    fetchStudents();
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
      await api.delete(`/students/${selectedId}`);
      setStudents((prev) => prev.filter((s) => s.id !== selectedId));
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
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
              Lista de Alunos
            </CardTitle>

            <Link href="/Aluno/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                + Novo Aluno
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>RG</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Moedas</TableHead>
                  <TableHead>Instituição</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500">
                      Nenhum aluno cadastrado
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.cpf}</TableCell>
                      <TableCell>{student.rg}</TableCell>
                      <TableCell>{student.address}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.coins}</TableCell>
                      <TableCell>{student.instituition?.name || "—"}</TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center gap-3">
                          <Link
                            href={`/Aluno/edit/${student.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => openDialog(student.id)}
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

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir este aluno? Essa ação não pode ser
                desfeita.
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
