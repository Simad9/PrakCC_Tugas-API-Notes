import { Sequelize } from "sequelize";

const db = new Sequelize("wijdan-notes", "root", "", {
  host: "34.172.105.76",
  dialect: "mysql",
});

export default db;
