const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('requests', 'user', 'pass',{
	dialect: 'sqlite',
	host: './db.sqlite'
}) //

module.exports = sequelize;