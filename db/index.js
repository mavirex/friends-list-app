const Sequelize = require('sequelize');
const { STRING, ARRAY, FLOAT, INTEGER } = Sequelize;

const db = new Sequelize('postgres://localhost:5432/tripplanner')

const Friend = db.define("friend", {
    name: {
        type: STRING,
        allowNull: false,
        unique: true 
    },
    likes: {
        type: INTEGER,
        defaultValue: 5
    }
})

module.exports = {
    db,
    Friend
}