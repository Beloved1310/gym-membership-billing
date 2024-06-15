const dotenv = require('dotenv');

dotenv.config();
const { env } = process;

module.exports = {
  PORT: env.PORT || 9000,
};