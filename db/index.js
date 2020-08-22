const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;
const databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/friends-app'
const db = new Sequelize(databaseUrl, {
    logging: false,
    operatorsAliases: false
})

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

const syncAndSeed = async()=> {
    await db.sync({ force: true });
    const [ moe, lucy, larry ] = await Promise.all([
      Friend.create({ name: 'moe' }),
      Friend.create({ name: 'lucy' }),
      Friend.create({ name: 'larry' }),
    ]);
}

module.exports = {
    db,
    Friend,
    syncAndSeed
}