"use client";
import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { StudentDTO } from "@/utils/studentData";
import Header from "@/components/Header";
import { Poppins } from "next/font/google";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

const CreateStudentPage = () => {
  const [students, setStudents] = useState<StudentDTO[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);

  useEffect(() => {
    api.get<StudentDTO[]>("/students").then((res) => setStudents(res.data));
  }, []);

  const handleDelete = async () => {
    if (studentToDelete !== null) {
      try {
        await api.delete(`/students/${studentToDelete}`);
        setStudents((prev) =>
          prev.filter((student) => student.id !== studentToDelete)
        );
        closeModal();
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
        alert("Erro ao excluir aluno!");
      }
    }
  };

  const openModal = (id: number) => {
    setStudentToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setStudentToDelete(null);
  };

  return (
    <>
      <Header />
      <div className={poppins.className} style={{ padding: "2rem" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Nome</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>CPF</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>RG</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Endereço
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Curso</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Moedas
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Instituição
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.name}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.cpf}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.rg}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.addres}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.course}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.coins}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {student.instituition?.name || "—"}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Link
                    href={`/Aluno/edit/${student.id}`}
                    style={{ color: "#003366" }}
                  >
                    <Edit size={20} />
                  </Link>
                  <button
                    onClick={() => openModal(student.id)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#DC2626",
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal de Confirmação */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "10px",
                width: "400px",
                textAlign: "center",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "#003366" }}>
                Confirmar Exclusão
              </h3>
              <p style={{ marginBottom: "1.5rem" }}>
                Tem certeza que deseja excluir este aluno?
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                <button
                  onClick={closeModal}
                  style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "5px",
                    backgroundColor: "#DC2626",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateStudentPage;
