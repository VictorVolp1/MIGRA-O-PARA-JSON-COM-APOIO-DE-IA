# GreenFlow

## Nome do Projeto
GreenFlow – Sistema de gerenciamento de produtos, categorias, clientes e fornecedores.

## Integrantes
- Victor Hugo Volpi Pereira
- Davi Gato Grijó da Silva

## Objetivo
Migrar o armazenamento do CRUD do sistema GreenFlow, que anteriormente mantinha os registros em arrays declarados nos arquivos de rotas, para arquivos JSON na pasta `data/`. A aplicação permite cadastrar, listar, editar e excluir categorias, clientes, fornecedores e produtos, mantendo os dados salvos mesmo após o encerramento do servidor.

## Tecnologias Utilizadas
- Node.js
- Express
- EJS
- Bootstrap
- HTML, CSS e JavaScript
- Módulos nativos `fs` e `path` do Node.js para manipulação dos arquivos JSON

## Estrutura de Pastas
```text
GreenFlow/
├── app.js
├── package.json
├── README.md
├── data/
│   ├── categorias.json
│   ├── clientes.json
│   ├── fornecedores.json
│   └── produtos.json
├── routes/
│   ├── categoriaRoutes.js
│   ├── clienteRoutes.js
│   ├── fornecedorRoutes.js
│   └── produtoRoutes.js
├── utils/
│   └── jsonDatabase.js
└── views/
    ├── categorias/
        ├── editar.ejs
        ├── form-cadastro.ejs
        ├── index.ejs
    ├── clientes/
        ├── editar.ejs
        ├── form-cadastro.ejs
        ├── index.ejs
    ├── fornecedores/
        ├── editar.ejs
        ├── form-cadastro.ejs
        ├── index.ejs
    ├── produtos/
        ├── editar.ejs
        ├── form-cadastro.ejs
        ├── index.ejs
    └── partials/
        ├── footer.ejs
        ├── header.ejs
        ├── nav.ejs
```

## Entidades Utilizadas
- **Categorias:** id, nome e descrição.
- **Clientes:** id, nome, e-mail, telefone e cidade.
- **Fornecedores:** id, razão social, CNPJ, e-mail, telefone e cidade.
- **Produtos:** id, nome, descrição, preço, estoque e categoria.

Cada entidade possui seu próprio arquivo JSON dentro da pasta `data/`. Os registros iniciais que antes estavam nos arrays foram transferidos para esses arquivos.

## Como Executar o Projeto
1. Instale o [Node.js](https://nodejs.org/), caso ainda não esteja instalado.
2. Abra o terminal na pasta do projeto.
3. Execute `npm install` para instalar as dependências.
4. Execute `npm run dev` ou `npm start`.
5. Acesse `http://localhost:3000` no navegador.

## Prompt Utilizado
> Tenho um projeto escolar em Node.js com Express e EJS. Atualmente, as entidades categorias, clientes, fornecedores e produtos armazenam os registros em arrays declarados nos arquivos de rotas. Preciso migrar esse CRUD para arquivos JSON, conforme os requisitos do trabalho: criar uma pasta `data/`, criar um arquivo JSON para cada entidade, remover os arrays fixos e fazer com que as operações de cadastro, listagem, edição e exclusão leiam e gravem diretamente nos arquivos JSON. Analise a estrutura existente, preserve as rotas, as páginas EJS e o funcionamento visual do projeto. Oriente a implementação usando os módulos nativos `fs` e `path` do Node.js e explique as alterações necessárias no código e no README.

## Uso da Inteligência Artificial
Foi utilizado o ChatGPT como ferramenta de apoio para analisar a estrutura do projeto e orientar a migração do armazenamento em memória para arquivos JSON. A IA ajudou a identificar as quatro entidades, propor uma função reutilizável de leitura e gravação dos arquivos e adaptar as operações do CRUD sem alterar as páginas e rotas já existentes.

### Resposta da IA
A orientação fornecida foi:
1. Criar um arquivo JSON para cada entidade e transferir para eles os registros que estavam nos arrays.
2. Utilizar `fs` para ler e escrever os arquivos e `path` para montar caminhos independentes do sistema operacional.
3. Em cada operação, ler os dados atuais do arquivo, realizar a alteração necessária e salvar novamente o conteúdo em JSON.
4. Preservar as rotas e as telas EJS para evitar mudanças desnecessárias na interface.
5. Gerar novos identificadores com base no maior ID existente, evitando repetir IDs após a exclusão de registros.

### Sugestões Recebidas
- Centralizar a leitura e a gravação em um arquivo auxiliar para evitar repetição de código.
- Criar automaticamente um arquivo com uma lista vazia caso ele ainda não exista.
- Utilizar `JSON.parse()` para converter o conteúdo lido e `JSON.stringify()` para salvar os dados formatados.
- Converter preço e estoque de produtos para números ao cadastrar e editar.
- Testar as quatro operações de cada entidade e verificar a persistência dos dados após reiniciar o servidor.

## Alterações Realizadas
- Criada a pasta `data/` com `categorias.json`, `clientes.json`, `fornecedores.json` e `produtos.json`.
- Os registros iniciais foram transferidos dos arrays para os arquivos JSON correspondentes.
- Criado `utils/jsonDatabase.js`, responsável por ler e salvar os arquivos JSON.
- Atualizados os quatro arquivos de rotas para que cadastro, listagem, edição e exclusão utilizem os arquivos JSON.
- Removidos os arrays fixos dos arquivos de rotas.
- Mantidas as rotas, as páginas EJS e a organização visual já existente.
- Os identificadores são gerados a partir do maior ID presente no arquivo, e não apenas da quantidade de registros.

## Ajustes Feitos Manualmente
- Conferência dos nomes dos arquivos JSON para corresponder às entidades já utilizadas no projeto.
- Preservação dos nomes dos campos esperados pelas páginas EJS.
- Conversão dos campos `preco` e `estoque` para valores numéricos nas operações de cadastro e edição de produtos.
- Revisão da estrutura das pastas e da documentação para corresponder à implementação final.

## Desafios Encontrados
O principal desafio foi substituir o armazenamento em arrays sem modificar o funcionamento das rotas e das páginas existentes. Também foi necessário garantir que cada alteração fosse gravada no arquivo correto e que os identificadores continuassem únicos mesmo depois da exclusão de registros.

## Link do Repositório


## Conclusão
A migração do GreenFlow substituiu os arrays em memória por arquivos JSON, mantendo as funcionalidades de cadastro, consulta, edição e exclusão das quatro entidades. Com isso, os dados permanecem armazenados após o encerramento do servidor. O uso da IA auxiliou na análise e na implementação, enquanto a revisão manual permitiu adaptar a solução à estrutura e aos campos já utilizados pelo projeto.