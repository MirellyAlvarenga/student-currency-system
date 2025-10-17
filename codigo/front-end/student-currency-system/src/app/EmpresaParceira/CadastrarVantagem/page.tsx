"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/components/motionVariants";

export default function CadastrarVantagem() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    custo: "",
    quantidade: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalvar = () => {
    console.log("Dados salvos:", form);
  };

  const handleCancelar = () => {
    setForm({ nome: "", descricao: "", custo: "", quantidade: "" });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-xl mx-auto mt-10 p-6 space-y-6"
    >
      <motion.h1 variants={fadeUp} className="text-3xl font-bold text-center">
        Cadastrar Vantagem
      </motion.h1>

      <Card>
        <CardHeader>
          <CardTitle>Preencha os dados da vantagem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome da vantagem</Label>
            <Input id="nome" name="nome" value={form.nome} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea id="descricao" name="descricao" value={form.descricao} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="custo">Custo em moedas</Label>
            <Input id="custo" name="custo" value={form.custo} onChange={handleChange} type="number" />
          </div>
          <div>
            <Label htmlFor="quantidade">Quantidade disponível</Label>
            <Input id="quantidade" name="quantidade" value={form.quantidade} onChange={handleChange} type="number" />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={handleCancelar}>Cancelar</Button>
            <Button onClick={handleSalvar}>Salvar</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
