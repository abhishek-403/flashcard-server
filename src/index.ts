import { Response, Request } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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
app.use(cors(corsOptions));
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.send("Healthy server");
});
app.listen(port, () => {
  console.log("server listening at port:", port);
});
