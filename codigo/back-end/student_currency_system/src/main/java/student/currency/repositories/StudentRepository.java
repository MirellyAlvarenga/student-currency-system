package student.currency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import student.currency.models.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
  boolean existsByEmail(String email);

  boolean existsByCpf(String cpf);

  Student findByLogin(String login);
}