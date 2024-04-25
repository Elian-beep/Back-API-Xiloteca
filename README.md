
# Backend Xiloteca CESIT (Primeiro modelo)

API Rest dedicado ao controle dos dados e gerência de acessos aos dados catalogados pela Xiloteca CESIT.


## Contribuidores

- Elian Batista [![Elian Batista](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/elian-batista/)
## Stack utilizada

| **Back-end** |   |
|--------------|---|
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) | ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) |
| ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) | ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Relacionados

Segue projetos relacionados

[Front-Xiloteca](https://github.com/Elian-beep/Front-Xiloteca)
[Front-Xiloteca-Adm](https://github.com/Elian-beep/Front-Xiloteca-Adm)


## Rodando localmente

Clone o projeto

```bash
  git clone [link_do_clone_Back-API-Xiloteca]
```

Entre no diretório do projeto

```bash
  cd Back-API-Xiloteca
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no arquivo .env

| `DB_USER` | `DB_PASS` | `SECRET`

Estas variáveis de ambiente seguem para a conexão com o banco de dados e para a criptografia JWT.


## Público alvo

Esse projeto possui intuito em ser usado pelas seguintes entidades:

- Dashboard administrativo da Xiloteca CESIT


## Funcionalidades

- Visualização dos dados catalogados
- Pesquisa com 4 filtros distintos
- Direcionamento para visualização das fotos das amostras
- Exclusão dos dados
- Alteração das informações
- Login administrativo com segurança criptografada
- Conexão com banco de dados Mongo

