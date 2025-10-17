"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Toast } from "@/components/ui/toast";
import { motion } from "framer-motion";
import { Gift, Star, Percent, Coins } from "lucide-react"; // ícones adicionados

const catalogoVantagens = [
  {
    id: 1,
    nome: "Desconto 10%",
    descricao: "10% de desconto em lojas parceiras",
    custo: 50,
    icon: <Percent className="text-blue-500 w-8 h-8" />,
  },
  {
    id: 2,
    nome: "Produto Grátis",
    descricao: "Ganhe um produto grátis selecionado",
    custo: 120,
    icon: <Gift className="text-emerald-500 w-8 h-8" />,
  },
  {
    id: 3,
    nome: "Serviço Especial",
    descricao: "Acesso a serviço premium exclusivo",
    custo: 200,
    icon: <Star className="text-yellow-500 w-8 h-8" />,
  },
];

export default function TrocarVantagem() {
  const [openDialog, setOpenDialog] = useState(false);
  const [vantagemSelecionada, setVantagemSelecionada] =
    useState<(typeof catalogoVantagens)[0] | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleTrocar = (vantagem: (typeof catalogoVantagens)[0]) => {
    setVantagemSelecionada(vantagem);
    setOpenDialog(true);
  };

  const confirmarTroca = () => {
    setToastMessage("🎉 Troca realizada com sucesso!");
    setOpenDialog(false);
    setVantagemSelecionada(null);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-2"> Trocar Moedas por Vantagem</h1>
      <p className="text-gray-500">
        Escolha uma vantagem abaixo e aproveite seus benefícios!
      </p>

      {/* Catálogo de Vantagens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {catalogoVantagens.map((v) => (
          <motion.div
            key={v.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Card key={v.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center space-y-2">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Gift size={28} className="text-emerald-500" />
                </div>
                <CardTitle>{v.nome}</CardTitle>
                <CardDescription className="text-center">{v.descricao}</CardDescription>
              </CardHeader>

              <CardContent className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-700">
                  <Coins size={18} className="text-yellow-400" />
                  {v.custo} moedas
                </div>
                <Button
                  onClick={() => handleTrocar(v)}
                  className="bg-blue-500 hover:bg-blue-600 text-white transition-transform hover:scale-105"
                >
                  Trocar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal de confirmação */}
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
            <Button onClick={confirmarTroca} className="bg-emerald-500 hover:bg-emerald-600">
              Confirmar troca
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast */}
      {toastMessage && <Toast message={toastMessage} type="success" />}
    </div>
  );
}
