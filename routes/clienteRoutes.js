const express = require("express");
const router = express.Router();
const { lerDados, salvarDados } = require("../utils/jsonDatabase");
const ARQUIVO = "clientes.json";

router.get("/", (req, res) => {
  res.render("clientes/index", { clientes: lerDados(ARQUIVO), currentPath: req.originalUrl || req.path });
});

router.get("/cadastrar", (req, res) => {
  res.render("clientes/form-cadastro", { currentPath: req.originalUrl || req.path });
});

router.post("/", (req, res) => {
  const clientes = lerDados(ARQUIVO);
  const novoId = clientes.length ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
  const { nome, email, telefone, cidade } = req.body;
  clientes.push({ id: novoId, nome, email, telefone, cidade });
  salvarDados(ARQUIVO, clientes);
  res.redirect("/clientes");
});

router.get("/excluir/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  salvarDados(ARQUIVO, lerDados(ARQUIVO).filter(c => c.id !== id));
  res.redirect("/clientes");
});

router.get("/editar/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const cliente = lerDados(ARQUIVO).find(c => c.id === id);
  if (!cliente) return res.redirect("/clientes");
  res.render("clientes/editar", { cliente, currentPath: req.originalUrl || req.path });
});

router.post("/editar/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const clientes = lerDados(ARQUIVO);
  const cliente = clientes.find(c => c.id === id);
  if (!cliente) return res.redirect("/clientes");
  const { nome, email, telefone, cidade } = req.body;
  Object.assign(cliente, { nome, email, telefone, cidade });
  salvarDados(ARQUIVO, clientes);
  res.redirect("/clientes");
});

module.exports = router;
