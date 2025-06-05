"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var player_svc_exports = {};
__export(player_svc_exports, {
  default: () => player_svc_default
});
module.exports = __toCommonJS(player_svc_exports);
var import_mongoose = require("mongoose");
const PlayerSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rank: { type: Number, default: null },
    year: { type: String, required: true, trim: true },
    points: { type: Number, default: 0 },
    gender: { type: String, required: true, enum: ["men", "women"] }
  },
  { collection: "players", versionKey: false }
);
const Players = {
  // Update by “name” (unique on your collection?), set only the passed fields
  update: async (name, updates) => {
    return await PlayerModel.findOneAndUpdate(
      { name },
      { $set: updates },
      { new: true }
      // return the updated document
    ).exec();
  },
  // Create new
  create: async (playerData) => {
    const p = new PlayerModel(playerData);
    return await p.save();
  },
  // List by gender
  indexByGender: async (gender) => {
    return await PlayerModel.find({ gender }).exec();
  }
  // …etc…
};
const PlayerModel = (0, import_mongoose.model)(
  "Player",
  PlayerSchema
);
function index() {
  return PlayerModel.find().sort({ rank: 1 });
}
function get(name) {
  return PlayerModel.findOne({ name }).catch((err) => {
    throw `${name} Not Found`;
  });
}
function indexByGender(gender) {
  return PlayerModel.find({ gender }).sort({ rank: 1 });
}
function create(json) {
  const p = new PlayerModel(json);
  return p.save();
}
function update(name, player) {
  return PlayerModel.findOneAndUpdate({ name }, player, { new: true }).then((updated) => {
    if (!updated) throw `${name} not updated`;
    else return updated;
  });
}
function remove(name) {
  return PlayerModel.findOneAndDelete({ name }).then((deleted) => {
    if (!deleted) throw `${name} not deleted`;
  });
}
var player_svc_default = { index, get, indexByGender, create, update, remove };
