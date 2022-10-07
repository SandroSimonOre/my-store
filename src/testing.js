const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://sandrosimon:admin123@localhost:5432/my_store')

async function connect(){

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error(error, 'Unable to connect to the database:');
  }

}

connect()