import express from 'express';

import User from '../controllers/User';

const userRouter = express.Router();

/**
 * Cria a rota para pegar o usuário pelo ID passado.
 */
userRouter.get('/:id', User.index);
/**
 * Cria a rota para pegar todos usuários.
 */
userRouter.get('/', User.get);
/**
 * Cria a rota para cadastrar um novo usuário.
 */
userRouter.post('/', User.post);
/**
 * Cria a rota para deletar um usuário pelo ID passado.
 */
userRouter.delete('/:id', User.delete);

export default userRouter;