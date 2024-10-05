import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server: Server;

async function main() {
  await mongoose.connect(config.db_uri as string, {
    dbName: "recipe-community",
  });
  console.log("Db is connected");
  server = app.listen(config.port, () => {
    console.log("server is running");
  });
}

main();

process.on("unhandledRejection", () => {
  console.log(`unhandle Rejection is detected, shutting down the server`);

  if (Server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
