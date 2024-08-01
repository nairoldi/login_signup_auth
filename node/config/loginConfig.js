require('dotenv').config();

const saltRounds = process.env.SALT_ROUNDS;
const jwtSecret = process.env.JWT_SECRET;


module.exports = {
    saltRounds: saltRounds,
    jwtSecret: jwtSecret,
}