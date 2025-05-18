import { Schema, model } from "mongoose";
import { Player } from "../models/player";

const PlayerSchema = new Schema<Player>(
  {
    name: { type: String, required: true, trim: true },
    rank: { type: Number, default: null},
    year: { type: String, required: true, trim: true },
    points: { type: Number, default: 0}, 
    gender: { type: String, required: true, enum: ["men", "women"] }
  },
  { collection: "players" }
);

const PlayerModel = model<Player>(
    "Player", 
    PlayerSchema
);

function index(): Promise<Player[]> {
  return PlayerModel.find().sort({ rank: 1 });
}

function get(name: string): Promise<Player | null> {
  return PlayerModel.findOne({ name }).catch((err) => {
    throw `${name} Not Found`;
  });
}

function indexByGender(gender: "men" | "women"): Promise<Player[]> {
    return PlayerModel.find({ gender }).sort({ rank: 1 });
}

export default { index, get, indexByGender };