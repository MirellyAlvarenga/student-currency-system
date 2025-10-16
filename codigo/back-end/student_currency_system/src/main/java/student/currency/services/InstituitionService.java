package student.currency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import student.currency.models.Instituition;
import student.currency.repositories.InstituitionRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InstituitionService {

    @Autowired
    private InstituitionRepository instituitionRepository;

    public List<Instituition> findAll() {
        return instituitionRepository.findAll();
    }

    public Optional<Instituition> findById(Long id) {
        return instituitionRepository.findById(id);
    }

    public Instituition save(Instituition instituition) {
        return instituitionRepository.save(instituition);
    }

    public void delete(Long id) {
        instituitionRepository.deleteById(id);
    }

    public Instituition update(Long id, Instituition instituition) {
        instituition.setId(id);
        return instituitionRepository.save(instituition);
    }
}
