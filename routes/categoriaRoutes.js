const express = require("express");
const router = express.Router();
const { lerDados, salvarDados } = require("../utils/jsonDatabase");
const ARQUIVO = "categorias.json";

router.get("/", (req, res) => {
  res.render("categorias/index", {
    categorias: lerDados(ARQUIVO),
    currentPath: req.originalUrl || req.path
  });
});

router.get("/cadastro", (req, res) => {
  res.render("categorias/form-cadastro", { currentPath: req.originalUrl || req.path });
});

router.post("/", (req, res) => {
  const categorias = lerDados(ARQUIVO);
  const novoId = categorias.length ? Math.max(...categorias.map(c => c.id)) + 1 : 1;
  const { nome, descricao } = req.body;
  categorias.push({ id: novoId, nome, descricao });
  salvarDados(ARQUIVO, categorias);
  res.redirect("/categorias");
});

router.get("/excluir/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const categorias = lerDados(ARQUIVO).filter(c => c.id !== id);
  salvarDados(ARQUIVO, categorias);
  res.redirect("/categorias");
});

router.get("/editar/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const categoria = lerDados(ARQUIVO).find(c => c.id === id);
  if (!categoria) return res.redirect("/categorias");
  res.render("categorias/editar", { categoria, currentPath: req.originalUrl || req.path });
});

router.post("/editar/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const categorias = lerDados(ARQUIVO);
  const categoria = categorias.find(c => c.id === id);
  if (!categoria) return res.redirect("/categorias");
  const { nome, descricao } = req.body;
  categoria.nome = nome;
  categoria.descricao = descricao;
  salvarDados(ARQUIVO, categorias);
  res.redirect("/categorias");
});

module.exports = router;
