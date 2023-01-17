module.exports = {
  HOST: "localhost",
  PORT: 8889,
  USER: "user",
  PASSWORD: "password",
  DB: "microbagr",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
