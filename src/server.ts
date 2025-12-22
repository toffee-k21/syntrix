import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { Worker } from "worker_threads";
import path from "path";

const PORT = process.env.PORT ||3000;

app.listen(PORT,() => {
console.log(`Server running on ${PORT}`);

new Worker(
    path.join(__dirname,"workers/price.worker.js")
  );
});

