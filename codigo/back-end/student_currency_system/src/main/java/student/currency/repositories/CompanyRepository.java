package student.currency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import student.currency.models.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
  boolean existsByEmail(String email);

  Company findByLogin(String login);
}