import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Players from "./services/player-svc";
import players from "./routes/players";
import auth, { authenticateUser } from "./routes/auth";


connect("Pickleball");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.use(express.json());

//app.use("/api/players", authenticateUser, players);

app.use("/auth", auth);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/api/players/:gender", (req: Request, res: Response) => {
    const { gender } = req.params;
  
    if (gender !== "men" && gender !== "women") {
      res.status(400).send("Invalid gender");
      return; 
    }

    Players.indexByGender(gender as "men" | "women").then((data) => {
      res
        .set("Content-Type", "application/json")
        .send(JSON.stringify(data));
    });
  });
  

app.get("/player/:name", (req: Request, res: Response) => {
    const { name } = req.params;
  
    Players.get(name).then((data) => {
      if (data) {
        res
          .set("Content-Type", "application/json")
          .send(JSON.stringify(data));
      } else {
        res.status(404).send();
      }
    });
  });

app.get("/players", (req: Request, res: Response) => {
    Players.index().then((data) => {
        res
        .set("Content-Type", "application/json")
        .send(JSON.stringify(data));
    });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});