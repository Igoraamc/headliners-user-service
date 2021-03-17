import * as admin from 'firebase-admin';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';

/**
 * Interface que representa o que deve ser enviado para realizar o cadastro do usuário.
 */
interface IUser {
  Firstname: string;
  Lastname: string;
  Password: string;
  Email: string;
}

class Database {
  /**
   * Váriavel que é utilizada para fazer todas ações com o banco de dados.
   */
  private db;
  /**
   * Váriavel que guarda as configurações para conectar com o banco de dados.
   */
  private svAccount: admin.ServiceAccount;

  constructor() {
    dotenv.config();

    console.log(process.env)
    /**
     * Seta os valores da configuração do banco de dados.
     */
    this.svAccount = {
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.CLIENT_EMAIL,
      projectId: process.env.PROJECT_ID
    };

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(this.svAccount)
      });
    }else {
      admin.app();
    }

    /**
     * Seta a váriavel @db com a conexão do banco de dados.
     */
    this.db = admin.firestore();
  }

  /**
   * Método que faz uma query para o banco de dados para retornar o usuário com o ID passado.
   * @param id 
   * @returns 
   */
  getUser(id: string) {
    return this.db.collection('users').doc(id).get();
  }

  /**
   * Método que faz uma query para o banco de dados retornando todos usuários.
   * @returns 
   */
  getAllUsers() {
    return this.db.collection('users').get();
  }

  /**
   * Método que grava o usuário no banco de dados.
   * @param user 
   */
  setUser(user: IUser) {
    this.db.collection('users').doc(uuid()).set(user);
  }

  /**
   * Método que deleta o usuário no banco de dados.
   * @param id 
   */
  deleteUser(id: string) {
    this.db.collection('users').doc(id).delete();
  }
}

/**
 * Exporta a classe Database.
 */
export default new Database();
