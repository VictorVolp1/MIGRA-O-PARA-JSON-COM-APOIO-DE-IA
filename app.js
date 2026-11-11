const express = require("express");
const path = require("path");

const app = express();

// ========================================
// CONFIGURAÇÃO DO EJS
// ========================================

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);


// ========================================
// MIDDLEWARES
// ========================================

app.use((req, res, next) => {
    res.locals.currentPath = req.originalUrl || req.path;
    next();
});

// Permite receber dados enviados por formulário
app.use(express.urlencoded({ extended: true }));

// Permite receber requisições com JSON
app.use(express.json());


// ========================================
// ROTAS
// ========================================

const categoriaRoutes = require("./routes/categoriaRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const fornecedorRoutes = require("./routes/fornecedorRoutes");
const produtoRoutes = require("./routes/produtoRoutes");

app.use("/categorias", categoriaRoutes);
app.use("/clientes", clienteRoutes);
app.use("/fornecedores", fornecedorRoutes);
app.use("/produtos", produtoRoutes);
    

// ========================================
// ROTA PRINCIPAL
// ========================================

app.get("/", (req, res) => {

    res.render("index", { currentPath: req.originalUrl || req.path });

});


// ========================================
// SERVIDOR
// ========================================

app.listen(3000, () => {

    console.log(
        "Servidor rodando em http://localhost:3000"
    );

});