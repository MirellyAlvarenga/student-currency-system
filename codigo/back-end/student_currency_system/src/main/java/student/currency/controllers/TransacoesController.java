package student.currency.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import student.currency.models.Transacoes;
import student.currency.services.TransacoesService;

import java.util.List;

@RestController
@RequestMapping("/transacoess")
@CrossOrigin(origins = "http://localhost:3000")
public class TransacoesController {

    @Autowired
    private TransacoesService transacoesService;

    @GetMapping("/{studentId}")
    public List<Transacoes> getStudenttransacoess(@PathVariable Long studentId) {
        return transacoesService.getTransactionsByStudent(studentId);
    }

    @PostMapping("/{studentId}")
    public ResponseEntity<Transacoes> createtransacoes(@PathVariable Long studentId,
                                                         @RequestBody Transacoes transacoes) {
        return ResponseEntity.ok(transacoesService.addTransaction(studentId, transacoes));
    }
}
