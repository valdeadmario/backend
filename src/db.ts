let sqlite3 = require("sqlite3");
let db = new sqlite3.Database("pizza.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE pizza_house (id INTEGER PRIMARY KEY AUTOINCREMENT, members INTEGER, taken_pizza_count INTEGER, peace_count INTEGER, pizza_count INTEGER, created_at DATETIME, response_at DATETIME)"
  );
});

db.close();
