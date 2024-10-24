# Jardinagem - Back-End

Este é o projeto back-end que faz parte do sistema de jardinagem a ser desenvolvido durante a residência de software MackLeaps. Ele implementa funcionalidades essenciais utilizando Node.js, Express, Prisma como ORM, e documentação com Swagger.

#### Tecnologias Usadas:

- Node.Js
- Express
- Typescript
- Prisma (ORM)
- Swagger (Documentação)

### Pré-requisitos:

1.  Certifique-se de ter o Node.js instalado na sua máquina:

        node --version

Se não tiver instalado, você pode baixá-lo [aqui](https://nodejs.org/en/download/prebuilt-installer/current)

⚠️ Observação: Nos exemplos abaixo, foi utilizado o npm como gerenciador de pacotes, mas você é livre para utilizar yarn, pnpm, ou outro de sua escolha.

## Como rodar o projeto:

1.  Clonar o repositório em sua máquina:

        git clone git@github.com:devBrait/jardinagem_back.git

2.  Navegar para o diretório do projeto:

        cd jardinagem_back

3.  Instalar as dependências:

        npm install

4.  Abra o projeto no VS Code caso você não tenha aberto ainda:

        code .

5.  Iniciar o servidor:

        npm run dev

    O servidor será iniciado em http://localhost:8080.

6.  Documentação da API:

        http://localhost:8080/api-docs

#### Desenvolvimento:

1.  Mudar para branch de desenvolvimento e pegar todas as alterações:

        git checkout develop
        git pull origin develop

2.  Subir alterações de código para o github:

    Faça as alterações que você precisar no código.

        git add .
        git commit -m "Descrição do commit"
        git push origin develop

3.  Criar um Pull Request:

    Abra um Pull Request no GitHub para que suas alterações possam ser revisadas e, mescladas na branch principal (main). Siga as instruções detalhadas [neste link](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

#### Repositório Front-End:

Você pode acessar o projeto front-end [aqui](https://github.com/devBrait/jardinagem_front)


#### Outros Links Úteis:

- Entenda o que é um ORM: [Leia aqui](https://lab-mackleaps.gitbook.io/residencia-de-software-macklaeps-upm-fci/recursos-educacionais/web-service-node-js/banco-de-dados-e-mapeamento-usando-odm-e-orm)

- CRUD: [Assista aqui](https://www.youtube.com/watch?v=8jcawcG2veY)

- O que é uma API: [Leia aqui](https://www.techtudo.com.br/listas/2020/06/o-que-e-api-e-para-que-serve-cinco-perguntas-e-respostas.ghtml)