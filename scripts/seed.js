const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { db, User } = require('../server/db');

const seed = async () => {
  const sessionStore = new SequelizeStore({ db });
  await sessionStore.sync();
  await db.sync({ force: true });
  await User.create({
    email: 'michael@email.com',
    name: 'michael',
    password: '123',
  });
};

const runSeed = async () => {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
    console.log('db closed');
  }
};

runSeed();
