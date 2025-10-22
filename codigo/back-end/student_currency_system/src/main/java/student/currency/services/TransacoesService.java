package student.currency.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import student.currency.models.Student;
import student.currency.models.Transacoes;
import student.currency.repositories.StudentRepository;
import student.currency.repositories.TransacoesRepository;

import java.util.List;

@Service
public class TransacoesService {

    @Autowired
    private TransacoesRepository transacoesRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<Transacoes> getTransactionsByStudent(Long studentId) {
        return transacoesRepository.findByStudentIdOrderByDateDesc(studentId);
    }

    public Transacoes addTransaction(Long studentId, Transacoes transacoes) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        // Atualiza saldo
        int newBalance = student.getCoins();
        if ("GAIN".equals(transacoes.getType())) {
            newBalance += transacoes.getAmount();
        } else if ("SPEND".equals(transacoes.getType())) {
            if (student.getCoins() < transacoes.getAmount())
                throw new RuntimeException("Saldo insuficiente");
            newBalance -= transacoes.getAmount();
        }
        student.setCoins(newBalance);
        studentRepository.save(student);

        transacoes.setStudent(student);
        return transacoesRepository.save(transacoes);
    }
}
