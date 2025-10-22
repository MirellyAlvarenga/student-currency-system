package student.currency.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import student.currency.models.Transacoes;
import java.util.List;

public interface TransacoesRepository extends JpaRepository<Transacoes, Long> {
    List<Transacoes> findByStudentIdOrderByDateDesc(Long studentId);
}
