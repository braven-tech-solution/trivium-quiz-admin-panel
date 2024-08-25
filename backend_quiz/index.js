let mongoose = require("mongoose");
const app = require("./src/app");
const config = require("./src/config/index");

mongoose
  .connect(
    "mongodb+srv://user1:nNdKrh8fEVstinjv@team-codecanyon.ffrshve.mongodb.net/quiz?retryWrites=true&w=majority&appName=Team-CodeCanyon"
  )
  .then(() => {
    console.log(`Database connection is successful 🛢`);
  });

app.listen(config.port, () => {
  console.log(`App is running on port ${config.port}`);
});
