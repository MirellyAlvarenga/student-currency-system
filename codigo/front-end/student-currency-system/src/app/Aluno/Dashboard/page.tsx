"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../components/motionVariants";
import CommonCard from "../../../components/commonCard";
import { student as studentMock } from "../../../utils/mockData";
import { Coins, List, Bell, Gift, PiggyBank, LogOut } from "lucide-react";
import { format } from "date-fns";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const [student, setStudent] = useState(() => ({
    name: "",
    balance: 0,
    summary: { last7DaysGained: 0, exchanges: 0 },
    transactions: [] as any[],
    notifications: [] as any[],
  }));

  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const user = authService.getUser();
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.push("/auth/login");
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setStudent({
        ...studentMock,
        notifications: [
          { id: 1, message: "Você recebeu 20 moedas do Prof. Carlos!", date: "2025-10-10T14:00" },
          { id: 2, message: "Sua troca por 'Caneca personalizada' foi confirmada.", date: "2025-10-12T09:45" },
          { id: 3, message: "Você ganhou 10 moedas por participação em aula.", date: "2025-10-13T17:15" },
        ],
      });
      setLoading(false);
    }, 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-6 p-6 max-w-6xl mx-auto relative"
    >
      {/* Cabeçalho */}
      <motion.header variants={fadeUp} className="flex items-center justify-between relative">
        <div>
          <h1 className="text-3xl font-bold">Olá, {loading ? "..." : user.login}</h1>
          <p className="text-sm text-gray-500">Bem-vindo ao seu painel de moedas</p>
        </div>

        <div className="flex items-center gap-4 relative">
          {/* Notificações */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              aria-label="Ver notificações"
              className="relative p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <Bell size={22} />
              {student.notifications.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {student.notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <div className="p-3 border-b font-semibold">Notificações</div>
                <div className="max-h-60 overflow-y-auto divide-y">
                  {student.notifications.map((n) => (
                    <div key={n.id} className="p-3 text-sm hover:bg-gray-50">
                      <div>{n.message}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {format(new Date(n.date), "dd/MM/yyyy HH:mm")}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* --- TROCAR: botão de Trocar Moedas no cabeçalho (com ícone de presente) --- */}
          <Link href="/Aluno/TrocarMoedas">
            <button
              className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition flex items-center gap-2"
              aria-label="Trocar moedas"
            >
              <Gift size={16} /> Trocar moedas
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-2"
            aria-label="Sair da conta"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </motion.header>

      {/* Cards principais */}
      <motion.section variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CommonCard title="Saldo de Moedas" subtitle="Valor disponível para trocas">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-4 rounded-xl bg-gray-100">
                <PiggyBank size={38}  />
              </div>
              <div>
                <div className="text-4xl font-semibold">{loading ? "..." : student.balance}</div>
                <div className="text-sm text-gray-500">moedas</div>
              </div>
            </div>

            <div className="ml-auto">
             
              <Link href="/Aluno/ConsultarExtrato">
                <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:scale-[1.02] transition-all flex items-center gap-2">
                  {/* opcional: manter ícone list/coins; deixei só texto para foco */}
                  Consultar extrato
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
                <div className="font-semibold">
                  {loading ? "..." : student.summary.last7DaysGained} moedas
                </div>
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
        <CommonCard
          title="Transações recentes"
          actions={<div className="text-sm text-gray-500">Últimas 8</div>}
        >
          <div className="mt-3 space-y-2">
            {loading ? (
              <div className="text-sm text-gray-500">Carregando...</div>
            ) : (
              student.transactions.slice(0, 6).map((t: any) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-gray-100">
                      <List size={18} />
                    </div>
                    <div>
                      <div className="font-medium">{t.description}</div>
                      <div className="text-xs text-gray-500">
                        {format(new Date(t.date), "dd/MM/yyyy HH:mm")}
                      </div>
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
