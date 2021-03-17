import Database from '../database/firebase';

/**
 * Definição do que acontece quando o front-end fazer uma requisição para o back-end.
 * Toda definição é em cima de Rest (GET, POST, PUT, DELETE)
 */

class User {
  constructor() {}

  /**
   * Método com a função de devolver o usuário com o ID passado.
   * @param req 
   * @param res 
   * @returns 
   */
  async index(req, res) {
    const { id } = req.params;

    const doc = await Database.getUser(id);

    if (!doc.exists) {
      return res.json({ error: `Unable to find a user with the ID ${id}` });
    }
    return res.json({ data: doc.data() });
  }

  /**
   * Método com a função de devolver TODOS os usuários.
   * @param req 
   * @param res 
   * @returns 
   */
  async get(req, res) {
    const users = [];

    const docs = await Database.getAllUsers();
    docs.forEach(doc => {
      users.push({
        id: doc.id,
        data: doc.data()
      });
    });

    return res.json(users);
  }

  /**
   * Método com a função de criar um novo usuário.
   * @param req 
   * @param res 
   * @returns 
   */
  async post(req, res) {
    const { Firstname, Lastname, Password, Email } = req.body;

    await Database.setUser({
      Firstname,
      Lastname,
      Password,
      Email
    });

    return res.json();
  }

  /**
   * Método com a função de deletar um usuário com o ID passado.
   * @param req 
   * @param res 
   * @returns 
   */
  async delete(req, res) {
    const { id } = req.params;

    await Database.deleteUser(id);

    return res.json();
  }
}

/**
 * Exporta a classe User.
 */
export default new User();
