const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config();

const DB = process.env.DATABASE_NAME.replace('<PASSWARD>', process.env.DATABASE_PASSWARD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true, //For removing deprecated version warning from terminal i guess
  serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
}).then(connect => {
  console.log("DATABSE CONNECTED SUCCESSFULLY!");
})

const port = process.env.PORT || 300;
const server = app.listen(port, () => {
  console.log(`App is live on port ${port}`)
})

process.on('unhandledRejection', (err) => {
  console.log("Unhandled rejection");
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1);
  })
})

process.on('uncaughtException', (err) => {
  console.log("Uncaught exception");
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1);
  })
})