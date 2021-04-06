const knex = require("knex");

const connection =
  process.env.NODE_ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      };

const db = knex({
  client: "pg",
  version: "7.2",
  connection,
  searchPath: ["knex", "public"],
  debug: true
});

module.exports = db;
