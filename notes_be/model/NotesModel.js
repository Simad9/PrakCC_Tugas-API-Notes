import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Notes = db.define(
  "notes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "Tanggal_dibuat",
    updatedAt: "Tanggal_diperbarui",
  }
);

(async () => {
  await db.sync();
})();

export default Notes;
