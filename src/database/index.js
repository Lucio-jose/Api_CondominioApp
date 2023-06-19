import Sequelize from 'sequelize';
import models from '../app/models/index';
import databaseConfig from '../config/database';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model?.associate && model.associate(this.connection.models),
      );
  }
}
export default new Database();
