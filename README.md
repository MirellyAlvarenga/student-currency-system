# 💰 Sistema de Moeda Estudantil

Bem-vindo ao **Sistema de Moeda Estudantil**!  
Este projeto tem como objetivo estimular o reconhecimento do mérito estudantil através de uma moeda virtual, distribuída por professores e trocada por alunos por produtos e descontos em empresas parceiras.

---

## 🚀 Sobre o Projeto

O Sistema de Moeda Estudantil permite que:

- **Professores** distribuam moedas virtuais aos alunos como reconhecimento por desempenho, participação e comportamento.
- **Alunos** recebam moedas, consultem seu extrato e troquem moedas por vantagens (produtos ou descontos) oferecidas por empresas parceiras.
- **Empresas parceiras** cadastrem vantagens e acompanhem os resgates realizados pelos alunos.

---

## 📝 Funcionalidades Principais

- **Cadastro de Alunos:** Alunos informam nome, email, CPF, RG, endereço, instituição de ensino e curso. As instituições já estão pré-cadastradas.
- **Cadastro de Professores:** Professores são pré-cadastrados pela instituição, com nome, CPF e departamento.
- **Distribuição de Moedas:** Cada professor recebe 1.000 moedas por semestre (acumulativas) para distribuir aos alunos.
- **Notificações:** Alunos recebem notificação por email ao receber moedas.
- **Extrato:** Professores e alunos podem consultar o saldo e o histórico de transações.
- **Troca de Moedas:** Alunos podem trocar moedas por vantagens cadastradas no sistema (ex: descontos em restaurantes, mensalidades, materiais).
- **Cadastro de Empresas Parceiras:** Empresas podem se cadastrar e cadastrar vantagens, incluindo descrição e foto.
- **Resgate de Vantagens:** Ao resgatar uma vantagem, o aluno recebe um código por email para utilizar presencialmente, e a empresa parceira também é notificada.
- **Autenticação:** Alunos, professores e empresas precisam de login e senha para acessar o sistema.

---

## 🛠️ Tecnologias Utilizadas

- **Java 17+**
- **Spring Boot 3**
- **Spring Data JPA**
- **MySQL** (ou H2 para testes)
- **Lombok**
- **Maven**
- **Spring Security** (autenticação)
- **JavaMailSender** (para notificações por email)
- **VS Code** ou qualquer IDE Java

---

## ⚙️ Como rodar o projeto

1. **Clone o repositório:**
  ```bash
  git clone https://github.com/seu-usuario/student-currency-system.git
  cd student-currency-system
