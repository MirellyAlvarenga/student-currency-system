"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateCompanyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    login: "",
    password: "",
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/companies", form);
      router.push("/EmpresaParceira/list");
    } catch (error: any) {
      console.error("Erro ao criar empresa:", error.response?.data || error.message);
      alert("Não foi possível criar a empresa. Verifique os dados e tente novamente.");
    }
  };

  return (
    <>
      <Header />

      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Criar Nova Empresa Parceira
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {["login", "password", "name", "email"].map((field) => (
                <div key={field}>
                  <Label htmlFor={field} className="block mb-1 capitalize">
                    {field === "password" ? "Senha" : field}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    type={field === "password" ? "password" : "text"}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/EmpresaParceira/list")}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Criar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
