import express from 'express';

import userRouters from './user.routes';

const rootRouter = express.Router();

/**
 * Cadastra a rota de usuários.
 */
rootRouter.use('/user', userRouters);

export default rootRouter;