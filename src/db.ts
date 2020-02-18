let sqlite3 = require("sqlite3");
let db = new sqlite3.Database("pizza.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE pizza_house (id INTEGER PRIMARY KEY AUTOINCREMENT, members INTEGER, taken_pizza_count INTEGER, peace_count INTEGER, pizza_count INTEGER, created_at DATETIME, response_at DATETIME)"
  );

  db.run(
    "INSERT INTO pizza_house (members, taken_pizza_count, peace_count, pizza_count) VALUES ('1','2,3,5,6' ,'2', '1')"
  );
  db.run(
    "INSERT INTO pizza_house (members, taken_pizza_count, peace_count, pizza_count) VALUES ('11','2,3,5,6' ,'2', '1')"
  );
  db.run(
    "INSERT INTO pizza_house (members, taken_pizza_count, peace_count, pizza_count) VALUES ('1','2,3,5,6' ,'2', '1')"
  );

  console.log("successfully created the pizza_house table in pizza.db");

  db.each(
    "SELECT id, members, taken_pizza_count, peace_count, pizza_count, created_at FROM pizza_house",
    (err: any, row: any) => {
      console.log(row);
    }
  );
});

db.close();
