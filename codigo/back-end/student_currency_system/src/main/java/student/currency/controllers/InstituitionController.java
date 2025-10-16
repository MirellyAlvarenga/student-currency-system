package student.currency.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import student.currency.models.Instituition;
import student.currency.services.InstituitionService;

import java.util.List;

@RestController
@RequestMapping("/instituitions")
public class InstituitionController {

    @Autowired
    private InstituitionService instituitionService;

    @GetMapping
    public List<Instituition> getAllInstituitions() {
        return instituitionService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instituition> getInstituitionById(@PathVariable Long id) {
        return instituitionService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Instituition createInstituition(@RequestBody Instituition instituition) {
        return instituitionService.save(instituition);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instituition> updateInstituition(@PathVariable Long id,
            @RequestBody Instituition instituition) {
        if (!instituitionService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(instituitionService.update(id, instituition));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstituition(@PathVariable Long id) {
        if (!instituitionService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        instituitionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}