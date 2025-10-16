// Partner Dashboard
import React, { useEffect, useState } from "react";
import CommonCard from "../../components/commonCard";
import { partner as partnerMock } from "../../utils/mockData";
import { fadeUp, staggerContainer } from "../../components/motionVariants";
import { motion } from "framer-motion";
import { FileText, Tag, Users } from "lucide-react";

export default function PartnerDashboard() {
  const [partner, setPartner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setPartner(partnerMock);
      setLoading(false);
    }, 380);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="p-6 max-w-6xl mx-auto space-y-6">
      <motion.header variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{loading ? "..." : partner?.name}</h1>
          <p className="text-sm text-gray-500">Painel da empresa parceira</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white">Cadastrar Vantagem</button>
          <button className="px-4 py-2 rounded-lg bg-white border">Exportar relatório</button>
        </div>
      </motion.header>

      <motion.section variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CommonCard title="Vantagens cadastradas" subtitle="Total de ofertas">
          <div className="text-4xl font-semibold">{loading ? "..." : partner?.rewardsCount}</div>
        </CommonCard>
        <CommonCard title="Trocas realizadas" subtitle="Total histórico">
          <div className="text-4xl font-semibold">{loading ? "..." : partner?.totalExchanges}</div>
        </CommonCard>
      </motion.section>

      <motion.section variants={fadeUp} className="grid grid-cols-1 gap-6">
        <CommonCard title="Visão rápida" subtitle="Últimas trocas">
          <div className="divide-y mt-2">
            {loading ? (
              <div className="text-sm text-gray-500">Carregando...</div>
            ) : (
              partner.exchangesRecent.map((e: any) => (
                <div key={e.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{e.student} — <span className="text-gray-500">{e.reward}</span></div>
                    <div className="text-xs text-gray-500">{new Date(e.date).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs ${e.status === "Confirmado" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>{e.status}</span>
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
