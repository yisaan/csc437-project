import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Players from "./services/player-svc";
import players from "./routes/players";
import auth, { authenticateUser } from "./routes/auth";
import fs from "node:fs/promises";
import path from "path";


connect("Pickleball");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.use(express.json());

//app.use("/api/players", authenticateUser, players);

app.use("/auth", auth);

app.put("/api/players/:name", authenticateUser, async (req: Request, res: Response) => {
  const { name } = req.params;
  const updates = req.body; // e.g. { points: 5 } or the entire player object
  try {
    // Call whatever service method you wrote to update a player in MongoDB
    const updated = await Players.update(name, updates);
    if (!updated) {
      res.status(404).send(`No player named "${name}"`);
      return;
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating player:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/players/:gender", authenticateUser, async (req: Request, res: Response) => {
    const { gender } = req.params;
  
    if (gender !== "men" && gender !== "women") {
      res.status(400).send("Invalid gender");
      return; 
    }

    try {
      // 1) Fetch all players of that gender
      const data = await Players.indexByGender(gender as "men" | "women");
      // `data` is an array of Player objects, each with fields { name, rank, year, points, ... }
  
      // 2) Sort descending by points
      data.sort((a, b) => b.points - a.points);
  
      // 3) Re-assign rank = index+1 for each entry
      data.forEach((player, idx) => {
        player.rank = idx + 1;
      });
  
      // 4) Send the newly sorted + re-ranked array as JSON
      res
        .set("Content-Type", "application/json")
        .json(data);
    } catch (err) {
      console.error("Error loading players:", err);
      res.status(500).send("Server error");
    }
  });
  

app.get("/api/player/:name", authenticateUser, (req: Request, res: Response) => {
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

app.get("/api/players", authenticateUser, (req: Request, res: Response) => {
    Players.index().then((data) => {
        res
        .set("Content-Type", "application/json")
        .send(JSON.stringify(data));
    });
});

app.post(
  "/api/players",
  authenticateUser,      // Only logged‐in users may create
  async (req: Request, res: Response) => {
    const { name, year, gender } = req.body as {
      name: string;
      year: string;
      gender: "men" | "women";
    };

    // Basic validation
    if (!name || !year || (gender !== "men" && gender !== "women")) {
      res.status(400).send("Missing or invalid name/year/gender");
      return;
    }

    try {
      // Create a brand‐new Player document; assume Players.create returns the newly inserted object.
      // We assume your Mongo schema requires: { name, year, gender, points, rank? }.
      // We'll let points start at 0. We do not set rank here; the GET endpoint will recompute ranks when listing.
      const newPlayer = await Players.create({
        rank: 0,
        name,
        year,
        gender,
        points: 0,
        // If your Mongoose schema has a “rank” field, you can leave it out or set it to null.
        // rank: null
      });

      if (!newPlayer) {
        res.status(500).send("Failed to create player");
        return;
      }
      // Return the newly created document (with its _id, name, year, gender, points=0, etc).
      res.status(201).json(newPlayer);
    } catch (err) {
      console.error("Error creating player:", err);
      res.status(500).send("Server error");
    }
  }
);

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});