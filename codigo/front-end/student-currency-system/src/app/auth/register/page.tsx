"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { User, Mail, FileText, Home, Building2, BookOpen, Lock, Briefcase } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"STUDENT" | "COMPANY">("STUDENT");
  const [form, setForm] = useState({
    login: "",
    password: "",
    name: "",
    email: "",
    cpf: "",
    rg: "",
    address: "",
    course: "",
    instituitionId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const instituicoes = [
    { id: 1, name: "PUC Minas" },
    { id: 2, name: "UFMG" },
    { id: 3, name: "CEFET-MG" },
    { id: 4, name: "UNA" },
    { id: 5, name: "Newton Paiva" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (accountType === "COMPANY") {
        await authService.registerCompany({
          login: form.login,
          password: form.password,
          name: form.name,
          email: form.email,
          role: "COMPANY"
        });
      } else {
        await authService.registerCompany({
          ...form,
          instituition: { id: form.instituitionId }
        });
      }
      router.push("/auth/login");
    } catch {
      setError("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-neutral-900 text-white px-4 py-8">
      <div className="w-full max-w-lg rounded-2xl bg-neutral-800 p-8 shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          {accountType === "COMPANY" ? <Briefcase size={28} /> : <User size={28} />}
          <h1 className="text-2xl font-semibold">
            Cadastro de {accountType === "COMPANY" ? "Empresa" : "Estudante"}
          </h1>
        </div>

        <div className="flex gap-4 mb-4 justify-center w-full h-full">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${accountType === "STUDENT" ? "bg-green-600" : "bg-neutral-700"}`}
            onClick={() => setAccountType("STUDENT")}
          >
            Estudante
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${accountType === "COMPANY" ? "bg-green-600" : "bg-neutral-700"}`}
            onClick={() => setAccountType("COMPANY")}
          >
            Empresa
          </button>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-300">Login</label>
            <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2">
              <User size={18} className="text-gray-400" />
              <input
                name="login"
                type="text"
                className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                placeholder="Digite um login"
                value={form.login}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">Nome</label>
            <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2">
              {accountType === "COMPANY" ? <Briefcase size={18} className="text-gray-400" /> : <User size={18} className="text-gray-400" />}
              <input
                name="name"
                type="text"
                className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                placeholder="Seu nome"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2">
              <Mail size={18} className="text-gray-400" />
              <input
                name="email"
                type="email"
                className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {accountType === "STUDENT" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">CPF</label>
                  <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2">
                    <FileText size={18} className="text-gray-400" />
                    <input
                      name="cpf"
                      type="text"
                      className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                      placeholder="000.000.000-00"
                      value={form.cpf}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-300">RG</label>
                  <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2">
                    <FileText size={18} className="text-gray-400" />
                    <input
                      name="rg"
                      type="text"
                      className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                      placeholder="00.000.000-0"
                      value={form.rg}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Endereço</label>
                <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2">
                  <Home size={18} className="text-gray-400" />
                  <input
                    name="address"
                    type="text"
                    className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                    placeholder="Rua, número, bairro, cidade"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Curso</label>
                <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2">
                  <BookOpen size={18} className="text-gray-400" />
                  <input
                    name="course"
                    type="text"
                    className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                    placeholder="Ex: Engenharia de Software"
                    value={form.course}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Instituição de Ensino</label>
                <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2">
                  <Building2 size={18} className="text-gray-400" />
                  <select
                    name="instituitionId"
                    className="w-full bg-transparent outline-none text-sm text-white"
                    value={form.instituitionId}
                    onChange={handleChange}
                  >
                    <option value="">Selecione uma instituição</option>
                    {instituicoes.map((inst) => (
                      <option key={inst.id} value={inst.id} className="text-black">
                        {inst.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-sm text-gray-300">Senha</label>
            <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2">
              <Lock size={18} className="text-gray-400" />
              <input
                name="password"
                type="password"
                className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-green-600 py-2 font-medium hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <p className="text-sm text-gray-400 text-center mt-2">
            Já possui conta?{" "}
            <span
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              Entrar
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
