const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { db, User, PortfolioItem, Stock } = require('../server/db');

const seed = async () => {
  const sessionStore = new SequelizeStore({ db });
  await sessionStore.sync();
  await db.sync({ force: true });

  const user = await User.create({
    email: 'michael@email.com',
    name: 'michael',
    password: '123',
  });

  const stock = await Stock.create({ symbol: 'AAPL' });

  await PortfolioItem.create({
    quantity: 5,
    userId: user.id,
    stockId: stock.id,
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
