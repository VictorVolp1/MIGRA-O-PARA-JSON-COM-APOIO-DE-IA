const express = require("express");
const router = express.Router();
const { lerDados, salvarDados } = require("../utils/jsonDatabase");
const ARQUIVO = "produtos.json";

router.get("/", (req, res) => {
  res.render("produtos/index", { produtos: lerDados(ARQUIVO), currentPath: req.originalUrl || req.path });
});

router.get("/cadastrar", (req, res) => {
  res.render("produtos/form-cadastro", { currentPath: req.originalUrl || req.path });
});

router.post("/", (req, res) => {
  const produtos = lerDados(ARQUIVO);
  const novoId = produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
  const { nome, descricao, preco, estoque, categoria } = req.body;
  produtos.push({ id: novoId, nome, descricao, preco: Number(preco), estoque: Number(estoque), categoria });
  salvarDados(ARQUIVO, produtos);
  res.redirect("/produtos");
});

router.get("/excluir/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  salvarDados(ARQUIVO, lerDados(ARQUIVO).filter(p => p.id !== id));
  res.redirect("/produtos");
});

router.get("/editar/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const produto = lerDados(ARQUIVO).find(p => p.id === id);
  if (!produto) return res.redirect("/produtos");
  res.render("produtos/editar", { produto, currentPath: req.originalUrl || req.path });
});

router.post("/editar/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const produtos = lerDados(ARQUIVO);
  const produto = produtos.find(p => p.id === id);
  if (!produto) return res.redirect("/produtos");
  const { nome, descricao, preco, estoque, categoria } = req.body;
  Object.assign(produto, { nome, descricao, preco: Number(preco), estoque: Number(estoque), categoria });
  salvarDados(ARQUIVO, produtos);
  res.redirect("/produtos");
});

module.exports = router;
