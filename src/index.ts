import { Response, Request } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  addCard,
  updatedCard,
  getCards,
  deleteCard,
} from "./controllers/flashCardController";
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

const allowedOrigins = process.env.CLIENT_URL?.split(",") || [];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Origin ${origin} not allowed by CORS`);
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.send("Healthy server");
});

app.get("/api/getCards", getCards);
app.post("/api/addCard", addCard);
app.patch("/api/updatedCard", updatedCard);
app.delete("/api/:id", deleteCard);

app.listen(port, () => {
  console.log("server listening at port:", port);
});
