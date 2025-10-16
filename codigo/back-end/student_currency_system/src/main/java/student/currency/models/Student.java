package student.currency.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Student {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String login;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false, unique = true)
  private String cpf;

  @Column(nullable = false, unique = true)
  private String rg;

  @Column(nullable = false)
  private String address;

  @Column(nullable = false)
  private String course;

  @Column(nullable = false)
  private Integer coins = 0;

  @ManyToOne
  @JoinColumn(name = "instituition_id", nullable = false)
  private Instituition instituition;

}