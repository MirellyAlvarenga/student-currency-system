"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompanyForm {
  login: string;
  password: string;
  name: string;
  email: string;
}

export default function EditCompanyPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<CompanyForm>({
    login: "",
    password: "",
    name: "",
    email: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      api.get(`/companies/${id}`).then((res) => {
        const data = res.data as CompanyForm;
        setForm({
          login: data.login,
          password: "",
          name: data.name,
          email: data.email,
        });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/companies/${id}`, form);
      setSuccessMessage("Empresa atualizada com sucesso!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar empresa!");
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800 text-center">
              Editar Empresa Parceira
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
                    required={field !== "password"} 
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
                  Salvar Alterações
                </Button>
              </div>

              {successMessage && (
                <p className="text-green-600 font-semibold text-center mt-4">
                  {successMessage}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
