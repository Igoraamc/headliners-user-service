import express from 'express';

import rootRouter from './routes/user.routes';

const app = express();
const port = process.env.PORT || 3000;

/**
 * Seta que todas requisição utilizarão JSON.
 */
app.use(express.json());

/**
 * Coloca /api em frente a todas as rotas, exemplo:
 * https://localhost:3000/users => https://localhost:3000/api/users
 */
app.use('/api', rootRouter);

/**
 * Cria a rota para que serve apenas para checar se o servidor está de pé.
 */
app.get('/healthcheck', (req, res) => {
  res.json({ status: 'online' })
});

/**
 * Inicializa o servidor.
 */
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});