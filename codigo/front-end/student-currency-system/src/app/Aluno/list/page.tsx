import React, { useEffect, useState } from 'react'
import api from '@/services/api';
import { StudentDTO } from '@/utils/studentData'

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
        <div>CreateStudentPage</div>
        </>
    )
}

export default CreateStudentPage