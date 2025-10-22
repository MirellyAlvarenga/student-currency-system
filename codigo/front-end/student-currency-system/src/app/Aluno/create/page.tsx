"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api"; 
import Header from "@/components/HeaderALuno";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateStudentPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [address, setAddress] = useState("");
  const [course, setCourse] = useState("");
  const [coins, setCoins] = useState<number | "">("");
  const [instituitionId, setInstituitionId] = useState<number | "">("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!instituitionId) {
    alert("Informe o ID da instituição.");
    return;
  }

  try {
    await api.post("/students", {
      login,
      password,
      name,
      email,
      cpf,
      rg,
      address,
      course,
      coins: coins === "" ? 0 : coins,
      instituition: { id: instituitionId }, // precisa existir no DB
    });

    router.push("/Aluno/list");
  } catch (error: any) {
    console.error("Erro ao criar aluno:", error.response?.data || error.message);
    alert("Não foi possível criar o aluno. Verifique os dados e tente novamente.");
  }
};
  return (
    <>
      <Header/>

      <div className="p-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Criar Novo Aluno
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <Label htmlFor="login" className="block mb-1">
                    Login
                  </Label>
                  <Input
                    id="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                    className="w-full py-2 px-3"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="block mb-1">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full py-2 px-3"
                  />
                </div>

                <div>
                  <Label htmlFor="name" className="block mb-1">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full py-2 px-3"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="block mb-1">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full py-2 px-3"
                  />
                </div>

                <div>
                  <Label htmlFor="cpf" className="block mb-1">
                    CPF
                  </Label>
                  <Input
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                    className="w-full py-2 px-3"
                  />
                </div>

                <div>
                  <Label htmlFor="rg" className="block mb-1">
                    RG
                  </Label>
                  <Input
                    id="rg"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                    required
                    className="w-full py-2 px-3"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="block mb-1">
                    Endereço
                  </Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full py-2 px-3"
                  />
                </div>

                <div>
                  <Label htmlFor="course" className="block mb-1">
                    Curso
                  </Label>
                  <Input
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                    className="w-full py-2 px-3"
                  />
                </div>

                <div>
                  <Label htmlFor="coins" className="block mb-1">
                    Moedas
                  </Label>
                  <Input
                    id="coins"
                    type="number"
                    value={coins}
                    onChange={(e) =>
                      setCoins(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="w-full py-2 px-3"
                  />
                </div>

                <div>
                  <Label htmlFor="instituitionId" className="block mb-1">
                    Instituição (ID)
                  </Label>
                  <Input
                    id="instituitionId"
                    type="number"
                    value={instituitionId}
                    onChange={(e) =>
                      setInstituitionId(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    required
                    className="w-full py-2 px-3"
                  />
                </div>

              </div>

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
