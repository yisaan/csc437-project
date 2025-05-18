import express, { Request, Response } from "express";
import { Player } from "../models/player";
import Players from "../services/player-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Players.index()
      .then((list: Player[]) => res.json(list))
      .catch((err) => res.status(500).send(err));
});

router.get("/:name", (req: Request, res: Response) => {
    const { name } = req.params;
  
    Players.get(name)
      .then((player: Player | null) => {
        if (player) res.json(player);
        else res.status(404).send("Player not found");
      })
      .catch((err) => res.status(500).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newPlayer = req.body;
  
    Players.create(newPlayer)
      .then((player: Player) => res.status(201).json(player))
      .catch((err) => res.status(500).send(err));
});

router.put("/:name", (req: Request, res: Response) => {
    const { name } = req.params;
    const newPlayer = req.body;
  
    Players.update(name, newPlayer)
      .then((player: Player) => res.json(player))
      .catch(() => res.status(404).end());
});  

router.delete("/:name", (req: Request, res: Response) => {
    const { name } = req.params;
  
    Players.remove(name)
      .then(() => res.status(204).end())
      .catch((err) => res.status(404).send(err));
});

export default router;