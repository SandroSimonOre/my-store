require('dotenv').config();

const config = {
    localServerPort: process.env.PORT,
    pgHost: process.env.PGHOST,
    pgUser: process.env.PGUSER,
    pgDataBase: process.env.PGDATABASE,
    pgPassword: process.env.PGPASSWORD,
    pgPort: process.env.PGPORT,
    jwtSecret: process.env.MY_SECRET
}

module.exports = {config: config};