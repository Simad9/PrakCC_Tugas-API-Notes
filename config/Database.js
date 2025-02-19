import {Sequalize} from 'sequelize';

const db = new Sequalize('tugas_notes', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;