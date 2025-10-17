"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../components/motionVariants";
import CommonCard from "../../../components/commonCard";
import { format } from "date-fns";

// Mock de exemplo
const partnerMock = {
  id: 1,
  name: "Empresa Exemplo",
  rewards: [
    {
      id: 1,
      name: "Caneca Personalizada",
      description: "Caneca com logo da empresa",
      quantity: 50,
      date: "2025-10-01T10:00:00",
      active: true,
    },
    {
      id: 2,
      name: "Camiseta Exclusiva",
      description: "Camiseta com estampa especial",
      quantity: 30,
      date: "2025-10-05T14:30:00",
      active: false,
    },
    {
      id: 3,
      name: "Caderno Premium",
      description: "Caderno de alta qualidade",
      quantity: 20,
      date: "2025-10-10T09:15:00",
      active: true,
    },
  ],
};

export default function VerSuasVantagens() {
  const [partner, setPartner] = useState<any>({ rewards: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setPartner(partnerMock);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // Alterna o estado ativo/inativo
  const toggleRewardStatus = (id: number) => {
    setPartner((prev: any) => ({
      ...prev,
      rewards: prev.rewards.map((r: any) =>
        r.id === id ? { ...r, active: !r.active } : r
      ),
    }));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-6 max-w-6xl mx-auto space-y-6"
    >
      <motion.header variants={fadeUp} className="mb-4">
        <h1 className="text-3xl font-bold">
          {loading ? "..." : partner?.name}
        </h1>
        <p className="text-sm text-gray-500">Vantagens cadastradas</p>
      </motion.header>

      <motion.section variants={fadeUp}>
        <CommonCard
          title="Minhas Vantagens"
          subtitle="Histórico completo das vantagens"
        >
          {loading ? (
            <div className="text-sm text-gray-500 p-4">Carregando...</div>
          ) : partner.rewards.length === 0 ? (
            <div className="text-sm text-gray-500 p-4">
              Nenhuma vantagem cadastrada.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descrição
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de cadastro
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {partner.rewards.map((r: any) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {r.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {r.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {r.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {format(new Date(r.date), "dd/MM/yyyy")}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <motion.div
                          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                            r.active ? "bg-emerald-500" : "bg-gray-300"
                          }`}
                          onClick={() => toggleRewardStatus(r.id)}
                        >
                          <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 700, damping: 30 }}
                            className={`w-4 h-4 bg-white rounded-full shadow-md ${
                              r.active ? "translate-x-6" : ""
                            }`}
                          />
                        </motion.div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CommonCard>
      </motion.section>
    </motion.div>
  );
}
