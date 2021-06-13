const db = require("../models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
console.log("Migrated successful");
process.exit();