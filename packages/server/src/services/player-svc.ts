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
  { collection: "players", versionKey: false }
);

const Players = {
  // Update by “name” (unique on your collection?), set only the passed fields
  update: async (name: string, updates: Partial<{ points: number; year: string }>) => {
    return await PlayerModel.findOneAndUpdate(
      { name },
      { $set: updates },
      { new: true } // return the updated document
    ).exec();
  },
  // Create new
  create: async (playerData: {
    name: string;
    year: string;
    gender: "men" | "women";
    points: number;
  }) => {
    const p = new PlayerModel(playerData);
    return await p.save();
  },
  // List by gender
  indexByGender: async (gender: "men" | "women") => {
    return await PlayerModel.find({ gender }).exec();
  },
  // …etc…
};

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

function create(json: Player): Promise<Player> {
    const p = new PlayerModel(json);
    return p.save();
}

function update(name: string, player: Player): Promise<Player> {
    return PlayerModel.findOneAndUpdate({ name }, player, { new: true })
      .then((updated) => {
        if (!updated) throw `${name} not updated`;
        else return updated;
    });
}

function remove(name: string): Promise<void> {
    return PlayerModel.findOneAndDelete({ name }).then((deleted) => {
      if (!deleted) throw `${name} not deleted`;
    });
}  

export default { index, get, indexByGender, create, update, remove };