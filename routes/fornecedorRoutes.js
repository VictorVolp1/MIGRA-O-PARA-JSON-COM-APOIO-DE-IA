const express = require("express");
const router = express.Router();
const { lerDados, salvarDados } = require("../utils/jsonDatabase");
const ARQUIVO = "fornecedores.json";

router.get("/", (req, res) => {
  res.render("fornecedores/index", { fornecedores: lerDados(ARQUIVO), currentPath: req.originalUrl || req.path });
});

router.get("/cadastrar", (req, res) => {
  res.render("fornecedores/form-cadastro", { currentPath: req.originalUrl || req.path });
});

router.post("/", (req, res) => {
  const fornecedores = lerDados(ARQUIVO);
  const novoId = fornecedores.length ? Math.max(...fornecedores.map(f => f.id)) + 1 : 1;
  const { razaoSocial, cnpj, email, telefone, cidade } = req.body;
  fornecedores.push({ id: novoId, razaoSocial, cnpj, email, telefone, cidade });
  salvarDados(ARQUIVO, fornecedores);
  res.redirect("/fornecedores");
});

router.get("/excluir/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  salvarDados(ARQUIVO, lerDados(ARQUIVO).filter(f => f.id !== id));
  res.redirect("/fornecedores");
});

router.get("/editar/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const fornecedor = lerDados(ARQUIVO).find(f => f.id === id);
  if (!fornecedor) return res.redirect("/fornecedores");
  res.render("fornecedores/editar", { fornecedor, currentPath: req.originalUrl || req.path });
});

router.post("/editar/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const fornecedores = lerDados(ARQUIVO);
  const fornecedor = fornecedores.find(f => f.id === id);
  if (!fornecedor) return res.redirect("/fornecedores");
  const { razaoSocial, cnpj, email, telefone, cidade } = req.body;
  Object.assign(fornecedor, { razaoSocial, cnpj, email, telefone, cidade });
  salvarDados(ARQUIVO, fornecedores);
  res.redirect("/fornecedores");
});

module.exports = router;
