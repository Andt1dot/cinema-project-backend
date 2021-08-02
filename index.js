require("dotenv").config();
const server = require("./api/server");

const PORT = process.env.PORT;

server.listen(PORT || 5000, () => {
  console.log(`\n*** Welcome Olymp Cinema  ***\n`);
});
