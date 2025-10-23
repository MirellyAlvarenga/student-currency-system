package student.currency.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import student.currency.models.Professor;
import student.currency.services.ProfessorService;

import java.util.List;

@RestController
@RequestMapping("/professors")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Professor> getAllProfessors() {
        return professorService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> getProfessorById(@PathVariable Long id) {
        return professorService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Professor createProfessor(@RequestBody Professor professor) {
        professor.setPassword(passwordEncoder.encode(professor.getPassword()));
        return professorService.save(professor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Professor> updateProfessor(@PathVariable Long id, @RequestBody Professor professor) {
        if (!professorService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(professorService.update(id, professor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable Long id) {
        if (!professorService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        professorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}