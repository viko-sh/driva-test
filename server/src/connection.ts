import { Sequelize } from "sequelize-typescript";

const connection = new Sequelize({
    host: 'localhost',
    database: 'driva',
    username: 'root',
    password: 'driva',
    port: 4306,
    dialect: 'mysql'
});

export default connection;