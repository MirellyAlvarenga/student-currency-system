"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import Header from "@/components/HeaderALuno";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StudentForm {
  login: string;
  password: string;
  name: string;
  email: string;
  cpf: string;
  rg: string;
  address: string;
  course: string;
  coins: number;
  instituitionId: number;
}

export default function EditStudentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<StudentForm>({
    login: "",
    password: "",
    name: "",
    email: "",
    cpf: "",
    rg: "",
    address: "",
    course: "",
    coins: 0,
    instituitionId: 1,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      api.get(`/students/${id}`).then((res) => {
        const data = res.data as StudentForm;
        setForm({
          ...data,
          instituitionId: data.instituitionId ?? 1,
        });
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "coins" || name === "instituitionId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/students/${id}`, form);
      setSuccessMessage("Aluno atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar aluno!");
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800 text-center">
              Editar Aluno
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Campos de texto */}
                {["login", "password", "name", "email", "cpf", "rg", "address", "course"].map((field) => (
                  <div key={field}>
                    <Label htmlFor={field} className="block mb-1 capitalize">
                      {field}
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

                {/* Moedas */}
                <div>
                  <Label htmlFor="coins" className="block mb-1">
                    Moedas
                  </Label>
                  <Input
                    id="coins"
                    name="coins"
                    type="number"
                    min={0}
                    value={form.coins}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                {/* Instituição */}
                <div>
                  <Label htmlFor="instituitionId" className="block mb-1">
                    Instituição
                  </Label>
                  <Select
                    value={String(form.instituitionId)}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, instituitionId: Number(value) }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a instituição" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">PUC Minas</SelectItem>
                      <SelectItem value="2">CEFET-MG</SelectItem>
                      <SelectItem value="3">UFMG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Botão */}
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/Aluno/list")}
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

              {/* Mensagem de sucesso */}
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
