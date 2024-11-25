import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o middleware Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";// Importa as funções controladoras para gerenciar os posts
import cors from "cors"

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSucessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o destino onde os arquivos serão salvos (pasta 'uploads')
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo (mantém o nome original)
    cb(null, file.originalname);
  }
});

const upload = multer({ storage }); // Cria uma instância do Multer com a configuração de armazenamento

const routes = (app) => {
  app.use(express.json()); // Habilita o parsing de JSON para as requisições
  app.use(cors(corsOptions))
  // Rotas para gerenciar os posts
  app.get("/posts", listarPosts); // Rota para listar todos os posts
  app.post("/posts", postarNovoPost); // Rota para criar um novo post

  // Rota para upload de imagens
  app.post("/upload", upload.single("imagem"), uploadImagem); // Rota para fazer upload de uma imagem
  app.put("/upload/:id", atualizarNovoPost)
};

export default routes; // Exporta a função de rotas para ser usada na aplicação principal