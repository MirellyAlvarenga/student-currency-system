package student.currency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import student.currency.models.Instituition;

public interface InstituitionRepository extends JpaRepository<Instituition, Long> {
  boolean existsByName(String name);
}