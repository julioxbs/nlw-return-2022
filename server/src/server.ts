import express from "express";
import { routes } from "./routes";
import cors from 'cors';

// GET = retrieve data
// POST = create data
// PUT = update data
// DELETE = delete data

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log("Server is running on port 3333");
});