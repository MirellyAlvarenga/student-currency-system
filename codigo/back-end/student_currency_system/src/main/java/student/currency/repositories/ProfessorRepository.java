package student.currency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import student.currency.models.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
  Professor findByLogin(String login);

  boolean existsByCpf(String cpf);
}