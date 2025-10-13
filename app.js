import express from "express";
import dotenv from "dotenv";
import { urlShortenerRoutes } from "./routes/shortener.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//express router.
// app.use(router);
app.use(urlShortenerRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
