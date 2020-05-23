const { db, User } = require('../server/db');

const seed = async () => {
  await db.sync({ force: true });
  await User.create({ email: 'michael@email.com', password: '123' });
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
