const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    COMPANY_ID: process.env.COMPANY_ID,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DATABASE
}