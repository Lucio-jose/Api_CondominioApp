require('dotenv/config');

module.exports = {
  dialect:process.env.DB_DIALECT_DEV,
  type:process.env.DB_TYPE_DEV,
  host: process.env.DB_HOST_DEV,
  username: process.env.DB_USERNAME_DEV,
  port: process.env.DB_PORT_DEV, 
  password: process.env.DB_PASSWORD_DEV,
  database: process.env.DB_NAME_DEV,
  define: {
    timestamps: process.env.DB_TIMESTAMPS,
    undercored: process.env.DB_UNDERCORED,
    undercoredAll: process.env.DB_UNDERCOREDALL
  },
};
