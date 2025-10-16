package student.currency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import student.currency.models.Company;
import student.currency.repositories.CompanyRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    public Optional<Company> findById(Long id) {
        return companyRepository.findById(id);
    }

    public Company save(Company company) {
        return companyRepository.save(company);
    }

    public void delete(Long id) {
        companyRepository.deleteById(id);
    }

    public Company update(Long id, Company company) {
        company.setId(id);
        return companyRepository.save(company);
    }

    public Company findByLogin(String login) {
        return companyRepository.findByLogin(login);
    }
}