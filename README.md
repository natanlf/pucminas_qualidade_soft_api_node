# Backend
## _Qualidade de Software Puc Minas_

API Backend para gestão de usuários do nosso sistema final.

Como parte do trabalho final da disciplina, deve-se criar uma API Backend para gestão de usuários do nosso sistema final.

## Testes: 
- Teste unitário;
- Teste de integração;
- Teste de sistema.

## Docker

É necessário container do mongodb para rodar os testes de integração e de sistema.

```sh
cd <pasta raíz>
docker compose up
```

## Instalação

Foi usado [Node.js](https://nodejs.org/) v16.

Instalar as dependências e rodar os testes.

```sh
cd <pasta raíz>
npm i
npm run test
```