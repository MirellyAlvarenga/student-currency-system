"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fadeUp, staggerContainer } from "../../../components/motionVariants";
import { motion } from "framer-motion";
import CommonCard from "../../../components/commonCard";
import { student as studentMock } from "../../../utils/mockData";
import { Coins, List } from "lucide-react";
import { format } from "date-fns";

export default function StudentDashboard() {
  const [student, setStudent] = useState(() => ({
    name: "",
    balance: 0,
    summary: { last7DaysGained: 0, exchanges: 0 },
    transactions: [] as any[],
  }));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setStudent(studentMock);
      setLoading(false);
    }, 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-6 p-6 max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.header variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Olá, {loading ? "..." : student.name}</h1>
          <p className="text-sm text-gray-500">Bem-vindo ao seu painel de moedas</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/Aluno/ConsultarExtrato">
            <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:scale-[1.02] transition-all">
              Consultar extrato
            </button>
          </Link>
        </div>
      </motion.header>

      {/* Cards */}
      <motion.section variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CommonCard title="Saldo de Moedas" subtitle="Valor disponível para trocas">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-4 rounded-xl bg-gray-100">
                <Coins size={28} />
              </div>
              <div>
                <div className="text-4xl font-semibold">{loading ? "..." : student.balance}</div>
                <div className="text-sm text-gray-500">moedas</div>
              </div>
            </div>
            <div className="ml-auto">
              <Link href="/Aluno/TrocarMoedas">
                <button className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:scale-[1.02] transition-all">
                  Trocar por vantagem
                </button>
              </Link>
            </div>
          </div>
        </CommonCard>

        <CommonCard title="Resumo rápido" subtitle="Últimos 7 dias">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Ganho últimos 7 dias</div>
                <div className="font-semibold">{loading ? "..." : student.summary.last7DaysGained} moedas</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total de trocas</div>
                <div className="font-semibold">{loading ? "..." : student.summary.exchanges}</div>
              </div>
            </div>
            <div className="mt-2 bg-gray-50 p-3 rounded-lg">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: loading
                      ? "0%"
                      : `${Math.min(100, (student.summary.last7DaysGained / 150) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CommonCard>
      </motion.section>

      {/* Transações recentes */}
      <motion.section variants={fadeUp}>
        <CommonCard title="Transações recentes" actions={<div className="text-sm text-gray-500">Últimas 8</div>}>
          <div className="mt-3 space-y-2">
            {loading ? (
              <div className="text-sm text-gray-500">Carregando...</div>
            ) : (
              student.transactions.slice(0, 6).map((t: any) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-gray-100">
                      <List size={18} />
                    </div>
                    <div>
                      <div className="font-medium">{t.description}</div>
                      <div className="text-xs text-gray-500">{format(new Date(t.date), "dd/MM/yyyy HH:mm")}</div>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${t.type === "GAIN" ? "text-emerald-600" : "text-rose-500"}`}
                  >
                    {t.type === "GAIN" ? `+${t.amount}` : `-${t.amount}`}
                  </div>
                </div>
              ))
            )}
          </div>
        </CommonCard>
      </motion.section>
    </motion.div>
  );
}
