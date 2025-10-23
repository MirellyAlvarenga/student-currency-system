"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { LogIn, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.login(email, password);
      router.push("/dashboard");
    } catch {
      setError("Email ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-neutral-900 text-white">
      <div className="w-full max-w-sm rounded-2xl bg-neutral-800 p-8 shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <LogIn size={28} />
          <h1 className="text-2xl font-semibold">Acessar conta</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">Senha</label>
            <div className="flex items-center gap-2 rounded-lg bg-neutral-700 px-3 py-2">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-blue-600 py-2 font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
