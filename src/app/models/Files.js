/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';

class Files extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },

      },
      { sequelize },

    );

    return this;
  }
}
export default Files;
