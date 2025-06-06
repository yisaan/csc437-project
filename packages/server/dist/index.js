"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_mongo = require("./services/mongo");
var import_player_svc = __toESM(require("./services/player-svc"));
var import_auth = __toESM(require("./routes/auth"));
var import_promises = __toESM(require("node:fs/promises"));
var import_path = __toESM(require("path"));
var import_announcements = __toESM(require("./routes/announcements"));
(0, import_mongo.connect)("Pickleball");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/auth", import_auth.default);
app.use("/api/announcements", import_announcements.default);
app.put("/api/players/:name", import_auth.authenticateUser, async (req, res) => {
  const { name } = req.params;
  const updates = req.body;
  try {
    const updated = await import_player_svc.default.update(name, updates);
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
app.get("/api/players/:gender", import_auth.authenticateUser, async (req, res) => {
  const { gender } = req.params;
  if (gender !== "men" && gender !== "women") {
    res.status(400).send("Invalid gender");
    return;
  }
  try {
    const data = await import_player_svc.default.indexByGender(gender);
    data.sort((a, b) => b.points - a.points);
    data.forEach((player, idx) => {
      player.rank = idx + 1;
    });
    res.set("Content-Type", "application/json").json(data);
  } catch (err) {
    console.error("Error loading players:", err);
    res.status(500).send("Server error");
  }
});
app.get("/api/player/:name", import_auth.authenticateUser, (req, res) => {
  const { name } = req.params;
  import_player_svc.default.get(name).then((data) => {
    if (data) {
      res.set("Content-Type", "application/json").send(JSON.stringify(data));
    } else {
      res.status(404).send();
    }
  });
});
app.get("/api/players", import_auth.authenticateUser, (req, res) => {
  import_player_svc.default.index().then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  });
});
app.post(
  "/api/players",
  import_auth.authenticateUser,
  // Only logged‐in users may create
  async (req, res) => {
    const { name, year, gender } = req.body;
    if (!name || !year || gender !== "men" && gender !== "women") {
      res.status(400).send("Missing or invalid name/year/gender");
      return;
    }
    try {
      const newPlayer = await import_player_svc.default.create({
        rank: 0,
        name,
        year,
        gender,
        points: 0
        // If your Mongoose schema has a “rank” field, you can leave it out or set it to null.
        // rank: null
      });
      if (!newPlayer) {
        res.status(500).send("Failed to create player");
        return;
      }
      res.status(201).json(newPlayer);
    } catch (err) {
      console.error("Error creating player:", err);
      res.status(500).send("Server error");
    }
  }
);
app.use("/app", (req, res) => {
  const indexHtml = import_path.default.resolve(staticDir, "index.html");
  import_promises.default.readFile(indexHtml, { encoding: "utf8" }).then(
    (html) => res.send(html)
  );
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
