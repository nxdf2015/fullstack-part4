require('dotenv').config();

const { user } = process.env;
const { password } = process.env;
const PORT = process.env.PORT || 3003;

module.exports = { password, user, PORT };
