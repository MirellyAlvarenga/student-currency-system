"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Toast } from "@/components/ui/toast"; // só o componente
import { student as studentMock } from "../../../utils/mockData";

const catalogoVantagens = [
  { id: 1, nome: "Desconto 10%", descricao: "10% de desconto em lojas parceiras", custo: 50 },
  { id: 2, nome: "Produto Grátis", descricao: "Ganhe um produto grátis selecionado", custo: 120 },
  { id: 3, nome: "Serviço Especial", descricao: "Acesso a serviço premium", custo: 200 },
];

export default function TrocarVantagem() {
  const [openDialog, setOpenDialog] = useState(false);
  const [vantagemSelecionada, setVantagemSelecionada] = useState<typeof catalogoVantagens[0] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null); // state para Toast

  const handleTrocar = (vantagem: typeof catalogoVantagens[0]) => {
    setVantagemSelecionada(vantagem);
    setOpenDialog(true);
  };

  const confirmarTroca = () => {
    setToastMessage("Troca realizada com sucesso!"); // exibe Toast
    setOpenDialog(false);
    setVantagemSelecionada(null);

    // esconde Toast após 3 segundos
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Trocar Moedas por Vantagem</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {catalogoVantagens.map((v) => (
          <Card key={v.id}>
            <CardHeader>
              <CardTitle>{v.nome}</CardTitle>
              <CardDescription>{v.descricao}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <span className="font-semibold">{v.custo} moedas</span>
              <Button onClick={() => handleTrocar(v)}>Trocar</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Troca</DialogTitle>
            <DialogDescription>
              {vantagemSelecionada &&
                `Deseja trocar ${vantagemSelecionada.custo} moedas por "${vantagemSelecionada.nome}"?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={confirmarTroca}>Confirmar troca</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Exibe Toast */}
      {toastMessage && <Toast message={toastMessage} type="success" />}
    </div>
  );
}
