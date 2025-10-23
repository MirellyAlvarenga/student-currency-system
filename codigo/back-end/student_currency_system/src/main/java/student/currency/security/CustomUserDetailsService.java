package student.currency.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import student.currency.models.Professor;
import student.currency.models.Student;
import student.currency.models.Company;
import student.currency.repositories.ProfessorRepository;
import student.currency.repositories.StudentRepository;
import student.currency.repositories.CompanyRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Professor professor = professorRepository.findByLogin(username);
        if (professor != null) {
            return User.builder()
                    .username(professor.getLogin())
                    .password(professor.getPassword())
                    .roles("PROFESSOR")
                    .build();
        }
        Optional<Student> optionalStudent = studentRepository.findByLogin(username);

        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();

            return User.builder()
                    .username(student.getLogin())
                    .password(student.getPassword())
                    .roles("STUDENT")
                    .build();
        }
        
        Company company = companyRepository.findByLogin(username);
        if (company != null) {
            return User.builder()
                    .username(company.getLogin())
                    .password(company.getPassword())
                    .roles("COMPANY")
                    .build();
        }
        throw new UsernameNotFoundException("User not found with login: " + username);
    }
}