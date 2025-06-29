# 🔗 Python + React Link Shortener

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

Uma aplicação web full-stack simples e funcional para encurtar URLs. Construída com Python (Flask) no backend e React no frontend, ela permite que os usuários transformem links longos em URLs curtas e fáceis de compartilhar, além de rastrear a quantidade de cliques que cada link recebeu.

<br>
<p align="center">
  <img width="1072" alt="Image" src="https://github.com/user-attachments/assets/e109f775-4faf-4b52-ba70-e9ae4ff4cfdc" />
</p>
<br>

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Executar o Projeto](#-como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Como Funciona](#-como-funciona)
- [Estrutura do Projeto](#-estrutura-do-projeto)

## ✨ Funcionalidades

- **Encurtamento de Links**: Transforma uma URL longa em um link curto com um código único.
- **Redirecionamento Automático**: Ao acessar um link curto, o usuário é redirecionado instantaneamente para a URL original.
- **Rastreamento de Cliques**: O sistema contabiliza quantas vezes cada link encurtado foi acessado.
- **Página de Estatísticas**: Uma visão geral de todos os links criados, mostrando o link original, o link curto e a contagem de cliques de cada um.
- **API RESTful**: Backend construído com Flask que expõe endpoints claros para criar e gerenciar os links.
- **Interface Reativa**: Frontend construído com React para uma experiência de usuário rápida e dinâmica.

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
    - **React**: Biblioteca principal para a construção da interface de usuário.
    - **JavaScript (ES6+)**: Linguagem base com funcionalidades modernas, como `async/await` para chamadas de API.
    - **CSS3**: Para estilização e responsividade da interface.
- **Backend**:
    - **Python**: Linguagem de programação principal para a lógica do servidor.
    - **Flask**: Micro-framework para a criação da API RESTful.
    - **SQLite**: Banco de dados relacional leve, usado para armazenar os links e a contagem de cliques.

## 🚀 Como Executar o Projeto

Este projeto é dividido em duas partes: o **backend** (a cozinha) e o **frontend** (o salão). Você precisará configurar e executar ambos.

### Pré-requisitos

- [**Node.js**](https://nodejs.org/en/) (versão 14 ou superior) para o frontend.
- [**Python**](https://www.python.org/downloads/) (versão 3.8 ou superior) para o backend.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd nome-do-repositorio
    ```

3.  **Configure o Backend (A Cozinha):**
    ```bash
    # Navegue para a pasta do backend
    cd backend

    # Crie um ambiente virtual
    python -m venv venv

    # Ative o ambiente virtual
    # No Windows:
    venv\Scripts\activate
    # No macOS/Linux:
    source venv/bin/activate

    # Instale as dependências do Python
    pip install Flask Flask-Cors

    # Crie o banco de dados inicial
    python init_db.py
    ```

4.  **Configure o Frontend (O Salão):**
    - Abra um **novo terminal**.
    - Navegue para a pasta do projeto novamente e entre no diretório do frontend.
    ```bash
    # Navegue para a pasta do frontend
    cd ../frontend # ou o caminho completo para a pasta frontend

    # Instale as dependências do Node.js
    npm install
    ```

## 📜 Scripts Disponíveis

Você precisará de dois terminais abertos para executar a aplicação completa.

#### No terminal do **Backend** (dentro da pasta `/backend` e com o `venv` ativado):

```bash
# Inicia o servidor da API na porta 5000
flask run
```

No terminal do Frontend (dentro da pasta /frontend):

```bash
# Executa o aplicativo no modo de desenvolvimento na porta 3000
npm start
```

Abra http://localhost:3000 para visualizar a aplicação no seu navegador.

## 🧠 Como Funciona

samos a analogia de um restaurante para entender a arquitetura:

Backend (app.py): É a cozinha da aplicação. Construído com Flask, ele é responsável por:

Receber "pedidos" (requests) do frontend para encurtar um link.

Gerar o código curto (a "receita secreta").

Armazenar e buscar informações na "despensa" (o banco de dados SQLite).

Servir os "pratos" (responses), como o novo link curto ou os dados de estatísticas.

Frontend (App.js): É o salão e o garçom. Construído com React, ele:

Apresenta a interface (o "cardápio") para o usuário.

Pega o "pedido" do usuário (a URL longa).

Leva o pedido para a cozinha (faz uma chamada fetch para a API Flask).

Traz o resultado de volta para a mesa do cliente (exibe o link encurtado na tela).

Banco de Dados (database.db): É a despensa. Um arquivo SQLite simples que armazena de forma organizada todos os links, seus códigos curtos e a contagem de cliques de cada um.

E caso queira ver os bastidores, é só clicar em "Show Stats"

![Image](https://github.com/user-attachments/assets/ad2edd7a-8260-439a-a0ed-0c0532f89510)

![Image](https://github.com/user-attachments/assets/597a926b-cbec-4f89-ae1f-436c4da24f7d)


## 📂 Estrutura do Projeto

```
/
├── backend/                  # O "coração" da lógica (API).
│   ├── venv/                 # Pasta do ambiente virtual do Python (ignorado pelo Git).
│   ├── app.py                # O cérebro da API: define rotas e a lógica.
│   ├── init_db.py            # Script para criar o banco de dados inicial.
│   ├── schema.sql            # A "planta" do nosso banco de dados.
│   └── database.db           # O arquivo do banco de dados (ignorado pelo Git).
├── frontend/                 # O "rosto" da aplicação (Interface).
│   ├── public/               # Arquivos estáticos, como o index.html.
│   ├── src/                  # Código-fonte do React.
│   │   ├── App.js            # Componente principal que une a aplicação.
│   │   ├── App.css           # Estilos principais.
│   │   └── index.js          # Ponto de entrada do React.
│   ├── package.json          # O "RG" do projeto frontend.
│   └── ...
├── .gitignore                # Diz ao Git quais arquivos ignorar.
└── README.md                 # Este arquivo que você está lendo :)
```
