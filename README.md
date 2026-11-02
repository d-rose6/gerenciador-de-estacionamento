# 🅿️ Sistema de Gerenciamento de Estacionamento

Projeto desenvolvido para fins acadêmicos com o objetivo de criar uma aplicação full-stack para gerenciar um estacionamento, utilizando uma API REST em Node.js e um front-end moderno em React.

---

## 🚀 Tecnologias Utilizadas

### **Back-end:**
* **Node.js** com **Express**
* **Sequelize** (ORM)
* **MySQL** (Banco de Dados)
* **CORS** e **Body-Parser**

### **Front-end:**
* **React** com **React Router DOM**
* **Axios** (para consumo da API REST)
* **Bootstrap** (para estilização)

---

## 📝 Funcionalidades e Alterações Recentes

* **Módulo de Proprietários:** Cadastro, listagem, edição e exclusão de proprietários (`id_proprietario`, `nome`, `cpf`).
* **Módulo de Veículos:** 
  * Listagem de veículos utilizando **INNER JOIN** para exibir o nome do proprietário correspondente.
  * Cadastro de veículos com um **`<select>` dinâmico** para associar o carro ao seu respectivo dono (`placa`, `ano`, `mensalidade`, `fk_proprietario`).

---

## ⚙️ Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone <url-do-seu-repositorio>
