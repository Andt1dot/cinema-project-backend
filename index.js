const server = require("./api/server");

server.listen(process.env.PORT || 5000, () => {
  console.log(`\n*** Welcome Olymp Cinema  ***\n`);
});
