const {Model, DataTypes} = require('sequelize');
const sequelize = require('./db');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    state: {
        type: DataTypes.INTEGER
    }},{
        sequelize,
        modelName: 'User'
    });

module.exports = User;