package student.currency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import student.currency.models.Professor;
import student.currency.repositories.ProfessorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public List<Professor> findAll() {
        return professorRepository.findAll();
    }

    public Optional<Professor> findById(Long id) {
        return professorRepository.findById(id);
    }

    public Professor save(Professor professor) {
        return professorRepository.save(professor);
    }

    public void delete(Long id) {
        professorRepository.deleteById(id);
    }

    public Professor update(Long id, Professor professor) {
        professor.setId(id);
        return professorRepository.save(professor);
    }

    public Professor findByLogin(String login) {
        return professorRepository.findByLogin(login);
    }
}