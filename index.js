import dbConnect from "./src/libs/db.js";
import { server } from "./src/server.js";

//Archivo principal para conxion del server
dbConnect()
  .then(() => {
    server.listen(8080 || 5200, () => {
      console.log(`Server listening on port 8080 or 5200`);
    });
  })
  .catch(err => {
    console.log(err);
  });