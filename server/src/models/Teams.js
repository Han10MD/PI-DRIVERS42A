const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Teams', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },



        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, { timestamps: false, freezeTableName: true });
};