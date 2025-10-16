"use client"
import React, { useEffect, useState } from 'react'
import api from '@/services/api';
import { StudentDTO } from '@/utils/studentData'
import Header from '@/components/Header';
import { Poppins } from 'next/font/google';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

const CreateStudentPage = () => {
    const [students, setStudents] = useState<StudentDTO[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState<number | null>();

    useEffect(() => {
        api.get<StudentDTO[]>("/students").then((res) => setStudents(res.data));
    }, []);

    const handleDelete = async () => {
        if (studentToDelete !== null) {
        await api.delete(`/students/${studentToDelete}`);
        setStudents((prev) =>
            prev.filter((student) => student.id !== studentToDelete)
        );
        setShowModal(false);
        setStudentToDelete(null);
        }
    };
    
    const openModal = async (id: number) => {
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
        <div className='flex'>
            <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Nome
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  CPF
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  RG
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Endereço
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Curso
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Moedas
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Instituição
                </th>
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
                    {student.instituition.name}
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
        </div>
        </>
    )
}

export default CreateStudentPage