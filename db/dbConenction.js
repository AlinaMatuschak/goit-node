const mongoose = require("mongoose");

function dbConnection() {
  mongoose.connect(
    "mongodb+srv://matuschak:qwerty123@matuschakit-ndtl8.mongodb.net/db-contacts",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    err => {
      if (err) {
        console.log(err);
        process.exit(1);
      }

      if (!err) {
        console.log("Database connection successful");
      }
    }
  );
}

module.exports = dbConnection;
