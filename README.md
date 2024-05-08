# Amazon Web Scrapping

libaries and tools:
- axios
- JSDOM
- typescript
- node-cache
- cors
- nodemon
- express

## Front End

Há um único arquivo html (index.html), que importa o único arquivo javascript para o front-end (script.js). Nesse arquivo js, são definidos dois event listeners, que farão uma requisição para a api usanso o AXIOS  quando o usuário clicar no botão de pesquisa ou quando pressionar o botão enter (apenas quando a barra de pesquisa estiver ativa). Quando requisição é executada, é exibida uma mensagem ao usuário informando o carregamento e se não houver erro os dados dos produtos são carregados na página, mas se houver erro, é exibida uma mensagem ao usuário pedindo para que ele tente novamente mais tarde.

## Back End

Uma API que o scrapping na webpage amazon.com.br, listando os produtos da primeira página de uma pesquisa feita para uma keyword específica.

### Endpoints

GET: /api/scrape?key=${key}

### Middlewares

Há um único middeware, e este realiza o caching da requisição GET

### Controllers

Um controller para para manipular rota /api/scrape. Ele também acessa a função no arquivo scrapHandling/index.js

### API

T

## How to test

The package manager NPM is necessary to test this project

1 - Make a fork of this repository

2 - Install dependencies

```bash
npm i
```

3 - Run the API

```bash
npm run start
```

4 - Run Vite

```bash
npm run dev
```
