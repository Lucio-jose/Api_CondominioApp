/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';

class UserType extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,

      },
      { sequelize },

    );

    return this;
  }
}
export default UserType;
