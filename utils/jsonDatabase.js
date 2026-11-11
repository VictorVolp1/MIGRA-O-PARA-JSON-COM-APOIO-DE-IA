const fs = require("fs");
const path = require("path");

// Lê os registros de um arquivo JSON. Se o arquivo não existir, cria uma lista vazia.
function lerDados(nomeArquivo) {
  const caminho = path.join(__dirname, "..", "data", nomeArquivo);

  if (!fs.existsSync(caminho)) {
    fs.writeFileSync(caminho, "[]", "utf8");
  }

  const conteudo = fs.readFileSync(caminho, "utf8");
  return conteudo.trim() ? JSON.parse(conteudo) : [];
}

// Salva os registros no arquivo JSON.
function salvarDados(nomeArquivo, dados) {
  const caminho = path.join(__dirname, "..", "data", nomeArquivo);
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), "utf8");
}

module.exports = { lerDados, salvarDados };
