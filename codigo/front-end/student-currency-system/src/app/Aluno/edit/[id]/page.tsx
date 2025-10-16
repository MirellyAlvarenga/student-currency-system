"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      <div
        className={poppins.className}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#d3d3d3",
          padding: "2rem",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "10px",
            width: "600px",
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1rem",
              color: "#003366",
            }}
          >
            Editar Aluno
          </h2>

          {[
            "login",
            "password",
            "name",
            "email",
            "cpf",
            "rg",
            "address",
            "course",
          ].map((field) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={
                field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={(form as any)[field]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "1rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              required
            />
          ))}

          <input
            type="number"
            name="coins"
            placeholder="Moedas"
            value={form.coins}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            min={0}
          />

          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 600,
              color: "#003366",
            }}
          >
            Instituição
          </label>
          <select
            name="instituitionId"
            value={form.instituitionId}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          >
            <option value={1}>PUC Minas</option>
            <option value={2}>CEFET-MG</option>
            <option value={3}>UFMG</option>
          </select>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#003366",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Salvar Alterações
          </button>

          {successMessage && (
            <p
              style={{
                marginTop: "1rem",
                textAlign: "center",
                color: "green",
                fontWeight: "bold",
              }}
            >
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
